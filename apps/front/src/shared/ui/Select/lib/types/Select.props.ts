import { StylesConfig } from 'react-select';


export interface ISelectItem {
    label: string;
    value: string;
}

export type IsMulti = false;

export interface ISelectProps {
    styles?: StylesConfig<ISelectItem, false>,
    isMulti?: boolean
    options: ISelectItem[],
    placeholder: string
    onChange: (newValue: any) => void;
}
