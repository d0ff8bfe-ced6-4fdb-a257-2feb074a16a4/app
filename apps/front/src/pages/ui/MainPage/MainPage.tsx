import cls from './MainPage.module.scss';
import { Button, Text } from '@shared/ui';
import { classNames, ColorEnum, SizeEnum, useAppSelector, WeightEnum } from '@shared/lib';
import {
    ProjectCalendar, ProjectCanban,
    ProjectEnumValue,
    ProjectReview, selectCalendar,
    selectedProject,
} from '@entities/project';
import { MainPageProvider } from '@pages/ui';

export const MainPage = () => {
    const project = useAppSelector(selectedProject);
    const calendar = useAppSelector(selectCalendar);
    return (
        <div className={cls.wrapper}>
            <MainPageProvider>
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
            </MainPageProvider>
        </div>
    );
};

