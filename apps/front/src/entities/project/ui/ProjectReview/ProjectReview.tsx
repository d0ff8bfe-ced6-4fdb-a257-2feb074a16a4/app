import cls from './ProjectReview.module.scss';
import { Tag } from '@shared/ui/Tag';
import { BorderEnum, ColorEnum, SizeEnum, WeightEnum } from '@shared/lib';
import { Text } from '@shared/ui';

export const ProjectReview = () => {
  const projectWidgetData = {
    project: {
      title: 'Command project - Project documentation',
      description: `Проект "Управление проектной документацией" направлен на создание системы эффективного управления всей документацией, связанной с строительными проектами компании. Целью проекта является упрощение процессов создания, утверждения, обновления, хранения и использования проектных документов, что способствует повышению операционной эффективности и снижению рисков в проектной деятельности.`,
      status: {
        daysRemaining: 43,
        progress: 57,
        progressLabel: 'в работе',
        dateRange: '01.08 - 21.09',
      },
      participants: [
        {
          name: 'Участник 1',
          avatarUrl: 'url_to_avatar1',
        },
        {
          name: 'Участник 2',
          avatarUrl: 'url_to_avatar2',
        },
        {
          name: 'Участник 3',
          avatarUrl: 'url_to_avatar3',
        },
      ],
      icons: {
        projectIcon: 'CP',
        calendarIcon: 'url_to_calendar_icon',
      },
    },
  };


  return (
    <div className={cls.wrapper}>
      <div className={cls.heading}>
        <Tag
          size={SizeEnum.H3}
          bgColor={ColorEnum.SECONDARY}
          border={BorderEnum.H2}
        >
          <Text.Paragraph
            size={SizeEnum.H2}
            weight={WeightEnum.BOLD}
            color={ColorEnum.WHITE}
          >
            {projectWidgetData.project.status.dateRange}
          </Text.Paragraph>
        </Tag>
        <Tag
          size={SizeEnum.H3}
          bgColor={ColorEnum.PRIMARY}
          border={BorderEnum.H2}
        >
          <Text.Paragraph
            size={SizeEnum.H2}
            weight={WeightEnum.BOLD}
            color={ColorEnum.WHITE}
          >
            {projectWidgetData.project.status.progressLabel}
          </Text.Paragraph>
        </Tag>
      </div>
      <div className={cls.body}>
        <div className={cls.title}>
          <Text.Heading
            size={SizeEnum.H5}
            weight={WeightEnum.MEDIUM}
            color={ColorEnum.TEXT}
          >
            {projectWidgetData.project.title}
          </Text.Heading>
          <div className={cls.status}>
            <div className={cls.statusTitle}>
              <Text.Paragraph
                size={SizeEnum.H3}
                weight={WeightEnum.MEDIUM}
                color={ColorEnum.TEXT}
              >
                Осталось&nbsp;
                {projectWidgetData.project.status.daysRemaining}&nbsp;дня
              </Text.Paragraph>
              <Text.Paragraph
                size={SizeEnum.H2}
                weight={WeightEnum.BOLD}
                color={ColorEnum.TEXT}
              >
                {projectWidgetData.project.status.progress}%
              </Text.Paragraph>
            </div>
            <div
              style={{ width: 300 }}
              className={cls.statusBar}>
              <span style={{ width: `${projectWidgetData.project.status.progress * 3}px` }}>
              </span>
            </div>
          </div>
        </div>
        <div className={cls.content}>
          <div className={cls.description}>
            <Text.Paragraph
              size={SizeEnum.H1}
              weight={WeightEnum.MEDIUM}
              color={ColorEnum.TEXT}
            >
              Описание
            </Text.Paragraph>
            <Text.Paragraph
              size={SizeEnum.H2}
              color={ColorEnum.TEXT}
            >
              {projectWidgetData.project.description}
            </Text.Paragraph>
          </div>
          <div className={cls.members}>
            <Text.Paragraph
              size={SizeEnum.H1}
              weight={WeightEnum.MEDIUM}
              color={ColorEnum.TEXT}
            >
              Участники
            </Text.Paragraph>
            <ul className={cls.list}>
              {projectWidgetData.project.participants.map((item) => (
                <li className={cls.member}></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

