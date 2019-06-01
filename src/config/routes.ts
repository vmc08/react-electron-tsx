import RequireAuth from '../HOC/RequireAuth';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Chart from '../pages/Chart';
import Reits from '../pages/Reits';
import Portfolio from '../pages/Portfolio';
import Watchlist from '../pages/Watchlist';
import Insights from '../pages/Insights';
import Transactions from '../pages/Transactions';
import MarketBriefs from '../pages/MarketBriefs';
import Training from '../pages/Training';
import Documentation from '../pages/Documentation';
import Settings from '../pages/Settings';

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
    component: RequireAuth(Chart, false),
    path: '/chart',
  },
  {
    component: RequireAuth(Reits, false),
    path: '/reits',
  },
  {
    component: RequireAuth(Portfolio),
    path: '/portfolio',
  },
  {
    component: RequireAuth(Watchlist),
    path: '/watchlist',
  },
  {
    component: RequireAuth(Insights, false),
    path: '/insights',
  },
  {
    component: RequireAuth(Transactions, false),
    path: '/transactions',
  },
  {
    component: RequireAuth(MarketBriefs, false),
    path: '/market-briefs',
  },
  {
    component: RequireAuth(Training),
    path: '/training',
  },
  {
    component: RequireAuth(Documentation),
    path: '/documentation/:group/:api',
  },
  {
    component: RequireAuth(Settings),
    path: '/account/settings',
  },
];

export default routes;
