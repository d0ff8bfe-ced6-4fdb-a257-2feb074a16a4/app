import cls from './ProjectCalendar.module.scss';
import { Text } from '@shared/ui';
import ArrowLeft from '@assets/icons/arrowLeft.svg';
import ArrowRight from '@assets/icons/arrowRight.svg';
import { classNames, ColorEnum, SizeEnum, useAppDispatch, useAppSelector, WeightEnum } from '@shared/lib';
import { Calendar, changeCalendar, ProjectCalendarType, selectCalendar } from '@entities/project';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const ProjectCalendar = () => {
    const calendar = useAppSelector(selectCalendar);
    const { pathname } = useLocation();
    const [view, setView] = useState<boolean>(calendar);
    const dispatch = useAppDispatch();
    const [active, setActive] = useState<ProjectCalendarType>(ProjectCalendarType.WEEK);
    const calendarRef = useRef<HTMLDivElement | null>(null); // Refs for calendar container

    // Handle key press for Escape key
    const handleKeyPress = useCallback((e: KeyboardEvent) => {
        if (e.code === 'Escape') {
            e.preventDefault();
            dispatch(changeCalendar(false));
        }
    }, [dispatch]);

    // Handle clicks outside of the calendar
    const handleClickOutside = useCallback((e: MouseEvent) => {
        if (calendarRef.current && !calendarRef.current?.contains(e.target as Node)) {
            dispatch(changeCalendar(false));
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress); // 'keydown' is more appropriate than 'keypress' for handling escape
        document.addEventListener('mousedown', handleClickOutside); // Listen for clicks outside
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            document.removeEventListener('mousedown', handleClickOutside); // Cleanup
        };
    }, [handleKeyPress, handleClickOutside]);

    useEffect(() => {
        if (pathname === '/calendar') {
            setView(true);
        } else {
            setView(calendar);
        }
    }, [calendar, pathname]);

    return (
        <div
            ref={calendarRef}
            className={classNames(cls.wrapper, {
                [cls.hide]: !view,
            }, [])}
        >
            <div className={cls.title}>
                <div className={cls.today}>
                    <Text.Paragraph
                        size={SizeEnum.H3}
                        color={ColorEnum.TEXT}
                        weight={WeightEnum.BOLD}
                    >
                        Сегодня
                    </Text.Paragraph>
                </div>
                <div className={cls.date}>
                    <span className={cls.icon}>
                        <ArrowLeft />
                    </span>
                    <Text.Paragraph
                        size={SizeEnum.H3}
                        color={ColorEnum.TEXT}
                        weight={WeightEnum.BOLD}
                    >
                        May 21 – 26, 2045
                    </Text.Paragraph>
                    <span className={cls.icon}>
                        <ArrowRight />
                    </span>
                </div>
            </div>
            <ul className={cls.list}>
                {Object.values(ProjectCalendarType).map((type: ProjectCalendarType) => (
                    <li
                        key={type}
                        onClick={() => setActive(type)}
                        className={classNames(cls.listItem, {
                            [cls.active]: active === type,
                        }, [])}
                    >
                        <Text.Paragraph
                            size={SizeEnum.H4}
                            weight={WeightEnum.BOLD}
                            color={ColorEnum.TEXT}
                        >
                            {type}
                        </Text.Paragraph>
                    </li>
                ))}
            </ul>
            <Calendar />
        </div>
    );
};
