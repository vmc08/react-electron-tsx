import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import RequireAuth from '../HOC/RequireAuth';

const routes = [
  {
    component: RequireAuth(Login, false),
    path: '/login',
  },
  {
    component: RequireAuth(Dashboard),
    exact: true,
    path: '/',
  },
];

export default routes;
