import React from 'react';
import { Layout, Icon } from 'antd';
import { SidenavConsumer } from '../../contexts/SidenavContext';

import AppSideNav from './AppSidenav';
import AppContent from './AppContent';

const { Header } = Layout;

const AppLayout = (props: any) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppSideNav />
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px' }}>
          <SidenavConsumer>
            {({ toggleCollapse, collapsed }: any) => (
              <Icon
                className="trigger"
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={toggleCollapse}
              />
            )}
          </SidenavConsumer>
        </Header>
        <AppContent>
          {props.children}
        </AppContent>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
