import cls from './MainPage.module.scss';
import { Button, Text } from '@shared/ui';
import { classNames, ColorEnum, SizeEnum, useAppSelector, WeightEnum } from '@shared/lib';
import {
  ProjectBar,
  ProjectCalendar, ProjectCanban,
  ProjectEnumValue,
  ProjectReview, selectCalendar,
  selectedProject,
} from '@entities/project';

export const MainPage = () => {
  const project = useAppSelector(selectedProject);
  const calendar = useAppSelector(selectCalendar);
  return (
    <div className={cls.wrapper}>
      <div className={cls.heading}>
        <Button
          size={SizeEnum.H3}
          color={ColorEnum.PRIMARY}
        >
          <Text.Paragraph
            size={SizeEnum.H3}
            color={ColorEnum.WHITE}
            weight={WeightEnum.BOLD}
          >
            Создать новый акт
          </Text.Paragraph>
        </Button>
        <Button
          size={SizeEnum.H3}
          color={ColorEnum.SECONDARY}
        >
          <Text.Paragraph
            size={SizeEnum.H3}
            color={ColorEnum.WHITE}
            weight={WeightEnum.BOLD}
          >
            Загрузить чертеж
          </Text.Paragraph>
        </Button>
        <Button
          size={SizeEnum.H3}
          color={ColorEnum.PRIMARY}
        >
          <Text.Paragraph
            size={SizeEnum.H3}
            color={ColorEnum.WHITE}
            weight={WeightEnum.BOLD}
          >
            Посмотреть отчет
          </Text.Paragraph>
        </Button>
      </div>
      <ProjectBar />
      <div className={cls.body}>
        <div className={classNames(cls.info, {
          [cls.hide]: !calendar,
          [cls.tasks]: project === ProjectEnumValue.TASKS,
        }, [])}>
          {project === ProjectEnumValue.REVIEW && <ProjectReview />}
          {project === ProjectEnumValue.TASKS && <ProjectCanban />}
        </div>
        <div className={classNames(cls.calendar, {
          [cls.tasks]: project === ProjectEnumValue.TASKS,
        }, [])}>
          <ProjectCalendar />
        </div>
      </div>
    </div>
  );
};

