import cls from './ProjectCalendar.module.scss';
import { Text } from '@shared/ui';
import ArrowLeft from '@assets/icons/arrowLeft.svg';
import ArrowRight from '@assets/icons/arrowRight.svg';
import { classNames, ColorEnum, SizeEnum, useAppSelector, WeightEnum } from '@shared/lib';
import { Calendar, ProjectCalendarType, selectCalendar } from '@entities/project';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const ProjectCalendar = () => {
  const calendar = useAppSelector(selectCalendar);
  const { pathname } = useLocation();
  const [view, setView] = useState<boolean>(calendar);
  const [active, setActive] = useState<ProjectCalendarType>(ProjectCalendarType.WEEK);
  useEffect(() => {
    if (pathname === '/calendar') {
      setView(true);
    } else {
      setView(calendar);
    }
  }, [calendar]);
  return (
    <div className={classNames(cls.wrapper, {
      [cls.hide]: !view,
    }, [])}>
      <div className={cls.title}>
        <div className={cls.today}>
          <Text.Paragraph
            size={SizeEnum.H2}
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
            size={SizeEnum.H2}
            color={ColorEnum.TEXT}
            weight={WeightEnum.BOLD}
          >
            May 21 – 26, 2045
          </Text.Paragraph>
          <span className={cls.icon}>
              <ArrowRight />
            </span>
        </div>
        <ul className={cls.list}>
          <li
            onClick={() => {
              setActive(ProjectCalendarType.DAY);
            }}
            className={classNames(cls.listItem, {
              [cls.active]: active === ProjectCalendarType.DAY,
            }, [])}>
            <Text.Paragraph
              size={SizeEnum.H2}
              weight={WeightEnum.BOLD}
              color={ColorEnum.TEXT}
            >
              {ProjectCalendarType.DAY}
            </Text.Paragraph>
          </li>
          <li
            onClick={() => {
              setActive(ProjectCalendarType.WEEK);
            }}
            className={classNames(cls.listItem, {
              [cls.active]: active === ProjectCalendarType.WEEK,
            }, [])}>
            <Text.Paragraph
              size={SizeEnum.H2}
              weight={WeightEnum.BOLD}
              color={ColorEnum.TEXT}
            >
              {ProjectCalendarType.WEEK}
            </Text.Paragraph>
          </li>
          <li
            onClick={() => {
              setActive(ProjectCalendarType.MONTH);
            }}
            className={classNames(cls.listItem, {
              [cls.active]: active === ProjectCalendarType.MONTH,
            }, [])}>
            <Text.Paragraph
              size={SizeEnum.H2}
              weight={WeightEnum.BOLD}
              color={ColorEnum.TEXT}
            >
              {ProjectCalendarType.MONTH}
            </Text.Paragraph>
          </li>
          <li
            onClick={() => {
              setActive(ProjectCalendarType.YEAR);
            }}
            className={classNames(cls.listItem, {
              [cls.active]: active === ProjectCalendarType.YEAR,
            }, [])}>
            <Text.Paragraph
              size={SizeEnum.H2}
              weight={WeightEnum.BOLD}
              color={ColorEnum.TEXT}
            >
              {ProjectCalendarType.YEAR}
            </Text.Paragraph>
          </li>
        </ul>
      </div>
      <Calendar />
    </div>
  );
};

