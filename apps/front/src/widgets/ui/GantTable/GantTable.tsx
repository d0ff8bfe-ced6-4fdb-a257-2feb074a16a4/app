import cls from './GantTable.module.scss';
import { Gantt } from 'gantt-task-react';
import { IGantTableProps } from '@widgets/lib';

export const GantTable = (
  {
    onExpanderClick,
    tasks,
    viewMode,
    locale,
  }: IGantTableProps,
) => {
  return (
    <Gantt
      viewMode={viewMode}
      locale={locale}
      tasks={tasks}
      onExpanderClick={onExpanderClick}
    />
  );
};

