import { Language, Resources, ResourceTemplate } from '../types';

export const checkResources = (resources: Resources): boolean => {
    for (const language of supportLanguages) {
        if (!checkResourceTemplate(resources[language])) {
            return false;
        }
    }
    return true;
};

export const checkResourceTemplate = (resource: ResourceTemplate): boolean => {
    return isNotNil(resource)
        && isNotNil(resource['one-dialog'])
        && isNotNil(resource['one-head'])
        && isNotNil(resource['one-toast'])
        && isNotNil(resource['page-dependent-ui'])
        && isNotNil(resource['page-independent-ui']);
};

export const isNotNil = (value: any) => {
    return value !== undefined && value !== null;
};

export const NOOP = () => {
};

export const supportLanguages: Language[] = ['de', 'en', 'fr'];

