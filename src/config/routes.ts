import RequireAuth from '../HOC/RequireAuth';
import LoadableComponent from './LoadableComponent';

const Register = LoadableComponent({ componentPathName: 'pages/Register' });
const NewPassword = LoadableComponent({ componentPathName: 'pages/NewPassword' });
const PasswordReset = LoadableComponent({ componentPathName: 'pages/PasswordReset' });
const Login = LoadableComponent({ componentPathName: 'pages/Login' });
const Dashboard = LoadableComponent({ componentPathName: 'pages/Dashboard' });
const Chart = LoadableComponent({ componentPathName: 'pages/Chart' });
const Reits = LoadableComponent({ componentPathName: 'pages/Reits' });
const Portfolio = LoadableComponent({ componentPathName: 'pages/Portfolio' });
const Watchlist = LoadableComponent({ componentPathName: 'pages/Watchlist' });
const Insights = LoadableComponent({ componentPathName: 'pages/Insights' });
const Transactions = LoadableComponent({ componentPathName: 'pages/Transactions' });
const MarketBriefs = LoadableComponent({ componentPathName: 'pages/MarketBriefs' });
const Training = LoadableComponent({ componentPathName: 'pages/Training' });
const Documentation = LoadableComponent({ componentPathName: 'pages/Documentation' });
const Settings = LoadableComponent({ componentPathName: 'pages/Settings' });

Register.preload();
NewPassword.preload();
PasswordReset.preload();
Login.preload();
Dashboard.preload();
Chart.preload();
Reits.preload();
Portfolio.preload();
Watchlist.preload();
Insights.preload();
Transactions.preload();
MarketBriefs.preload();
Training.preload();
Documentation.preload();
Settings.preload();

const routes = [
  {
    component: Register,
    path: '/register',
  },
  {
    component: RequireAuth(NewPassword, false),
    path: '/account/password/reset',
  },
  {
    component: RequireAuth(PasswordReset, false),
    path: '/password-reset',
  },
  {
    component: RequireAuth(Login, false),
    path: '/login',
  },
  {
    component: RequireAuth(Dashboard, false),
    path: '/dashboard',
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
