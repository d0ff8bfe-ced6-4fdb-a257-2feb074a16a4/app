import React from 'react';
import cls from './ProjectCanban.module.scss';
import { Canban } from '@widgets/ui';

export const ProjectCanban = () => {

  return (
    <div className={cls.wrapper}>
      <Canban />
    </div>
  );
};
