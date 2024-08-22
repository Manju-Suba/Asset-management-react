import MainLayout from 'layout/MainLayout';
import { PERMISSIONS } from '../constants/constants';
import Profile from 'pages/components-overview/Users/Profile';
import ProtectedRoute from './ProtectRoutes';
import SapAssetCreation from 'pages/components-overview/SapAssetCreation';

// const SapAssetCreation = Loadable(lazy(() => import('pages/components-overview/SapAssetCreation')));

// ==============================|| MAIN ROUTING ||============================== //

const SapRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'SapAssetCreation',
      element: (
        <ProtectedRoute permissions={PERMISSIONS.CAN_VIEW_SAP_ACTION_DATA} redirectPath="/unauthorized" isAllowed={true}>
          <SapAssetCreation />
        </ProtectedRoute>
      )
    },
    {
      path: 'Profile',
      element: (
        <ProtectedRoute permissions={PERMISSIONS.CAN_VIEW_PROFILE} redirectPath="/unauthorized" isAllowed={true}>
          <Profile />
        </ProtectedRoute>
      )
    }
  ]
};

export default SapRoutes;
