import { AnyObject, Language, Resources, ResourceTemplate } from '../types';

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

export const supportLanguages: Language[] = ['en', 'de', 'fr'];

export const sortObject = (object: AnyObject): AnyObject => {
    if (typeof object !== 'object') {
        return object;
    }

    const sortedObject: AnyObject = {};

    Object.keys(object).sort().forEach((key) => {
        sortedObject[key] = sortObject(object[key]);
    });

    return sortedObject;
};
