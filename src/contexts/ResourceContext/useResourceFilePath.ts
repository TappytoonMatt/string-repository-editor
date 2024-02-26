import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = '@resourceFilePath';

interface UseResourceFilePathReturns {
    handleResourceFilePathChange: (path: string) => void;
    resourceFilePath: string;
}

export default function useResourceFilePath(): UseResourceFilePathReturns {
    const [resourceFilePath, setResourceFilePath] = useState<string>('');

    useEffect(() => {
        const initialize = async () => {
            const storedResourceFilePath = await localStorage.getItem(STORAGE_KEY);
            if (storedResourceFilePath) {
                setResourceFilePath(storedResourceFilePath);
            }
        };

        initialize().catch(ex => console.error(ex));
    }, []);

    useEffect(() => {
        if (resourceFilePath) {
            window.ipcRenderer.send('input_resources', resourceFilePath);
        }
    }, [resourceFilePath]);

    const handleResourceFilePathChange = useCallback(async (path: string) => {
        try {
            await localStorage.setItem(STORAGE_KEY, path);
            setResourceFilePath(path);
        } catch (ex) {
            console.error(ex);
        }
    }, []);

    return {
        handleResourceFilePathChange,
        resourceFilePath,
    };
}
