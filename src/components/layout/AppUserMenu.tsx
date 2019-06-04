import React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, Icon, Button } from 'antd';
import { ISelectedKeys } from '../../contexts/SidenavContext';
import UserContext from '../../contexts/UserContext';
import { deleteAuthToken } from '../../utils/authUtils';
import {
  deleteSidenavState,
  userRoutes,
  INavRoute,
  getDefaultSelectedKeys,
} from '../../utils/navUtils';
import { slugify } from '../../utils/stringUtils';
import { customerPlans } from '../../utils/appDataUtils';

const { SubMenu, ItemGroup, Item } = Menu;

interface IAppUserMenuProps extends RouteComponentProps {
  collapsed: boolean,
  changeRoute: (selectedKeys: { itemKey: string }, path?: string) => void,
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
      right: 48%;
      font-size: 12px;
      font-weight: normal;
      background: #1890ff;
      color: #fff;
      padding: 2px 8px;
      border-radius: 10px;
      text-transform: uppercase;
    }
  }
`;

const EntryLinkMenu = ({ collapsed }: {collapsed: boolean}) => {
  if (collapsed) { return null; }
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
};

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
    const { changeRoute, collapsed } = this.props;
    const { account, token } = this.context;
    if (!(account && token)) {
      return (
        <EntryLinkMenu collapsed={collapsed} />
      );
    }
    const { itemKey } = getDefaultSelectedKeys(userRoutes);
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
                {account.username}
                <sub>{customerPlans[account.level]} Plan</sub>
              </span>
            </span>
          }
        >
          <ItemGroup title={`${customerPlans[account.level]} PLAN`} key="group-user">
            {userRoutes.map((userRoute: INavRoute, idx) => {
              const { label, customAction, path, iconType, externalLink } = userRoute;
              return (
                <Item
                  style={{ padding: '0 28px' }}
                  key={slugify(label || '/') || idx}
                  disabled={false}
                  onClick={() => {
                    if (externalLink) {
                      window.open(externalLink, '_blank');
                    } else if (customAction) {
                      this.logoutSession();
                    } else {
                      changeRoute({ itemKey: slugify(label || '/') }, path);
                    }
                  }}
                >
                  <Icon type={iconType} />
                  <span>{label}</span>
                </Item>
              );
            })}
          </ItemGroup>
        </SubMenu>
      </StyledMenu>
    );
  }
}

AppUserMenu.contextType = UserContext;

export default withRouter(AppUserMenu);
