import { useCallback, useEffect, useState } from 'react';
import { IpcRendererEvent } from 'electron';

const STORAGE_KEY = '@resourceFilePath';

export interface UseResourceFilePathReturns {
    directoryPath: string;
    onDirectoryChangePress: () => void;
}

export default function useResourceFilePath(): UseResourceFilePathReturns {
    const [directoryPath, setDirectoryPath] = useState<string>('');

    useEffect(() => {
        const initialize = async () => {
            const storedResourceFilePath = await localStorage.getItem(STORAGE_KEY);
            if (storedResourceFilePath) {
                setDirectoryPath(storedResourceFilePath);
                window.ipcRenderer.send('read_resources', storedResourceFilePath);
            }
        };

        initialize().catch(ex => console.error(ex));
    }, []);

    useEffect(() => {
        const handleSuccessInputDirectory = (_: IpcRendererEvent, ...args: any[]) => {
            const [directoryPath] = args;

            if (!directoryPath) {
                return;
            }

            setDirectoryPath(directoryPath);
            localStorage.setItem(STORAGE_KEY, directoryPath);
            window.ipcRenderer.send('read_resources', directoryPath);
        };

        window.ipcRenderer.addListener('success_input_directory', handleSuccessInputDirectory);
        return () => window.ipcRenderer.removeListener('success_input_directory', handleSuccessInputDirectory);
    }, []);


    const onDirectoryChangePress = useCallback(() => {
        window.ipcRenderer.send('input_directory');
    }, []);

    return {
        directoryPath,
        onDirectoryChangePress,
    };
}
