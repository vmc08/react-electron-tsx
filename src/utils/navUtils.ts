import { slugify } from './stringUtils';
import { ISelectedKeys } from '../contexts/SidenavContext';

export interface INavGroup {
  title: string,
  items: INavRoute[]
}

export interface INavRoute {
  label: string,
  path?: string,
  iconType?: string,
  groups?: INavGroup[]
}

export const navRoutes = [{
  path: '/',
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
  iconType: 'book',
  label: 'API Documentation',
  groups: [{
    title: 'User',
    items: [{
      path: '/documentation/user/account',
      label: 'Account',
    }],
  }],
}];

export const getDefaultSelectedKeys = (): ISelectedKeys => {
  let defaultKeys: ISelectedKeys = {
    itemKey: 'dashboard',
    subMenuKey: undefined,
  };
  const { pathname } = window.location;
  navRoutes.map(({ path, label, groups }) => {
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
