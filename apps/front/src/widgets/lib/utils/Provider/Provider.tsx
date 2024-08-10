import cls from './Provider.module.scss';
import { ReactNode } from 'react';
import { Navbar, Sidebar } from '@widgets/ui';

export const Provider = (
  {
    children,
  }: { children: ReactNode }) => {
  return (
    <div className={cls.wrapper}>
      <Navbar />
      <div className={cls.content}>
        <Sidebar />
        <div className={cls.body}>
          {children}
        </div>
      </div>
    </div>
  );
};

