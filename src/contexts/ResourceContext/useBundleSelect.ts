import { useMemo, useState } from 'react';
import { Resources, ResourceTemplateKeys } from '../../types';
import { ResourceContextProps } from './index';

const standardLanguage = 'en';

type UseBundleSelectReturns = Pick<ResourceContextProps, 'bundleOptions' | 'keyOptions' | 'selectedBundleOption' | 'setSelectedBundleOption'>;

export default function useBundleSelect(resources: Resources | null): UseBundleSelectReturns {
    const bundleOptions = useMemo<ResourceTemplateKeys[]>(() => {
        if (resources && resources[standardLanguage]) {
            return Object.keys(resources[standardLanguage]) as ResourceTemplateKeys[];
        }

        return [];
    }, [resources]);

    const [selectedBundleOption, setSelectedBundleOption] = useState<ResourceTemplateKeys>('one-dialog');

    const keyOptions = useMemo<string[]>(() => {
        if (resources && resources[standardLanguage] && selectedBundleOption) {
            return Object.keys(resources[standardLanguage][selectedBundleOption]);
        }

        return [];
    }, [resources, selectedBundleOption]);

    return {
        bundleOptions,
        keyOptions,
        selectedBundleOption,
        setSelectedBundleOption,
    };
}
