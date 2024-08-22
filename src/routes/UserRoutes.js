import { lazy } from 'react';
// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import { PERMISSIONS } from '../constants/constants';
import Profile from 'pages/components-overview/Users/Profile';
import ProtectedRoute from './ProtectRoutes';

const UserAssetList = Loadable(lazy(() => import('pages/components-overview/UserAssetList')));
const ScrappedAsset = Loadable(lazy(() => import('pages/components-overview/ScrappedAsset')));
const TransferedAsset = Loadable(lazy(() => import('pages/components-overview/TransferedAsset')));

// ==============================|| MAIN ROUTING ||============================== //

const UserRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'asset-list',
      element: (
        <ProtectedRoute permissions={PERMISSIONS.CAN_VIEW_USER_ASSET_LIST} redirectPath="/unauthorized" isAllowed={true}>
          <UserAssetList />
        </ProtectedRoute>
      )
    },
    {
      path: 'scarpped-asset',
      element: (
        <ProtectedRoute permissions={PERMISSIONS.CAN_VIEW_USER_SCRAP_ASSET} redirectPath="/unauthorized" isAllowed={true}>
          <ScrappedAsset />
        </ProtectedRoute>
      )
    },
    {
      path: 'transfered-asset',
      element: (
        <ProtectedRoute permissions={PERMISSIONS.CAN_VIEW_USER_DISPOSED_ASSET} redirectPath="/unauthorized" isAllowed={true}>
          <TransferedAsset />
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

export default UserRoutes;
