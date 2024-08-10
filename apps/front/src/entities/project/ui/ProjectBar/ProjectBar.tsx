import cls from './ProjectBar.module.scss';
import { Select, Text } from '@shared/ui';
import { classNames, ColorEnum, SizeEnum, useAppDispatch, useAppSelector } from '@shared/lib';
import { changeCalendar, changeProject, ProjectEnumValue, selectCalendar, selectedProject } from '@entities/project';
import Calendar from '@assets/icons/calendar.svg';

export const ProjectBar = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(selectedProject);
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
      <Select options={opt} placeholder={'Проекты'} onChange={() => {
      }} />
      <ul className={cls.list}>
        <li className={cls.listItem}>
          <Text.Paragraph
            onClick={() => {
              setActiveTab(ProjectEnumValue.REVIEW);
            }}
            color={project === ProjectEnumValue.REVIEW ? ColorEnum.PRIMARY : ColorEnum.TEXT}
            size={SizeEnum.H2}
          >
            Обзор
          </Text.Paragraph>
        </li>
        <li className={cls.listItem}>
          <Text.Paragraph
            onClick={() => {
              setActiveTab(ProjectEnumValue.TASKS);
            }}
            color={project === ProjectEnumValue.TASKS ? ColorEnum.PRIMARY : ColorEnum.TEXT}
            size={SizeEnum.H2}
          >
            Задачи
          </Text.Paragraph>
        </li>
        <li className={cls.listItem}>
          <Text.Paragraph
            onClick={() => {
              setActiveTab(ProjectEnumValue.DOCUMENTS);
            }}
            color={project === ProjectEnumValue.DOCUMENTS ? ColorEnum.PRIMARY : ColorEnum.TEXT}
            size={SizeEnum.H2}
          >
            Документы
          </Text.Paragraph>
        </li>
        <li className={cls.listItem}>
          <Text.Paragraph
            onClick={() => {
              setActiveTab(ProjectEnumValue.SETTINGS);
            }}
            color={project === ProjectEnumValue.SETTINGS ? ColorEnum.PRIMARY : ColorEnum.TEXT}
            size={SizeEnum.H2}
          >
            Настройки
          </Text.Paragraph>
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

