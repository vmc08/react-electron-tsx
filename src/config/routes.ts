import RequireAuth from '../HOC/RequireAuth';

import Dashboard from '../pages/Dashboard';
import Documentation from '../pages/Documentation';
import Login from '../pages/Login';

const routes = [
  {
    component: RequireAuth(Login, false),
    path: '/login',
  },
  {
    component: RequireAuth(Dashboard, false),
    exact: true,
    path: '/',
  },
  {
    component: RequireAuth(Documentation),
    path: '/documentation/user/account',
  },
];

export default routes;
