import React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, Icon, Button, Dropdown } from 'antd';
import { ISelectedKeys } from '../../contexts/SidenavContext';
import UserContext from '../../contexts/UserContext';
import { deleteAuthToken } from '../../utils/userUtils';
import {
  deleteSidenavState,
  userRoutes,
  INavRoute,
  getDefaultSelectedKeys,
} from '../../utils/navUtils';
import { slugify } from '../../utils/stringUtils';
import { CUSTOMER_PLANS } from '../../utils/data/appDataUtils';

const { Item } = Menu;

interface IAppUserMenuProps extends RouteComponentProps {
  collapsed: boolean,
  changeRoute: (selectedKeys: { itemKey: string }, path?: string) => void,
  setSelectedKeys: (selectedKeys: ISelectedKeys) => {}
}

interface IDropdownMenus {
  changeRoute: (selectedKeys: { itemKey: string }, path?: string) => void,
  logoutSession: () => void,
}

const StyledMenu = styled(Menu)`
  border-right: 0 !important;
  width: calc(100% - 1px) !important;
  position: absolute;
  bottom: 0;
  .ant-menu-item {
    min-height: 64px !important;
    margin: 0 !important;
    background: #fff;
    display: flex;
    font-weight: 600;
    padding: 0 24px !important;
    .ant-dropdown-trigger {
      span > sub {
        bottom: 35%;
        font-size: 12px;
        font-weight: normal;
        text-transform: uppercase;
        position: absolute;
        left: 48px;
      }
    }
  }
`;

const StyledDropdownMenus = styled(Menu)`
  width: 175px;
  position: fixed;
  left: 22px;
`;

const StyledSpan = styled.span`
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
`;

const EntryLinkMenu = ({ collapsed }: {collapsed: boolean}) => {
  if (collapsed) { return null; }
  return (
    <div
      className="py-3 px-4"
      style={{
        position: 'absolute',
        bottom: 0,
        width: 225,
      }}
    >
      <Link to="/register/user">
        <Button className="mb-2" type="primary" block>
          Sign up
        </Button>
      </Link>
      <Link to="/login">
        <Button className="mb-2" type="link" block>
          Login
        </Button>
      </Link>
    </div>
  );
};

const DropdownMenus = ({ logoutSession, changeRoute }: IDropdownMenus) => {
  const { itemKey } = getDefaultSelectedKeys(userRoutes);
  const menuProps = {
    ...(itemKey && {
      defaultSelectedKeys: [itemKey],
      selectedKeys: [itemKey] }
    ),
  };
  return (
    <StyledDropdownMenus {...menuProps}>
      {userRoutes.map((userRoute: INavRoute, idx) => {
        const { label, customAction, path, iconType, externalLink } = userRoute;
        return (
          <Item
            className="px-3 py-2"
            key={slugify(label || '/') || idx}
            disabled={false}
            onClick={() => {
              if (externalLink) {
                window.open(externalLink, '_blank');
              } else if (customAction) {
                logoutSession();
              } else {
                changeRoute({ itemKey: slugify(label || '/') }, path);
              }
            }}
          >
            <Icon type={iconType} className="mr-3 ml-1" />
            <span>{label}</span>
          </Item>
        );
      })}
    </StyledDropdownMenus>
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
    return (
      <StyledMenu selectable={false}>
        <Item key="sub-user">
          <Dropdown
            overlay={DropdownMenus({ changeRoute, logoutSession: this.logoutSession })}
            trigger={['click']}
            placement="topCenter"
            overlayClassName="dropdown-root"
          >
            <span>
              <Icon type="user" style={{ verticalAlign: 12 }} />
              <StyledSpan>
                {account.firstname || account.username}
                <sub>{CUSTOMER_PLANS[account.level]} Plan</sub>
              </StyledSpan>
            </span>
          </Dropdown>
        </Item>
      </StyledMenu>
    );
  }
}

AppUserMenu.contextType = UserContext;

export default withRouter(AppUserMenu);
