import { useRoutes } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ROLE_LIST } from '../constants/constants';
// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import SapRoutes from './SapRoutes';
import AuditRoutes from './AuditRoutes';
import UserRoutes from './UserRoutes';
import User2Routes from './User2Routes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const token = localStorage.getItem('token') || '';
  let routes;
  if (token == '') {
    routes = [LoginRoutes];
  } else {
    const decoded = jwtDecode(token);
    let role = decoded?.role?.[0]?.authority || '';
    if (role === ROLE_LIST.ADMIN) {
      routes = [LoginRoutes, MainRoutes];
    } else if (role === ROLE_LIST.AUDITOR) {
      routes = [LoginRoutes, AuditRoutes];
    } else if (role === ROLE_LIST.SAP) {
      routes = [LoginRoutes, SapRoutes];
    } else if (role === ROLE_LIST.USER) {
      routes = [LoginRoutes, UserRoutes];
    } else if (role === ROLE_LIST.USER1) {
      routes = [LoginRoutes, User2Routes];
    } else {
      routes = [LoginRoutes];
    }
  }
  return useRoutes(routes);
}
