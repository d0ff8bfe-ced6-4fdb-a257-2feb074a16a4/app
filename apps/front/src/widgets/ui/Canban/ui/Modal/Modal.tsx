import React, { ReactNode } from 'react';
import cls from './Modal.module.scss';

interface Modal {
  children: ReactNode;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Modal = (props: Modal) => {
  return (
    <div className={cls.modal} onClick={() => props.onClose(false)}>
      <div
        className={cls.content}
        onClick={(event) => event.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  );
};

