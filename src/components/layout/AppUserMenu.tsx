import React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, Icon, Button } from 'antd';
import { ISelectedKeys } from '../../contexts/SidenavContext';
import UserContext from '../../contexts/UserContext';
import { deleteAuthToken } from '../../utils/authUtils';
import { deleteSidenavState } from '../../utils/navUtils';

const { SubMenu, ItemGroup, Item } = Menu;

interface IAppUserMenuProps extends ISelectedKeys, RouteComponentProps {
  changeRoute: (selectedKeys: { itemKey: string }, path: string) => {},
  setSelectedKeys: (selectedKeys: ISelectedKeys) => {}
}

const StyledMenu = styled(Menu)`
  border-right: 0 !important;
  width: calc(100% - 1px) !important;
  position: absolute;
  bottom: 0;
  .user-menu > .ant-menu-submenu-title {
    min-height: 64px !important;
    margin: 0 !important;
    background: #fff;
    display: flex;
    font-weight: 600;
    span > sub {
      top: 32%;
      right: 54%;
      font-size: 12px;
      font-weight: normal;
      background: #1890ff;
      color: #fff;
      padding: 2px 8px;
      border-radius: 10px;
    }
  }
`;

class AppUserMenu extends React.PureComponent<IAppUserMenuProps, {}> {
  constructor(props: IAppUserMenuProps) {
    super(props);
    this.logoutSession = this.logoutSession.bind(this);
  }

  logoutSession() {
    const { history, setSelectedKeys } = this.props;
    deleteAuthToken();
    deleteSidenavState();
    setSelectedKeys({ itemKey: 'dashboard' });
    history.replace('/login');
  }

  render() {
    const { itemKey, changeRoute } = this.props;
    const { account, token } = this.context;
    if (!(account && token)) {
      return (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: 256,
            padding: '16px 24px',
          }}
        >
          <Link to="/register">
            <Button
              type="primary"
              block
              style={{ marginBottom: 8 }}
            >
              Sign up
            </Button>
          </Link>
          <Link to="/login">
            <Button
              type="link"
              block
              style={{ marginBottom: 8 }}
            >
              Login
            </Button>
          </Link>
        </div>
      );
    }
    const menuProps = {
      ...(itemKey && {
        defaultSelectedKeys: [itemKey],
        selectedKeys: [itemKey] }
      ),
    };
    return (
      <StyledMenu {...menuProps}>
        <SubMenu
          className="user-menu"
          key="sub-user"
          title={
            <span>
              <Icon type="user" />
              <span>
                hecatemilo@gmail.com
                <sub>Professional Plan</sub>
              </span>
            </span>
          }
        >
          <ItemGroup title="Professional Plan" key="group-user">
            <Item
              disabled={false}
              onClick={() => {
                window.open('https://help.reitscreener.com', '_blank');
              }}
            >
              <Icon type="global" />
              <span>Knowledge Base</span>
            </Item>
            <Item
              key="account-settings"
              onClick={() => {
                changeRoute({ itemKey: 'account-settings' }, '/account/settings');
              }}
            >
              <Icon type="setting" />
              <span>Settings</span>
            </Item>
            <Item
              key="logout"
              onClick={this.logoutSession}
            >
              <Icon type="logout" />
              <span>Sign Out</span>
            </Item>
          </ItemGroup>
        </SubMenu>
      </StyledMenu>
    );
  }
}

AppUserMenu.contextType = UserContext;

export default withRouter(AppUserMenu);
