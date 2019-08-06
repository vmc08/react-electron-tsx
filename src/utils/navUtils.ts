import { slugify } from './stringUtils';
import { ISelectedKeys } from '../contexts/SidenavContext';

export interface INavGroup {
  title: string,
  items: INavRoute[]
}

export interface INavRoute {
  label: string,
  externalLink?: string,
  path?: string,
  iconType?: string,
  groups?: INavGroup[],
  customAction?: boolean
}

export const navRoutes = [{
  path: '/dashboard',
  iconType: 'appstore',
  label: 'Dashboard',
}, {
  path: '/chart',
  iconType: 'line-chart',
  label: 'Chart',
}, {
  path: '/reits',
  iconType: 'bank',
  label: 'REITs',
}, {
  path: '/portfolio',
  iconType: 'dollar',
  label: 'Portfolio',
}, {
  path: '/watchlist',
  iconType: 'eye',
  label: 'Watchlist',
}, {
  path: '/insights',
  iconType: 'bulb',
  label: 'Insights',
}, {
  path: '/transactions',
  iconType: 'transaction',
  label: 'Transactions',
}, {
  path: '/market-briefs',
  iconType: 'solution',
  label: 'Market Briefs',
}, {
  path: '/training',
  iconType: 'team',
  label: 'Training',
}, {
  iconType: 'question-circle',
  externalLink: 'https://help.reitscreener.com',
  label: 'Help',
}];

// , {
//   iconType: 'book',
//   label: 'API Documentation',
//   groups: [{
//     title: 'User',
//     items: [{
//       path: '/documentation/user/account',
//       label: 'Account',
//     }],
//   }],
// }

export const userRoutes = [{
  path: '/account/settings',
  iconType: 'setting',
  label: 'Settings',
}, {
  customAction: true,
  iconType: 'logout',
  label: 'Sign Out',
}];

export const getDefaultSelectedKeys = (navSource: INavRoute[]): ISelectedKeys => {
  let defaultKeys: ISelectedKeys = {
    itemKey: undefined,
    subMenuKey: undefined,
  };
  const { pathname } = window.location;
  navSource.map(({ path, label, groups }) => {
    if (groups && groups.length > 0) {
      const subMenuKey = getSidenavState() ? null : `sub-${slugify(label)}`;
      groups.map(({ items }) => {
        items.map(({ label: itemLabel, path: itemPath }) => {
          const itemKey = slugify(itemLabel);
          if (itemPath === pathname) {
            defaultKeys = { itemKey, subMenuKey: subMenuKey || undefined };
          }
        });
      });
    }
    if (path === pathname) {
      defaultKeys = { itemKey: slugify(label) };
    }
  });
  return defaultKeys;
};

export const setSidenavState = (state: boolean) =>
  sessionStorage.setItem('nav_collapsed', state.toString());

export const getSidenavState = () =>
  JSON.parse(sessionStorage.getItem('nav_collapsed') || 'false');

export const deleteSidenavState = () => sessionStorage.removeItem('nav_collapsed');
