import { createBrowserRouter, redirect } from 'react-router-dom';
import { CalendarPage, LoginPage, MainPage, RegisterPage } from '@pages/ui';
import { Provider } from '@widgets/lib';

export const router = createBrowserRouter([
  {
    path: '/',
    // element: <AuthProvider />,
    children: [
      {
        index: true,
        element: <Provider><MainPage /></Provider>,
      },
      {
        path: 'calendar',
        element: <Provider><CalendarPage /></Provider>,
      },
    ],
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
