import React, { useState } from 'react';
import cls from './ProjectGant.module.scss';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import { Text } from '@shared/ui';
import { ColorEnum, SizeEnum, WeightEnum } from '@shared/lib';
import 'gantt-task-react/dist/index.css';

export const ProjectGant = () => {
    const currentDate = new Date();
    const initialTasks: Task[] = [
        {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 8),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 22),
            name: 'Иван Иванов',
            id: 'builder_1',
            progress: 45,
            type: 'task',
            project: 'builderProject',
            displayOrder: 2,
        },
        {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 13, 8),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 31, 22),
            name: 'Петр Петров',
            id: 'builder_2',
            progress: 25,
            type: 'task',
            project: 'builderProject',
            displayOrder: 3,
        },
        {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 12, 8),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 22, 28),
            name: 'Анна Сидорова',
            id: 'cleaner_1',
            progress: 80,
            type: 'task',
            project: 'cleanerProject',
            displayOrder: 5,
        },
        {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 8),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 18),
            name: 'Мария Кузнецова',
            id: 'cleaner_2',
            progress: 70,
            type: 'task',
            project: 'cleanerProject',
            displayOrder: 6,
        },
    ];

    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const handleExpanderClick = (task: Task) => {
        setTasks(prevTasks => {
            const newTasks = prevTasks.map(t => {
                if (t.id === task.id) {
                    return { ...t, hideChildren: !t.hideChildren };
                }
                return t;
            });
            return newTasks;
        });
    };

    return (
        <div className={cls.wrapper}>
            <Gantt
                listCellWidth={''}
                viewMode={ViewMode.Day}
                locale="ru"
                tasks={tasks}
                onExpanderClick={handleExpanderClick}
            />
        </div>
    );
};
