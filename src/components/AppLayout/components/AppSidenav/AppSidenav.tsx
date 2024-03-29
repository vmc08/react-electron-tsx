import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Menu, Icon, Tooltip } from 'antd';
import { navRoutes, INavRoute, INavGroup, getDefaultSelectedKeys } from 'utils/navUtils';
import { slugify } from 'utils/stringUtils';
import SidenavContext, { ISelectedKeys } from 'contexts/SidenavContext';
import AppUserMenu from './components/AppUserMenu';

const { Sider } = Layout;
const { SubMenu, ItemGroup } = Menu;

const LOGO_LIGHT = '/assets/images/logo-light.png';
const LOGO_COLLAPSED = '/assets/images/logo-collapsed.png';

interface IStyledLogoProp {
  src: string,
  collapsed: boolean
}

interface IMenuItemWrapper {
  collapsed: boolean,
  label: string,
  children: any,
}

const StyledSider = styled(Sider)`
  position: sticky !important;
  top: 0px;
  overflow: hidden;
  height: 100vh;
  border-right: 1px solid #e8e8e8;
  padding-bottom: 64px;
  .ant-layout-sider-children {
    overflow: auto;
  }
  &.ant-layout-sider-collapsed {
    .ant-layout-sider-children {
      .ant-menu-inline-collapsed {
        .ant-menu-item, .ant-menu-submenu-title {
          padding: 0 24px !important;
        }
      }
    }
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
  .ant-menu-item:after {
    display: none;
  }
`;

const MenuItemWrapper = ({ collapsed, children, label }: IMenuItemWrapper) => {
  if (!collapsed) {
    return children;
  }
  return (
    <Tooltip
      placement="right"
      title={label}
      overlayClassName="sidenav-custom-tooltip"
    >
      {children}
    </Tooltip>
  );
};

class AppSidenav extends React.PureComponent<RouteComponentProps, { collapsedWidth: number }> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      collapsedWidth: 64,
    };
    this.changeRoute = this.changeRoute.bind(this);
    this.onBreakpoint = this.onBreakpoint.bind(this);
    this.syncActiveSidenav = this.syncActiveSidenav.bind(this);
  }

  componentDidMount() {
    this.syncActiveSidenav();
  }

  syncActiveSidenav() {
    const { setSelectedKeys, selectedKeys } = this.context;
    const derivedSelectedKeys = getDefaultSelectedKeys(navRoutes);
    if (JSON.stringify(selectedKeys) !== JSON.stringify(derivedSelectedKeys)) {
      setSelectedKeys(getDefaultSelectedKeys(navRoutes));
    }
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
      this.setState({ collapsedWidth: 64 });
    }
  }

  render() {
    const { collapsedWidth } = this.state;
    const { collapsed, selectedKeys } = this.context;
    const { itemKey: itemKeyContext, subMenuKey: subMenuKeyContext } = selectedKeys;
    const brandLogo = collapsed ? LOGO_COLLAPSED : LOGO_LIGHT;
    return (
      <StyledSider
        collapsible
        theme="light"
        trigger={null}
        width={225}
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
          selectedKeys={[itemKeyContext]}
          mode="inline"
        >
          {navRoutes.map(({ label, path, groups, iconType, externalLink }: INavRoute) => {
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
                  {groups.map(({ title, items }: INavGroup) => (
                    <ItemGroup title={title} key={`group-${slugify(title)}`}>
                      {items.map((item: INavRoute) => {
                        const {
                          label: itemLabel,
                          path: itemPath,
                          externalLink: itemExternalLink,
                        } = item;
                        const itemKey = slugify(itemLabel);
                        return (
                          <Menu.Item
                            key={itemKey}
                            onClick={() => {
                              if (itemExternalLink) {
                                window.open(itemExternalLink, '_blank');
                              } else {
                                this.changeRoute({ itemKey, subMenuKey }, itemPath);
                              }
                            }}
                          >
                            <MenuItemWrapper collapsed={collapsed} label={itemLabel}>
                              <span>{itemLabel}</span>
                            </MenuItemWrapper>
                          </Menu.Item>
                        );
                      })}
                    </ItemGroup>
                  ))}
                </SubMenu>
              );
            }
            return (
              <Menu.Item
                key={slugify(label)}
                onClick={() => {
                  if (externalLink) {
                    window.open(externalLink, '_blank');
                  } else {
                    this.changeRoute({ itemKey: slugify(label) }, path);
                  }
                }}
              >
                <MenuItemWrapper collapsed={collapsed} label={label}>
                  <Icon type={iconType} />
                  <span>{label}</span>
                </MenuItemWrapper>
              </Menu.Item>
            );
          })}
        </StyledMenu>
        <AppUserMenu
          collapsed={collapsed}
          changeRoute={this.changeRoute}
        />
      </StyledSider>
    );
  }
}

AppSidenav.contextType = SidenavContext;

export default withRouter(AppSidenav);
