import { createBrowserRouter, redirect } from 'react-router-dom';
import { CalendarPage, DocumentsPage, LoginPage, MainPage, MainPageProvider, RegisterPage } from '@pages/ui';
import { Provider } from '@widgets/lib';
import { ProjectCanban, ProjectDocs, ProjectGant, ProjectReview } from '@entities/project';

export const router = createBrowserRouter([
    {
        index: true,
        loader: async () => redirect('/home/review'),
    },
    {
        path: '/home',
        children: [
            {
                index: true,
                loader: async () => redirect('/home/review'),
            },
            {
                path: 'review',
                element: <Provider><MainPageProvider><ProjectReview /></MainPageProvider></Provider>,
            },
            {
                path: 'tasks',
                element: <Provider><MainPageProvider><ProjectCanban /></MainPageProvider></Provider>,
            },
            {
                path: 'gant',
                element: <Provider><MainPageProvider><ProjectGant /></MainPageProvider></Provider>,
            },
            {
                path: 'docs',
                element: <Provider><MainPageProvider><ProjectDocs /></MainPageProvider></Provider>,
            },
        ],
    },
    {
        path: '/calendar',
        element: <Provider><CalendarPage /></Provider>,
    },
    {
        path: '/documents',
        element: <Provider><DocumentsPage /></Provider>,
    },
    {
        path: '/auth',
        children: [
            {
                index: true,
                loader: async () => redirect('/auth/login'),
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
        ],
    },
]);
