import cls from './Label.module.scss';
import React, { useRef, useState } from 'react';
import { Check, X } from 'react-feather';
import { Button, Input, Text } from '@shared/ui';
import { BorderEnum, classNames, ColorEnum, SizeEnum } from '@shared/lib';
import { ITag } from '@widgets/ui/Canban/lib';

export interface LabelProps {
  color: string[];
  addTag: (value: string, color: string) => void;
  tags: ITag[];
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Label: React.FC<LabelProps> = (props: LabelProps) => {
  const input = useRef<HTMLInputElement>(null);  // Указал тип для useRef
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [label, setLabel] = useState<string>('');

  const isColorUsed = (color: string) => {
    return props.tags.some((item: ITag) => item.color === color);
  };

  return (
    <div className={cls.label}>
      <div className={cls.labelHeading}>
        <Text.Paragraph
          color={ColorEnum.TEXT}
          size={SizeEnum.H2}
        >
          Новый ярлык
        </Text.Paragraph>
        <X
          onClick={() => props.onClose(false)}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div className={cls.labelBody}>
        <Input
          size={SizeEnum.H3}
          border={BorderEnum.H6}
          ref={input}
          label={'Название'}
          value={label}
          onChange={(e) => {
            setLabel(e.target.value);
          }}
        />
        <Text.Paragraph
          color={ColorEnum.TEXT}
          size={SizeEnum.H2}
        >
          Выберите цвет
        </Text.Paragraph>
        <div className={cls.labelColorList}>
          {props.color.map((item: string, index: number) => (
            <li
              onClick={() => setSelectedColor(item)}
              key={index}
              className={classNames(cls.color, {
                [cls.selected]: isColorUsed(item),
              }, [])}
              style={{ backgroundColor: item, cursor: 'pointer' }}
            >
              {selectedColor === item ? <Check /> : null} {/* Заменил пустую строку на null */}
            </li>
          ))}
        </div>
        <Button
          size={SizeEnum.H3}
          border={BorderEnum.H6}
          onClick={() => {
            if (label !== '') {
              if (selectedColor === '') {
                alert('Please select color for label.');
                return;  // Добавил return, чтобы остановить выполнение функции
              }
              props.addTag(label, selectedColor);
              setSelectedColor('');
              setLabel('');
              if (input.current) {
                input.current.value = '';  // Убедился, что input.current не равен null
              }
            }
          }}
        >
          <Text.Paragraph
            color={ColorEnum.WHITE}
            size={SizeEnum.H3}
          >
            Создать
          </Text.Paragraph>
        </Button>
      </div>
    </div>
  );
};
