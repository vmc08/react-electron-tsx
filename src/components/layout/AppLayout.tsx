import React from 'react';
import styled from 'styled-components';
import { Layout, Icon } from 'antd';
import { useUserContextValue } from '../../contexts/UserContext';
import { useSidenavContextValue } from '../../contexts/SidenavContext';
import AccountVerifier from '../../HOC/AccountVerifier';

const { Content } = Layout;

import AppSideNav from './AppSidenav';
// import AppBreadcrumb from './AppBreadcrumb';

const { Header } = Layout;

interface IAppLayoutProps {
  requireAuth: boolean,
  children: any
}

const StyledHeader = styled(Header)`
  height: 56px !important;
  line-height: 56px !important;
  border-bottom: 1px solid #e8e8e8;
  background: #fff !important;
  padding: 0 25px !important;
  position: fixed;
  width: 100%;
  z-index: 1;
`;

const StyledContent = styled(Content)`
  padding: 24px;
  margin-top: 64px;
  @media only screen and (max-width: 600px) {
    margin-right: ${(props: { collapsed: number }) => {
      return `${props.collapsed ? 0 : '-256px'}`;
    }};
  }
`;

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
        <StyledHeader>
          <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggleCollapse}
          />
        </StyledHeader>
        <StyledContent collapsed={collapsed ? 1 : 0}>
          {/* <AppBreadcrumb /> */}
          {children}
        </StyledContent>
      </Layout>
    </Layout>
  );
};

export default AccountVerifier<IAppLayoutProps>(AppLayout);
