import cls from './Container.module.scss';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { classNames } from '@shared/lib';


interface IContainer extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}

export const Container = (
  {
    children,
    className,
    ...props
  }: IContainer) => {
  return (
    <div
      {...props}
      className={classNames(cls.container, {}, [className])}>
      {children}
    </div>
  );
};

