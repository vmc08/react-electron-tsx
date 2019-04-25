import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import RequireAuth from '../HOC/RequireAuth';

const routes = [
  {
    component: RequireAuth(Dashboard),
    exact: true,
    path: '/',
  },
  {
    component: RequireAuth(Login, false),
    path: '/login',
  },
];

export default routes;
