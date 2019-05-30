import React from 'react';
import { Layout, Icon } from 'antd';
import UserContext from '../../contexts/UserContext';
import { SidenavConsumer } from '../../contexts/SidenavContext';

const { Content, Footer } = Layout;

import AppSideNav from './AppSidenav';
import AppBreadcrumb from './AppBreadcrumb';

const { Header } = Layout;

interface IAppLayoutProps {
  requireAuth: boolean,
  children: any
}

class AppLayout extends React.Component<IAppLayoutProps> {
  constructor(props: IAppLayoutProps) {
    super(props);
  }

  render() {
    const { children, requireAuth } = this.props;
    const { account, token } = this.context;
    if (requireAuth && !(account && token)) {
      return null;
    }
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
            {children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Reitscreener ©2019</Footer>
        </Layout>
      </Layout>
    );
  }
}

AppLayout.contextType = UserContext;

export default AppLayout;
