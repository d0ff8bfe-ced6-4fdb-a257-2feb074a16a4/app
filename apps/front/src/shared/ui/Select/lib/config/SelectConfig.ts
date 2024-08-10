import { StylesConfig } from 'react-select';
import { ISelectItem, IsMulti } from '@shared/ui/Select';

export const customStyles: StylesConfig<ISelectItem, IsMulti> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'var(--bg)',
    borderRadius: 'var(--border-radius-2)',
    borderWidth: '0px',
    padding: '2px 10px',
    cursor: "pointer",
    borderColor: state.isFocused ? 'var(--primary)' : 'var(--primary)',
    '&:hover': {
      borderColor: 'var(--primary-hover)',
    },
    boxShadow: state.isFocused ? '0 0 0 0 rgba(24, 144, 255, .25)' : null,
    fontFamily: 'var(--fontFamilyFirst)',
    fontSize: "var(--paragraph-size-2)",
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
    borderRadius: 'var(--border-radius-2)',
    fontSize: "var(--paragraph-size-2)",
    cursor: "pointer",
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: 'var(--bg-dark)',
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
