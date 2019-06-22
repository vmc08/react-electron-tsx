import RequireAuth from '../HOC/RequireAuth';
import LoadableComponent from './LoadableComponent';

const RegisterQuiz =  LoadableComponent({ componentName: 'pages/RegisterQuiz' });
const RegisterVerification = LoadableComponent({ componentName: 'pages/RegisterVerification' });
const Register = LoadableComponent({ componentName: 'pages/Register' });
const NewPassword = LoadableComponent({ componentName: 'pages/NewPassword' });
const PasswordReset = LoadableComponent({ componentName: 'pages/PasswordReset' });
const Login = LoadableComponent({ componentName: 'pages/Login' });
const Dashboard = LoadableComponent({ componentName: 'pages/Dashboard' });
const Chart = LoadableComponent({ componentName: 'pages/Chart' });
const Reits = LoadableComponent({ componentName: 'pages/Reits' });
const Portfolio = LoadableComponent({ componentName: 'pages/Portfolio' });
const Watchlist = LoadableComponent({ componentName: 'pages/Watchlist' });
const Insights = LoadableComponent({ componentName: 'pages/Insights' });
const Transactions = LoadableComponent({ componentName: 'pages/Transactions' });
const MarketBriefs = LoadableComponent({ componentName: 'pages/MarketBriefs' });
const Training = LoadableComponent({ componentName: 'pages/Training' });
const Documentation = LoadableComponent({ componentName: 'pages/Documentation' });
const Settings = LoadableComponent({ componentName: 'pages/Settings' });

RegisterQuiz.preload();
RegisterVerification.preload();
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
    component: RequireAuth(RegisterQuiz),
    exact: true,
    path: '/register/quiz/:quizNumber?',
  },
  {
    component: RequireAuth(RegisterVerification),
    exact: true,
    path: '/register/verify-email',
  },
  {
    component: RequireAuth(Register, false),
    path: '/register/trial/:affiliateId',
  },
  {
    component: RequireAuth(Register, false),
    exact: true,
    path: '/register/user',
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
