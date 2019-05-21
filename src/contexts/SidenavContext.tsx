import React, { createContext } from 'react';

export interface ISelectedKeys {
  itemKey: string,
  subMenuKey?: string | null
}

interface ISidenavProviderState {
  collapsed: boolean,
  selectedKeys: ISelectedKeys
}

const SidenavContext = createContext({});

class SidenavProvider extends React.Component<{}, ISidenavProviderState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      collapsed: false,
      selectedKeys: {
        itemKey: 'dashboard',
        subMenuKey: null,
      },
    };
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.setSelectedKeys = this.setSelectedKeys.bind(this);
  }

  toggleCollapse() {
    this.setState((prevState: ISidenavProviderState) => ({
      collapsed: !prevState.collapsed,
    }));
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

export { SidenavProvider, SidenavConsumer };

export default SidenavContext;
