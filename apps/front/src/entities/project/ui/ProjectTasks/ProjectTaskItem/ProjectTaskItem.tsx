import cls from './ProjectTaskItem.module.scss';
import { IProjectTaskItemProps, ProjectTaskStatus } from '@entities/project';
import { Text } from '@shared/ui';
import { classNames, ColorEnum, SizeEnum, WeightEnum } from '@shared/lib';
import IconDone from '@assets/icons/taskDone.svg';
import IconProgress from '@assets/icons/taskInProgress.svg';

export const ProjectTaskItem = (
  {
    status,
    time,
    contributors,
    title,
    id,
    ...props
  }: IProjectTaskItemProps,
) => {
  return (
    <li
      {...props}
      className={cls.wrapper}
    >
      <Text.Paragraph
        size={SizeEnum.H1}
        color={ColorEnum.TEXT}
        weight={WeightEnum.BOLD}
        className={classNames(cls.title, {
          [cls.done]: status === ProjectTaskStatus.DONE,
        }, [])}
      >
        {title}
      </Text.Paragraph>
      <ul className={cls.list}>
        {contributors.map((item) => (
          <li className={cls.listItem}>
          </li>
        ))}
      </ul>
      <div className={cls.info}>
        <Text.Paragraph
          size={SizeEnum.H5}
          color={ColorEnum.TEXT}
        >
          {time}
        </Text.Paragraph>
        <span className={cls.icon}>
          {status === ProjectTaskStatus.DONE ? <IconDone /> : <IconProgress />}
        </span>
      </div>
    </li>
  );
};

