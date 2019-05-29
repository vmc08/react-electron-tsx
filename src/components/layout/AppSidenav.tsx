import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Menu, Icon } from 'antd';
import { navRoutes, INavRoute, INavGroup } from '../../utils/navUtils';
import { slugify } from '../../utils/stringUtils';
import SidenavContext, { ISelectedKeys } from '../../contexts/SidenavContext';
import AppUserMenu from './AppUserMenu';

import logoLight from '../../assets/images/logo-light.png';
import logoCollapsed from '../../assets/images/logo-collapsed.png';

const { Sider } = Layout;
const { SubMenu, ItemGroup } = Menu;

interface IStyledLogoProp {
  src: string,
  collapsed: boolean
}

const StyledSider = styled(Sider)`
  overflow: hidden;
  height: 100vh;
  border-right: 1px solid #e8e8e8;
  padding-bottom: 64px;
  .ant-layout-sider-children {
    overflow: auto;
  }
`;

const StyledBrandLogo = styled.div`
  cursor: pointer;
  height: 32px;
  margin: 16px;
  background-image: ${(props: IStyledLogoProp) => `url(${props.src})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: ${(props: IStyledLogoProp) => {
    return props.collapsed ? 'center' : 'inherit';
  }};
`;

const StyledMenu = styled(Menu)`
  border-right: 0 !important;
  width: calc(100% - 1px) !important;
`;

class AppSidenav extends React.Component<RouteComponentProps, { collapsedWidth: number }> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      collapsedWidth: 80,
    };
    this.changeRoute = this.changeRoute.bind(this);
    this.onBreakpoint = this.onBreakpoint.bind(this);
  }

  changeRoute(
    selectedKeys: ISelectedKeys,
    path?: string,
  ) {
    const { history } = this.props;
    const { setSelectedKeys } = this.context;
    setSelectedKeys(selectedKeys);
    history.push(path || '/');
  }

  onBreakpoint(broken: boolean) {
    if (broken) {
      this.setState({ collapsedWidth: 0 });
    } else {
      this.setState({ collapsedWidth: 80 });
    }
  }

  render() {
    const { collapsedWidth } = this.state;
    const { collapsed, selectedKeys } = this.context;
    const { itemKey: itemKeyContext, subMenuKey: subMenuKeyContext } = selectedKeys;
    const brandLogo = collapsed ? logoCollapsed : logoLight;
    return (
      <StyledSider
        collapsible
        theme="light"
        trigger={null}
        width={256}
        collapsed={collapsed}
        collapsedWidth={collapsedWidth}
        breakpoint="sm"
        onBreakpoint={this.onBreakpoint}
      >
        <StyledBrandLogo
          src={brandLogo}
          collapsed={collapsed}
          onClick={() => {
            this.changeRoute({ itemKey: 'dashboard' }, '/');
          }}
        />
        <StyledMenu
          defaultOpenKeys={[subMenuKeyContext]}
          defaultSelectedKeys={[itemKeyContext]}
          mode="inline"
        >
          {navRoutes.map(({ label, path, groups, iconType }: INavRoute) => {
            if (groups && groups.length > 0) {
              const subMenuKey = `sub-${slugify(label)}`;
              return (
                <SubMenu
                  key={subMenuKey}
                  title={
                    <span>
                      <Icon type={iconType} />
                      <span>{label}</span>
                    </span>
                  }
                >
                  {groups.map(({ title, items }: INavGroup) => {
                    return (
                      <ItemGroup title={title} key={`group-${slugify(title)}`}>
                        {items.map((item: INavRoute) => {
                          const { label: itemLabel, path: itemPath } = item;
                          const itemKey = slugify(itemLabel);
                          return (
                            <Menu.Item
                              key={itemKey}
                              onClick={() => {
                                this.changeRoute({ itemKey, subMenuKey }, itemPath);
                              }}
                            >
                              <span>{itemLabel}</span>
                            </Menu.Item>
                          );
                        })}
                      </ItemGroup>
                    );
                  })}
                </SubMenu>
              );
            }
            return (
              <Menu.Item
                key={slugify(label)}
                onClick={() => this.changeRoute({ itemKey: slugify(label) }, path)}
              >
                <Icon type={iconType} />
                <span>{label}</span>
              </Menu.Item>
            );
          })}
        </StyledMenu>
        <AppUserMenu {...selectedKeys} collapsed={collapsed} />
      </StyledSider>
    );
  }
}

AppSidenav.contextType = SidenavContext;

export default withRouter(AppSidenav);
