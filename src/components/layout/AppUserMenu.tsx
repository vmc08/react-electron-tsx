import React from 'react';
import styled from 'styled-components';
import { Layout, Menu, Icon } from 'antd';
import { ISelectedKeys } from '../../contexts/SidenavContext';

const { SubMenu, ItemGroup } = Menu;

class AppUserMenu extends React.Component<ISelectedKeys, {}> {
  constructor(props: ISelectedKeys) {
    super(props);
  }

  render() {
    const { itemKey, subMenuKey } = this.props;
    return (
      <Menu
        defaultSelectedKeys={[itemKey]}
        mode="inline"
        style={{ width: 'calc(100% - 1px)', borderRight: 0 }}
      >
        <Menu.Item
          key="sub-user"
        >
          <Icon type="user" />
          <span>hecatemilo@gmail.com</span>
        </Menu.Item>
      </Menu>
    );
  }
}

export default AppUserMenu;
