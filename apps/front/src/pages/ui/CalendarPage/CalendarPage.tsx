import cls from './CalendarPage.module.scss';
import { ProjectCalendar, ProjectTasks } from '@entities/project';

export const CalendarPage = () => {
  return (
    <div className={cls.wrapper}>
      <div className={cls.tasks}>
        <ProjectTasks />
      </div>
      <div className={cls.calendar}>
        <ProjectCalendar />
      </div>
    </div>
  );
};

