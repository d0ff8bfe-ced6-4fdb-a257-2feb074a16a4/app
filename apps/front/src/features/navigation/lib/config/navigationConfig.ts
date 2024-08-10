import { INavigation } from '@features/navigation';
import Home from '@assets/icons/home.svg';
import Docs from '@assets/icons/docs.svg';
import Calendar from '@assets/icons/calendar.svg';

export const NavigationConfig: INavigation[] = [
  { path: '/', label: 'Главная', icon: Home },
  { path: '/docs', label: 'Документы', icon: Docs },
  { path: '/calendar', label: 'Календарь', icon: Calendar },
];
