import { DetailedHTMLProps, LiHTMLAttributes } from 'react';

export enum ProjectEnumValue {
  REVIEW = 'review',
  TASKS = 'tasks',
  DOCUMENTS = 'documents',
  SETTINGS = 'settings'
}

export enum ProjectCalendarType {
  DAY = 'День',
  WEEK = 'Неделя',
  MONTH = 'Месяц',
  YEAR = 'Год'
}

export enum ProjectTaskType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
  INFO = 'info',
}

export enum ProjectTaskStatus {
  DONE = 'done',
  PROGRESS = 'progress',
}

export interface IProjectTaskItemProps extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  title: string,
  time: string,
  contributors: string[]
  status: ProjectTaskStatus,
}
