import { Task, ViewMode } from 'gantt-task-react';


export enum GantLocalEnum {
  RU = 'ru'
}

export interface IGantTableProps {
  tasks: Task[];
  viewMode: ViewMode;
  locale: GantLocalEnum;
  onExpanderClick: (task: Task) => void;
}
