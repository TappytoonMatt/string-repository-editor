export type Language = 'de' | 'en' | 'fr';

export interface Resources {
    de: ResourceTemplate;
    en: ResourceTemplate;
    fr: ResourceTemplate;
}

export interface ResourceTemplate {
    'one-dialog': StringObject;
    'one-head': StringObject;
    'one-toast': StringObject;
    'page-dependent-ui': StringObject;
    'page-independent-ui': StringObject;
}

interface StringObject {
    [key: string]: string;
}

export type ResourceTemplateKeys = keyof ResourceTemplate;
