import { StylesConfig } from 'react-select';
import { ISelectItem, IsMulti } from '@shared/ui/Select';

export const customStyles: StylesConfig<ISelectItem, IsMulti> = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: 'var(--bg)',
        borderRadius: '4px',
        borderWidth: '0px',
        padding: '2px 10px',
        cursor: 'pointer',
        borderColor: state.isFocused ? 'var(--primary)' : 'var(--primary)',
        '&:hover': {
            borderColor: 'var(--primary-hover)',
        },
        fontFamily: 'var(--fontFamilyFirst)',
        fontSize: 'var(--paragraph-size-2)',
        minWidth: '300px',
        outline: 'none',

    }),
    option: (provided, state) => ({
        ...provided,
        outline: 'none',
        backgroundColor: state.isSelected ? 'var(--primary) !important' : state.isFocused ? 'var(--bg-dark)' : 'var(--bg)',
        color: state.isSelected ? 'var(--white)' : 'var(--text)',
        '&:hover': {
            backgroundColor: state.isSelected ? 'var(--primary-hover)' : 'var(--bg-dark)',
            color: state.isSelected ? 'var(--white)' : 'var(--text)',
        },
        fontFamily: 'var(--fontFamilyFirst)',
        margin: '1px 0',
        borderRadius: '4px',
        fontSize: 'var(--paragraph-size-2)',
        cursor: 'pointer',
    }),
    menu: (provided, state) => ({
        ...provided,
        backgroundColor: 'var(--bg)',
        zIndex: 9999,
        minWidth: '300px',

    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'var(--text)',
        fontFamily: 'var(--fontFamilyFirst)',
        minWidth: '300px',

    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'var(--text)',
        fontFamily: 'var(--fontFamilyFirst)',
        minWidth: '300px',

    }),
};
