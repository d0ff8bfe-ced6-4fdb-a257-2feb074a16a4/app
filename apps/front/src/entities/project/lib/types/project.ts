import { DetailedHTMLProps, LiHTMLAttributes } from 'react';

export enum ProjectEnumValue {
    REVIEW = 'review',
    TASKS = 'tasks',
    DOCUMENTS = 'docs',
    GANT = 'gant'
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


export enum ProjectDocsItemType {
    EXCEL = 'excel',
    PDF = 'pdf',
    WORD = 'word',
    PPTX = 'pptx',
}

export interface IProjectDocsItem extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
    name: string;
    type: ProjectDocsItemType;
    lastUpdated: Date;
}
