import React from 'react';
import { Layout, Icon } from 'antd';
import { SidenavConsumer } from '../../contexts/SidenavContext';

const { Content, Footer } = Layout;

import AppSideNav from './AppSidenav';
import AppBreadcrumb from './AppBreadcrumb';

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
        <Content style={{ margin: '0 24px' }}>
          <AppBreadcrumb />
          {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Reitscreener Admin ©2019</Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
