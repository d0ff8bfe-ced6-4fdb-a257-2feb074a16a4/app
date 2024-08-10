import { INavigation } from '@features/navigation';
import Home from '@assets/icons/home.svg';
import Docs from '@assets/icons/docs.svg';
import Calendar from '@assets/icons/calendar.svg';

export const NavigationConfig: INavigation[] = [
    { path: '/home', label: 'Главная', icon: Home },
    { path: '/documents', label: 'Документы', icon: Docs },
    { path: '/calendar', label: 'Календарь', icon: Calendar },
];
