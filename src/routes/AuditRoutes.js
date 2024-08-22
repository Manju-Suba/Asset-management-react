import { lazy } from 'react';
// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import { PERMISSIONS } from '../constants/constants';
import Profile from 'pages/components-overview/Users/Profile';
import ProtectedRoute from './ProtectRoutes';

const AuditDisposed = Loadable(lazy(() => import('pages/components-overview/AuditDisposed')));

// ==============================|| MAIN ROUTING ||============================== //

const AuditRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'AssetAuditDisposed',
      element: (
        <ProtectedRoute permissions={PERMISSIONS.CAN_VIEW_AUDIT_DISPOSED} redirectPath="/unauthorized" isAllowed={true}>
          <AuditDisposed />
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

export default AuditRoutes;
