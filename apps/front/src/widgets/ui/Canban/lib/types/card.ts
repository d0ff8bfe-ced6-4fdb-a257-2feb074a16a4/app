import { ITag } from './tag.ts';
import { ITask } from '@widgets/ui/Canban/lib';

export interface ICard {
  id: string;
  index?: number;
  title: string;
  task: ITask[];
  tags: ITag[];
}

