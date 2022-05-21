import {
  useRoutes,
  Navigate
} from 'react-router-dom';

// Layouts
import DashboardLayout from './layouts/dashboardLayout/DashboardLayout';
import AuthLayout from './layouts/authLayout/AuthLayout';
import DetailsPageLayout from './layouts/detailsPageLayout/DetailsPageLayout';
import ProfileDetailsLayout from './layouts/detailsPageLayout/ProfileDetailsLayout';

// Pages
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import Conversations from './pages/Conversations/Conversations';
import ConvoDetails from './pages/Conversations/ConvoDetails';
import Members from './pages/Members';
import Speakers from './pages/Speakers';
import Publications from './pages/Publications';
import UserMessages from './pages/UserMessages';
import Page404 from './pages/Page404';

import Colorpallete from './components/Colorpallete';

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
      path: 'dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'convo', element: <Conversations /> },
        { path: ':id', element: <ConvoDetails /> },

        { path: 'members', element: <Members /> },
        { path: 'member', element: <ProfileDetailsLayout layout={'member'} /> },
        { path: 'member/:id', element: <ProfileDetailsLayout layout={'member'} /> },

        { path: 'speakers', element: <Speakers /> },
        { path: 'speaker', element: <ProfileDetailsLayout layout={'speaker'} /> },
        { path: 'speaker/:id', element: <ProfileDetailsLayout layout={'speaker'} /> },

        { path: 'event', element: <DetailsPageLayout />, },
        { path: 'event/:id', element: <DetailsPageLayout />, },

        { path: 'publications', element: <Publications /> },
        { path: 'messages', element: <UserMessages /> },

      ]
    },
    { path: '*', element: <Navigate to='/404' replace /> }
  ]);
}

export default Routes
