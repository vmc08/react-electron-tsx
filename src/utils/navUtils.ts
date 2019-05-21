export interface INavGroup {
  title: string,
  items: INavRoute[]
}

export interface INavRoute {
  label: string,
  path?: string | null,
  iconType?: string,
  groups?: INavGroup[]
}

export const navRoutes = [{
  path: '/',
  iconType: 'appstore',
  label: 'Dashboard',
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
