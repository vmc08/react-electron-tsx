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
  margin-top: 56px;
  @media (max-width: 577px) and (orientation: portrait),
  (max-width: 824px) and (orientation: landscape) {
    margin-right: ${(props: { collapsed: number }) => {
      return `${props.collapsed ? 0 : '-225px'}`;
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
        <StyledContent className="p-2 p-sm-3" collapsed={collapsed ? 1 : 0}>
          {/* <AppBreadcrumb /> */}
          {children}
        </StyledContent>
      </Layout>
    </Layout>
  );
};

export default AccountVerifier<IAppLayoutProps>(AppLayout);
