import React, { createContext, useContext } from 'react';

import {
  getDefaultSelectedKeys,
  getSidenavState,
  setSidenavState,
  navRoutes,
} from '../utils/navUtils';

export interface ISelectedKeys {
  itemKey?: string,
  subMenuKey?: string
}

interface ISidenavProviderState {
  collapsed: boolean,
  selectedKeys: ISelectedKeys
}

interface ISidenavContext {
  collapsed: boolean,
  toggleCollapse: () => void,
  setSelectedKeys: (selectedKeys: ISelectedKeys) => void,
  selectedKeys: ISelectedKeys,
}

const SidenavContext = createContext<ISidenavContext>({
  collapsed: getSidenavState(),
  toggleCollapse: () => undefined,
  setSelectedKeys: (selectedKeys: ISelectedKeys) => selectedKeys,
  selectedKeys: {
    itemKey: undefined,
    subMenuKey: undefined,
  },
});

class SidenavProvider extends React.Component<{}, ISidenavProviderState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      collapsed: getSidenavState(),
      selectedKeys: getDefaultSelectedKeys(navRoutes),
    };
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.setSelectedKeys = this.setSelectedKeys.bind(this);
  }

  toggleCollapse() {
    this.setState((prevState: ISidenavProviderState) => ({
      collapsed: !prevState.collapsed,
    }), () => {
      setSidenavState(this.state.collapsed);
    });
  }

  setSelectedKeys(selectedKeys: ISelectedKeys) {
    this.setState({ selectedKeys });
  }

  render() {
    const { collapsed, selectedKeys } = this.state;
    const { toggleCollapse, setSelectedKeys } = this;
    return (
      <SidenavContext.Provider
        value={{ collapsed, toggleCollapse, setSelectedKeys, selectedKeys }}
      >
        {this.props.children}
      </SidenavContext.Provider>
    );
  }
}

const SidenavConsumer = SidenavContext.Consumer;

const useSidenavContextValue = () => useContext(SidenavContext);

export { SidenavProvider, SidenavConsumer, useSidenavContextValue };

export default SidenavContext;
