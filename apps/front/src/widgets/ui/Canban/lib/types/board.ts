import { ICard } from './card.ts';

export interface IBoard {
  id: string;
  name: string;
  card: ICard[]; // Теперь card всегда будет массивом, даже если он пустой
}
