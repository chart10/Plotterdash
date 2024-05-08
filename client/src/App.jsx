import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddTask,
  Stats,
  AllTasks,
  Profile,
  Admin,
} from './pages';

import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { action as addTaskAction } from './pages/AddTask';
import { loader as dashboardLoader } from './pages/DashboardLayout';
import { loader as allTasksLoader } from './pages/AllTasks';

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') == 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AllTasks />,
            loader: allTasksLoader,
          },
          {
            path: 'add-task',
            element: <AddTask />,
            action: addTaskAction,
          },
          {
            path: 'stats',
            element: <Stats />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'admin',
            element: <Admin />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
