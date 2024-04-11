import { FormikConfig, FormikHelpers } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { ResourceContextProps } from '../../../contexts';
import { useResourceContext } from '../../../hooks';
import { Resources } from '../../../types';
import { isNotNil, sortObject } from '../../../utils';

export interface CreateTranslationProps {
    translation: string;
}

export interface UpdateTranslationProps {
    en_content: string;
    de_content: string;
    fr_content: string;
}

export type UseResourceEditorReturns = Pick<ResourceContextProps, 'isConnect' | 'keyOptions'> & {
    handleCreateTranslation: FormikConfig<CreateTranslationProps>['onSubmit'];
    handleRemoveTranslation: () => void;
    handleUpdateTranslation: FormikConfig<UpdateTranslationProps>['onSubmit'];
    isCreateDialogOpen: boolean;
    keyInputValue: string;
    setIsCreateDialogOpen: (value: boolean) => void;
    setKeyInputValue: (value: string) => void;
}

// TODO: to be refactoring.
export default function useResourceEditor(): UseResourceEditorReturns {
    const {
        isConnect,
        handleResourcesUpdate,
        keyOptions,
        resources,
        selectedBundleOption,
    } = useResourceContext();

    const [keyInputValue, setKeyInputValue] = useState<string>('');
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        setKeyInputValue('');
    }, [selectedBundleOption]);

    const handleCreateTranslation = useCallback((
        { translation }: CreateTranslationProps,
        { setSubmitting }: FormikHelpers<CreateTranslationProps>,
    ) => {
        if (isNotNil((resources as Resources).de[selectedBundleOption][translation])
            || isNotNil((resources as Resources).en[selectedBundleOption][translation])
            || isNotNil((resources as Resources).fr[selectedBundleOption][translation])) {
            setKeyInputValue(translation);
            return;
        }

        const newResources: Resources = JSON.parse(JSON.stringify(resources));
        newResources.de[selectedBundleOption][translation] = '';
        newResources.en[selectedBundleOption][translation] = '';
        newResources.fr[selectedBundleOption][translation] = '';
        const sortedResources = sortObject(newResources) as Resources;
        handleResourcesUpdate(sortedResources);
        setKeyInputValue(translation);
        setSubmitting(false);
    }, [
        handleResourcesUpdate,
        resources,
        selectedBundleOption,
    ]);

    const handleRemoveTranslation = useCallback(() => {
        const newResources: Resources = JSON.parse(JSON.stringify(resources));
        delete newResources.de[selectedBundleOption][keyInputValue];
        delete newResources.en[selectedBundleOption][keyInputValue];
        delete newResources.fr[selectedBundleOption][keyInputValue];
        handleResourcesUpdate(newResources);
        setKeyInputValue('');
    }, [
        handleResourcesUpdate,
        keyInputValue,
        resources,
        selectedBundleOption,
    ]);

    const handleUpdateTranslation = useCallback((
        { en_content, de_content, fr_content }: UpdateTranslationProps,
        { setSubmitting }: FormikHelpers<UpdateTranslationProps>,
    ) => {
        const newResources: Resources = JSON.parse(JSON.stringify(resources));
        newResources.en[selectedBundleOption][keyInputValue] = en_content;
        newResources.de[selectedBundleOption][keyInputValue] = de_content;
        newResources.fr[selectedBundleOption][keyInputValue] = fr_content;
        handleResourcesUpdate(newResources);
        setSubmitting(false);
    }, [
        handleResourcesUpdate,
        keyInputValue,
        resources,
        selectedBundleOption,
    ]);

    return {
        handleCreateTranslation,
        handleRemoveTranslation,
        handleUpdateTranslation,
        isConnect,
        isCreateDialogOpen,
        keyInputValue,
        keyOptions,
        setIsCreateDialogOpen,
        setKeyInputValue,
    };
}
