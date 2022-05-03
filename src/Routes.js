import {
  useRoutes,
  Navigate
} from 'react-router-dom';

// Layouts
import DashboardLayout from './layouts/dashboardLayout/DashboardLayout';
import AuthLayout from './layouts/authLayout/AuthLayout';

// Pages
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import Conversations from './pages/Conversations';
import Members from './pages/Members';
import Speakers from './pages/Speakers';
import Publications from './pages/Publications';
import UserMessages from './pages/UserMessages';
import Page404 from './pages/Page404';

import Colorpallete from './components/Colorpallete'

const Routes = () => {
  return useRoutes([
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        { path: '/', element: <Login /> },
        { path: 'reset', element: <ResetPassword /> },
        { path: '404', element: <Page404 /> },
        { path: 'colors', element: <Colorpallete /> }
      ]
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/dashboard', element: <Conversations /> },
        { path: 'members', element: <Members /> },
        { path: 'speakers', element: <Speakers /> },
        { path: 'publications', element: <Publications /> },
        { path: 'messages', element: <UserMessages /> },
      ]
    },
    { path: '*', element: <Navigate to='/404' replace /> }
  ]);
}

export default Routes
