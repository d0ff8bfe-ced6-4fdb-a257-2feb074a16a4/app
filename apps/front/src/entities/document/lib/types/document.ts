export enum DocumentBarTypesEnum {
    ACT = 'Акты',
    INVOICE = 'Счета',
    DESIGN = 'Чертежи',
    ALL = 'Все',
}
export interface IDocumentData {
    id: string;
    name: string;
    created_at: string;
    author: string;
    version: string;
    access: string;
}
