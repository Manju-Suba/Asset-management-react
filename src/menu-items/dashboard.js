// assets
import { ReactComponent as Dashboard } from 'assets/images/icons/dashboard.svg';

// icons
const icons = {
  Dashboard
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.Dashboard,
      breadcrumbs: true
    }
  ]
};

export default dashboard;
