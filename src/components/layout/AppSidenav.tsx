import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Menu, Icon } from 'antd';
import { navRoutes, INavRoute, INavGroup } from '../../utils/navUtils';
import { slugify } from '../../utils/stringUtils';
import SidenavContext, { ISelectedKeys } from '../../contexts/SidenavContext';
import logo from '../../assets/images/logo.png';

const { Sider } = Layout;
const { SubMenu, ItemGroup } = Menu;

const StyledSider = styled(Sider)`
  overflow: hidden;
  height: 100vh;
  border-right: 1px solid #e8e8e8;
  &:hover {
    overflow: auto;
  }
`;

const StyledLogo = styled.div`
  height: 32px;
  margin: 16px;
  background-image: ${(props: { src: string }) => `url${props.src}`};
  background-size: contain;
  background-repeat: no-repeat;
`;

class AppSidenav extends React.Component<RouteComponentProps> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.changeRoute = this.changeRoute.bind(this);
  }

  changeRoute(
    path: string | null | undefined,
    selectedKeys: ISelectedKeys,
  ) {
    const { history } = this.props;
    const { setSelectedKeys } = this.context;
    setSelectedKeys(selectedKeys);
    history.push(path || '/');
  }

  render() {
    const { collapsed, selectedKeys } = this.context;
    const { itemKey: itemKeyContext, subMenuKey: subMenuKeyContext } = selectedKeys;
    return (
      <StyledSider
        trigger={null}
        theme="light"
        collapsible
        collapsed={collapsed}
        width={256}
      >
        <StyledLogo src={logo} />
        <Menu
          defaultOpenKeys={[subMenuKeyContext]}
          defaultSelectedKeys={[itemKeyContext]}
          mode="inline"
          style={{ width: 'calc(100% - 1px)', borderRight: 0 }}
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
                                this.changeRoute(itemPath, { itemKey, subMenuKey });
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
                onClick={() => this.changeRoute(path, { itemKey: slugify(label) })}
              >
                <Icon type={iconType} />
                <span>{label}</span>
              </Menu.Item>
            );
          })}
        </Menu>
      </StyledSider>
    );
  }
}

AppSidenav.contextType = SidenavContext;

export default withRouter(AppSidenav);
