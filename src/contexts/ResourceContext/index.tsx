import React, { createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { IpcRendererEvent } from 'electron';
import { useSnackbarContext } from '../../hooks';
import { Resources } from '../../types';
import { checkResources, isNotNil, NOOP } from '../../utils';
import useBundleSelect, { type UseBundleSelectReturns } from './useBundleSelect';
import useResourceFilePath, { type UseResourceFilePathReturns } from './useResourceFilePath';

export type ResourceContextProps =
    {
        handleResourcesUpdate: (newResources: Resources) => void;
        isConnect: boolean;
        onReloadResources: () => void;
        resources: Resources | null;
    }
    & UseBundleSelectReturns
    & UseResourceFilePathReturns;

export const ResourceContext = createContext<ResourceContextProps>({
    bundleOptions: [],
    directoryPath: '',
    handleResourcesUpdate: NOOP,
    isConnect: false,
    keyOptions: [],
    onDirectoryChangePress: NOOP,
    onReloadResources: NOOP,
    resources: null,
    selectedBundleOption: 'one-dialog',
    setSelectedBundleOption: NOOP,
});

export function ResourceProvider(props: PropsWithChildren<{}>) {
    const { children } = props;

    const [resources, setResources] = useState<Resources | null>(null);

    const { handleOpenSnackbar } = useSnackbarContext();

    const {
        directoryPath,
        onDirectoryChangePress,
    } = useResourceFilePath();

    const {
        bundleOptions,
        keyOptions,
        selectedBundleOption,
        setSelectedBundleOption,
    } = useBundleSelect(resources);

    useEffect(() => {
        const handleSuccessReadResources = (_: IpcRendererEvent, ...args: any[]) => {
            const [webResources, appResources] = args;

            if (!checkResources(webResources) || !checkResources(appResources)) {
                handleOpenSnackbar('Invalid folder path. Please choose a correct directory.');
                return;
            }

            setResources(webResources);
        };

        const handleFailureReadResources = (_: IpcRendererEvent, ...args: any[]) => {
            const [errorMessage] = args;
            handleOpenSnackbar(errorMessage);
            setResources(null);
        };

        const handleSuccessUpdateResources = (_: IpcRendererEvent, ...args: any[]) => {
            const [updatedResources] = args;
            setResources(updatedResources);
        };

        window.ipcRenderer.addListener('success_read_resources', handleSuccessReadResources);
        window.ipcRenderer.addListener('failure_read_resources', handleFailureReadResources);
        window.ipcRenderer.addListener('success_update_resources', handleSuccessUpdateResources);
        return () => {
            window.ipcRenderer.removeListener('success_read_resources', handleSuccessReadResources);
            window.ipcRenderer.removeListener('failure_read_resources', handleFailureReadResources);
            window.ipcRenderer.removeListener('success_update_resources', handleSuccessUpdateResources);
        };
    }, []);

    const onReloadResources = useCallback(() => {
        window.ipcRenderer.send('read_resources', directoryPath);
    }, [directoryPath]);

    const handleResourcesUpdate = useCallback((updatedResources: Resources) => {
        window.ipcRenderer.send('update_resources', {
            directoryPath,
            updatedResources,
        });
    }, [directoryPath]);

    return (
        <ResourceContext.Provider value={{
            bundleOptions,
            directoryPath,
            handleResourcesUpdate,
            isConnect: isNotNil(resources),
            keyOptions,
            onDirectoryChangePress,
            onReloadResources,
            resources,
            selectedBundleOption,
            setSelectedBundleOption,
        }}>
            {children}
        </ResourceContext.Provider>
    );
}
