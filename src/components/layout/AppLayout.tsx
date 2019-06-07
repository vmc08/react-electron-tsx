import React from 'react';
import { Layout, Icon } from 'antd';
import { useUserContextValue } from '../../contexts/UserContext';
import { useSidenavContextValue } from '../../contexts/SidenavContext';
import AccountVerifier from '../../HOC/AccountVerifier';

const { Content, Footer } = Layout;

import AppSideNav from './AppSidenav';
import AppBreadcrumb from './AppBreadcrumb';

const { Header } = Layout;

interface IAppLayoutProps {
  requireAuth: boolean,
  children: any
}

const AppLayout = (props: IAppLayoutProps) => {
  const { children, requireAuth } = props;
  const { account, token }: any = useUserContextValue();
  const { toggleCollapse, collapsed }: any = useSidenavContextValue();
  if (requireAuth && !(account && token)) {
    return null;
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppSideNav />
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px' }}>
          <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggleCollapse}
          />
        </Header>
        <Content style={{ margin: '0 24px' }}>
          <AppBreadcrumb />
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Reitscreener ©2019</Footer>
      </Layout>
    </Layout>
  );
};

export default AccountVerifier<IAppLayoutProps>(AppLayout);
