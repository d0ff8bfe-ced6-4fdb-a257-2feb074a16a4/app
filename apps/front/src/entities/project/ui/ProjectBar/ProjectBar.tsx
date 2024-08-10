import cls from './ProjectBar.module.scss';
import { Select, Text } from '@shared/ui';
import { classNames, ColorEnum, SizeEnum, useAppDispatch, useAppSelector } from '@shared/lib';
import {
    changeCalendar,
    changeProject,
    ProjectCalendar,
    ProjectEnumValue,
    selectCalendar,
    selectedProject,
} from '@entities/project';
import Calendar from '@assets/icons/calendar.svg';
import { useLocation } from 'react-router-dom';

export const ProjectBar = () => {
    const dispatch = useAppDispatch();
    const project = useAppSelector(selectedProject);
    const { pathname } = useLocation();
    const calendar = useAppSelector(selectCalendar);
    const opt = [
        {
            value: 'all',
            label: 'Все проекты',
        },
    ];
    const setActiveTab = (newValue: ProjectEnumValue) => {
        dispatch(changeProject(newValue));
    };
    return (
        <div className={cls.wrapper}>
            <ProjectCalendar />
            <Select options={opt} placeholder={'Проекты'} onChange={() => {
            }} />
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    <Text.Link
                        to="/home/review"
                        color={pathname.includes(ProjectEnumValue.REVIEW) ? ColorEnum.PRIMARY : ColorEnum.TEXT}
                        size={SizeEnum.H2}
                    >
                        Обзор
                    </Text.Link>
                </li>
                <li className={cls.listItem}>
                    <Text.Link
                        to="/home/tasks"
                        color={pathname.includes(ProjectEnumValue.TASKS) ? ColorEnum.PRIMARY : ColorEnum.TEXT}
                        size={SizeEnum.H2}
                    >
                        Задачи
                    </Text.Link>
                </li>
                <li className={cls.listItem}>
                    <Text.Link
                        to="/home/gant"
                        color={pathname.includes(ProjectEnumValue.GANT) ? ColorEnum.PRIMARY : ColorEnum.TEXT}
                        size={SizeEnum.H2}
                    >
                        Гант
                    </Text.Link>
                </li>
                <li className={cls.listItem}>
                    <Text.Link
                        to="/home/docs"
                        color={pathname.includes(ProjectEnumValue.DOCUMENTS) ? ColorEnum.PRIMARY : ColorEnum.TEXT}
                        size={SizeEnum.H2}
                    >
                        Документы
                    </Text.Link>
                </li>
                <li
                    onClick={() => {
                        dispatch(changeCalendar(!calendar));
                    }}
                    className={cls.listItem}>
                    <div className={classNames(cls.icon, {
                        [cls.active]: calendar,
                    }, [])}>
                        <Calendar />
                    </div>
                </li>
            </ul>
        </div>
    );
};

