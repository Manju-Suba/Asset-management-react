import { lazy } from 'react';
// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import { PERMISSIONS } from '../constants/constants';
import Profile from 'pages/components-overview/Users/Profile';
import ProtectedRoute from './ProtectRoutes';

const User2AssetList = Loadable(lazy(() => import('pages/components-overview/User2AssetList')));
const User2ScrappedAsset = Loadable(lazy(() => import('pages/components-overview/User2ScrappedAsset')));
const User2TransferredAsset = Loadable(lazy(() => import('pages/components-overview/User2TransferredAsset')));

// ==============================|| MAIN ROUTING ||============================== //

const User2Routes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'asset-list',
      element: (
        <ProtectedRoute permissions={PERMISSIONS.CAN_VIEW_USER1_ASSET_LIST} redirectPath="/unauthorized" isAllowed={true}>
          <User2AssetList />
        </ProtectedRoute>
      )
    },
    {
      path: 'scarpped-asset',
      element: (
        <ProtectedRoute permissions={PERMISSIONS.CAN_VIEW_USER1_SCRAP_ASSET} redirectPath="/unauthorized" isAllowed={true}>
          <User2ScrappedAsset />
        </ProtectedRoute>
      )
    },
    {
      path: 'transfered-asset',
      element: (
        <ProtectedRoute permissions={PERMISSIONS.CAN_VIEW_USER1_DISPOSED_ASSET} redirectPath="/unauthorized" isAllowed={true}>
          <User2TransferredAsset />
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

export default User2Routes;
