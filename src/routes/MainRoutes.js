import { lazy } from 'react';
// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import { PERMISSIONS } from '../constants/constants';
import Profile from 'pages/components-overview/Users/Profile';
import ProtectedRoute from './ProtectRoutes';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const AssetList = Loadable(lazy(() => import('pages/components-overview/AssetList')));
const AssetAllocation = Loadable(lazy(() => import('pages/components-overview/AssetAllocation')));
const AssetTransfer = Loadable(lazy(() => import('pages/components-overview/AssetTransfer')));
const AssetAudit = Loadable(lazy(() => import('pages/components-overview/AssetAudit')));
const DisposedAsset = Loadable(lazy(() => import('pages/components-overview/DisposedAsset')));
const Report = Loadable(lazy(() => import('pages/components-overview/Report')));
const Software = Loadable(lazy(() => import('pages/components-overview/Software')));
const Master = Loadable(lazy(() => import('pages/components-overview/Master')));
const AssetCreation = Loadable(lazy(() => import('pages/components-overview/AssetCreation')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
	path: '/',
	element: <MainLayout />,
	children: [
		{
			path: 'dashboard',
			element: (
				<ProtectedRoute permissions={PERMISSIONS.CAN_VIEW_DASHBOARD} redirectPath="/unauthorized" isAllowed={true}>
					<DashboardDefault />
				</ProtectedRoute>
			)
		},
		{
			path: 'sample-page',
			element: <SamplePage />
		},
		{
			path: 'Profile',
			element: (
				<ProtectedRoute permissions={PERMISSIONS.CAN_VIEW_PROFILE} redirectPath="/unauthorized" isAllowed={true}>
					<Profile />
				</ProtectedRoute>
			)
		},
		{
			path: 'AssetList',
			element: (
				<ProtectedRoute permissions={PERMISSIONS.CAN_VIEW_ASSET_LIST} redirectPath="/unauthorized" isAllowed={true}>
					<AssetList />
				</ProtectedRoute>
			)
		},
		{
			path: 'AssetAllocation',
			element: (
				<ProtectedRoute permissions={PERMISSIONS.CAN_VIEW_ASSET_ALLOCATION} redirectPath="/unauthorized" isAllowed={true}>
					<AssetAllocation />
				</ProtectedRoute>
			)
		},
		{
			path: 'AssetTransfer',
			element: (
				<ProtectedRoute permissions={PERMISSIONS.CAN_VIEW_ASSET_TRANSFER} redirectPath="/unauthorized" isAllowed={true}>
					<AssetTransfer />
				</ProtectedRoute>
			)
		},
		{
			path: 'AssetAudit',
			element: (
				<ProtectedRoute permissions={PERMISSIONS.CAN_VIEW_ASSET_AUDIT} redirectPath="/unauthorized" isAllowed={true}>
					<AssetAudit />
				</ProtectedRoute>
			)
		},
		{
			path: 'DisposedAsset',
			element: (
				<ProtectedRoute permissions={PERMISSIONS.CAN_VIEW_DISPOSED_AUDIT} redirectPath="/unauthorized" isAllowed={true}>
					<DisposedAsset />
				</ProtectedRoute>
			)
		},
		{
			path: 'Report',
			element: (
				<ProtectedRoute permissions={PERMISSIONS.CAN_VIEW_REPORT} redirectPath="/unauthorized" isAllowed={true}>
					<Report />
				</ProtectedRoute>
			)
		},
		{
			path: 'Software',
			element: (
				<ProtectedRoute permissions={PERMISSIONS.CAN_VIEW_ASSET_LIST} redirectPath="/unauthorized" isAllowed={true}>
					<Software />
				</ProtectedRoute>
			)
		},

		{
			path: 'Master',
			element: (
				<ProtectedRoute permissions={PERMISSIONS.CAN_VIEW_MASTER} redirectPath="/unauthorized" isAllowed={true}>
					<Master />
				</ProtectedRoute>
			)
		},
		{
			path: 'AssetCreation',
			element: (
				<ProtectedRoute permissions={PERMISSIONS.CAN_VIEW_MASTER} redirectPath="/unauthorized" isAllowed={true}>
					<AssetCreation />
				</ProtectedRoute>
			)
		}
	]
};

export default MainRoutes;
