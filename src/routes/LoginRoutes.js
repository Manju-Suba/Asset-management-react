import { lazy } from 'react';
import { useParams } from 'react-router-dom';
// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import PageNotFound from 'pages/extra-pages/PageNotFound';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));
const ResetPassword = Loadable(lazy(() => import('pages/authentication/auth-forms/ResetPassword')));
const AssetQrDetails = Loadable(lazy(() => import('pages/components-overview/Assets/ViewAsset/AssetQrDetails')));
const AssetAuditQrDetails = Loadable(lazy(() => import('pages/components-overview/AssetAuditDisposed/AssetAuditQrDetails')));
const AssetQrDetailsWrapper = () => {
  const { id, company, plant } = useParams(); 
  return <AssetQrDetails id={id} company={company} plant={plant} />;
};
const AssetAuditQrDetailsWrapper= () => {
  const { id, company, plant,assetClass } = useParams(); 
  return <AssetAuditQrDetails assetId={id} company={company} plant={plant} assetClass={assetClass}/>;
};
// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <AuthLogin />
    },
    {
      path: 'register',
      element: <AuthRegister />
    },
    {
      path: 'reset-password/:token',
      element: <ResetPassword />
    },
    {
      path: 'asset-qr-details/:id/:company/:plant',
      element: <AssetQrDetailsWrapper />
    },
    {
      path: '*',
      element: <PageNotFound />
    },
    {
      path: '/unauthorized',
      element: <PageNotFound />
    },
    {
      path: 'asset-audit-qr-details/:id/:company/:plant/:assetClass', // Define URL parameters
      element: <AssetAuditQrDetailsWrapper />
    },
  ]
};

export default LoginRoutes;
