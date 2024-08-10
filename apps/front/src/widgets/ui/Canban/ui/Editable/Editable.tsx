import React, { FormEvent, useState } from 'react';
import { Plus, X } from 'react-feather';
import cls from './Editable.module.scss';
import { Button, Input, Text } from '@shared/ui';
import { BorderEnum, classNames, ColorEnum, SizeEnum } from '@shared/lib';

interface IProps {
  onSubmit: (va: string) => void;
  placeholder?: string;
  transfer?: boolean;
}

export const Editable = (
  {
    transfer = false,
    onSubmit,
    placeholder,
  }: IProps) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text) {
      setText('');
      onSubmit(text);
    }
    setShow(false);
  };

  return (
    <div className={cls.wrapper}>
      {show ? (
        <form
          className={classNames(cls.form, {
            [cls.transfer]: transfer,
          }, [])}
          onSubmit={handleOnSubmit}>
          <Input
            label={'Название'}
            size={SizeEnum.H4}
            border={BorderEnum.H6}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className={cls.formControl}>
            <Button
              className={cls.button}
              type={'submit'}
              size={SizeEnum.H4}
              color={ColorEnum.PRIMARY}
            >
              <Text.Paragraph
                size={SizeEnum.H4}
                color={ColorEnum.WHITE}
              >
                Добавить
              </Text.Paragraph>
            </Button>
            <X
              className="close"
              onClick={() => {
                setShow(false);
              }}
            />
          </div>
        </form>
      ) : (
        <Text.Paragraph
          size={SizeEnum.H3}
          color={ColorEnum.TEXT}
          className={cls.add}
          onClick={() => {
            setShow(true);
          }}
        >
          {placeholder ? placeholder : 'Добавить доску'}
          <Plus />
        </Text.Paragraph>
      )}
    </div>
  );
};

