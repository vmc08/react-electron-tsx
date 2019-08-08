import React from 'react';
import styled from 'styled-components';
import { Layout, Icon, Affix } from 'antd';
import { useUserContextValue } from '../../contexts/UserContext';
import { useSidenavContextValue } from '../../contexts/SidenavContext';
import AccountVerifier from '../../HOC/AccountVerifier';
import AppSideNav from './AppSidenav';
import MarketsDropdown from './MarketsDropdown';

const { Content, Header } = Layout;

interface IAppLayoutProps {
  requireAuth: boolean,
  children: any
}

const StyledHeader = styled(Header)`
  height: 56px !important;
  line-height: 56px !important;
  border-bottom: 1px solid #e8e8e8;
  background: #fff !important;
  z-index: 1;
  @media (max-width: 577px) and (orientation: portrait),
  (max-width: 824px) and (orientation: landscape) {
    margin-right: ${(props: { collapsed: number }) => {
      return `${props.collapsed ? 0 : '-225px'}`;
    }};
  }
`;

const StyledContent = styled(Content)`
  @media (max-width: 577px) and (orientation: portrait),
  (max-width: 824px) and (orientation: landscape) {
    margin-right: ${(props: { collapsed: number }) => {
      return `${props.collapsed ? 0 : '-225px'}`;
    }};
  }
`;

const AppLayout = (props: IAppLayoutProps) => {
  const { children, requireAuth } = props;
  const { authenticated } = useUserContextValue();
  const { toggleCollapse, collapsed } = useSidenavContextValue();
  if (requireAuth && !authenticated) {
    return null;
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppSideNav />
      <Layout>
        <Affix offsetTop={0}>
          <StyledHeader className="px-2 px-sm-3" collapsed={collapsed ? 1 : 0}>
            <Icon
              className="trigger mx-2"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={toggleCollapse}
            />
            <MarketsDropdown />
          </StyledHeader>
        </Affix>
        <StyledContent className="p-2 p-sm-3" collapsed={collapsed ? 1 : 0}>
          {children}
        </StyledContent>
      </Layout>
    </Layout>
  );
};

export default AccountVerifier<IAppLayoutProps>(AppLayout);
