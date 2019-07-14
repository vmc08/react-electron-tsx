import React from 'react';
import { Dropdown, Menu, Icon } from 'antd';

import FlagIcon from '../FlagIcon';

import { markets } from '../../utils/appDataUtils';
import MarketsContext from '../../contexts/MarketsContext';

const MarketsMenu = ({ market, setMarket }: any) => {
  return (
    <Menu
      defaultSelectedKeys={[market.marketCode]}
      selectedKeys={[market.marketCode]}
    >
      {markets.map(({ label, marketCode, countryCode }) => (
        <Menu.Item
          key={marketCode}
          className="px-3 py-2"
          onClick={() => setMarket(marketCode)}
        >
          <FlagIcon className="mr-3" size="lg" code={countryCode.toLowerCase()} />
          <span>{label}</span>
        </Menu.Item>
      ))}
    </Menu>
  );
};

class MarketsDropdown extends React.Component<{}, { visibility: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      visibility: false,
    };
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
  }

  handleVisibleChange(visibility: boolean) {
    this.setState({ visibility });
  }

  render() {
    const { visibility } = this.state;
    const { market, setMarket } = this.context;
    const { label, countryCode }: any = markets.find((m) => m.marketCode === market.marketCode);
    return (
      <Dropdown
        className="float-right mx-2"
        overlayStyle={{ position: 'fixed' }}
        overlay={MarketsMenu({ market, setMarket })}
        trigger={['click']}
        visible={visibility}
        onVisibleChange={this.handleVisibleChange}
        placement="bottomRight"
      >
        <a className="ant-dropdown-link" href="#" title="Market">
          <FlagIcon className="mr-2" size="lg" code={countryCode.toLowerCase()} />
          <span className="d-none d-sm-inline">{label}</span>
          <Icon className="ml-2" type="down" />
        </a>
      </Dropdown>
    );
  }
}

MarketsDropdown.contextType = MarketsContext;

export default MarketsDropdown;
