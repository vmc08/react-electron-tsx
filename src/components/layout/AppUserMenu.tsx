import React from 'react';
import styled from 'styled-components';
import { Menu, Icon } from 'antd';
import { ISelectedKeys } from '../../contexts/SidenavContext';

const { SubMenu, ItemGroup } = Menu;

interface IAppUserMenuProps extends ISelectedKeys {
  collapsed: boolean,
  subMenuKey: string
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
  }

  render() {
    const { itemKey, subMenuKey, collapsed } = this.props;
    return (
      <StyledMenu
        defaultOpenKeys={[subMenuKey]}
        defaultSelectedKeys={[itemKey]}
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
          <ItemGroup title="Professional" key="group-user">
            <Menu.Item key="x5">Option 5</Menu.Item>
            <Menu.Item key="x6">Option 6</Menu.Item>
          </ItemGroup>
        </SubMenu>
      </StyledMenu>
    );
  }
}

export default AppUserMenu;
