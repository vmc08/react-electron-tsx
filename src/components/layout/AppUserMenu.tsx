import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, Icon } from 'antd';
import { ISelectedKeys } from '../../contexts/SidenavContext';
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

const StyledMenuItem = styled(Item)`
  padding: 0 28px !important;
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
    return (
      <StyledMenu
        defaultSelectedKeys={[itemKey]}
        selectedKeys={[itemKey]}
      >
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
            <StyledMenuItem
              disabled={false}
              onClick={() => {
                window.open('https://help.reitscreener.com', '_blank');
              }}
            >
              <Icon type="question" />
              <span>Knowledge Base</span>
            </StyledMenuItem>
            <StyledMenuItem
              key="account-settings"
              onClick={() => {
                changeRoute({ itemKey: 'account-settings' }, '/account/settings');
              }}
            >
              <Icon type="setting" />
              <span>Settings</span>
            </StyledMenuItem>
            <StyledMenuItem
              key="logout"
              onClick={this.logoutSession}
            >
              <Icon type="logout" />
              <span>Sign Out</span>
            </StyledMenuItem>
          </ItemGroup>
        </SubMenu>
      </StyledMenu>
    );
  }
}

export default withRouter(AppUserMenu);
