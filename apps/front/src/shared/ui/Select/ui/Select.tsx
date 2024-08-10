import cls from './Select.module.scss';
import ReactSelect from 'react-select';
import { customStyles, ISelectProps } from '@shared/ui/Select';

export const Select = (
  {
    styles = customStyles,
    options,
    isMulti,
    placeholder,
    onChange,
  }: ISelectProps) => {
  return (
    <ReactSelect
      styles={styles}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      isMulti={isMulti}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
