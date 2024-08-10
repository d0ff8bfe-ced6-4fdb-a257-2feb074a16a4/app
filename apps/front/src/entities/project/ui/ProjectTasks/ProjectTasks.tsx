import cls from './ProjectTasks.module.scss';
import { Text } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';
import { IProjectTaskItemProps, ProjectTaskItem, ProjectTaskStatus } from '@entities/project';
import Settings from '@assets/icons/settings.svg';

export const ProjectTasks = () => {
  const list: IProjectTaskItemProps[] = [
    {
      title: 'Разработать документацию по проекту',
      time: '15.08 в 12:45',
      status: ProjectTaskStatus.DONE,
      contributors: ['aboba'],
    },
  ];
  return (
    <div className={cls.wrapper}>
      <div className={cls.title}>
        <Text.Heading

          size={SizeEnum.H5}
          color={ColorEnum.TEXT}
        >
          Список задач
        </Text.Heading>
        <span className={cls.icon}>
          <Settings />
        </span>
      </div>
      <Text.Paragraph

        size={SizeEnum.H4}
        color={ColorEnum.TEXT}
      >
        Не пропустите запланированные мероприятия
      </Text.Paragraph>
      <ul className={cls.list}>
        {list.map((item) => (
          <ProjectTaskItem key={item.title} {...item} />
        ))}
      </ul>
    </div>
  );
};

