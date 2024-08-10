import { ITag } from './tag.ts';
import { ITask } from '@widgets/ui/Canban/lib';

export interface ICard {
  id: string;
  index?: number;
  title: string;
  description: string;
  time: {
    startDate: Date | undefined,
    endDate: Date | undefined,
  },
  task: ITask[];
  tags: ITag[];
}

