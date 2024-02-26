import React, { ChangeEvent, createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { IpcRendererEvent } from 'electron';
import { useSnackbarContext } from '../../hooks';
import { Resources, ResourceTemplateKeys } from '../../types';
import { checkResources, isNotNil, NOOP } from '../../utils';
import useBundleSelect from './useBundleSelect';
import useResourceFilePath from './useResourceFilePath';

export interface ResourceContextProps {
    bundleOptions: ResourceTemplateKeys[];
    isConnect: boolean;
    keyOptions: string[];
    resourceFilePath: string;
    resources: Resources | null;
    selectedBundleOption: ResourceTemplateKeys;
    setSelectedBundleOption: (option: ResourceTemplateKeys) => void;
    handleReloadResourceFile: () => void;
    handleResourceFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleResourcesUpdate: (newResources: Resources) => void;
}

export const ResourceContext = createContext<ResourceContextProps>({
    bundleOptions: [],
    isConnect: false,
    keyOptions: [],
    resourceFilePath: '',
    resources: null,
    selectedBundleOption: 'one-dialog',
    setSelectedBundleOption: NOOP,
    handleReloadResourceFile: NOOP,
    handleResourceFileChange: NOOP,
    handleResourcesUpdate: NOOP,
});

export function ResourceProvider(props: PropsWithChildren<{}>) {
    const { children } = props;

    const { handleOpenSnackbar } = useSnackbarContext();

    const {
        handleResourceFilePathChange,
        resourceFilePath,
    } = useResourceFilePath();

    const [resources, setResources] = useState<Resources | null>(null);

    const {
        bundleOptions,
        keyOptions,
        selectedBundleOption,
        setSelectedBundleOption,
    } = useBundleSelect(resources);

    useEffect(() => {
        const handleSuccessReadResources = (_: IpcRendererEvent, ...args: any[]) => {
            const [resources, message] = args;
            setResources(checkResources(resources) ? resources : null);
            if (isNotNil(message)) {
                handleOpenSnackbar(message as string);
            }
        };

        window.ipcRenderer.receive('success_update_resources', handleSuccessReadResources);
        return () => window.ipcRenderer.removeListener('success_update_resources', handleSuccessReadResources);
    }, []);

    const handleReloadResourceFile = useCallback(() => {
        window.ipcRenderer.send('input_resources', resourceFilePath);
    }, [resourceFilePath]);

    const handleResourceFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { target: { files } } = event;
        const currentFile = files?.[0] as File & { path: string };
        handleResourceFilePathChange(currentFile.path);
    }, []);

    const handleResourcesUpdate = useCallback((updatedResources: Resources) => {
        // TODO: POST /namespaces/{namespaceId}/manifests

        window.ipcRenderer.send('update_resources', {
            path: resourceFilePath,
            updatedResources,
        });
    }, [resourceFilePath]);

    return (
        <ResourceContext.Provider value={{
            bundleOptions,
            isConnect: isNotNil(resources),
            keyOptions,
            resourceFilePath,
            resources,
            selectedBundleOption,
            setSelectedBundleOption,
            handleReloadResourceFile,
            handleResourceFileChange,
            handleResourcesUpdate,
        }}>
            {children}
        </ResourceContext.Provider>
    );
}
