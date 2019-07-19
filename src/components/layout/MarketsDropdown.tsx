import React from 'react';
import { Dropdown, Menu, Icon, Tooltip } from 'antd';

import FlagIcon from '../FlagIcon';

import { MARKETS } from '../../utils/data/appDataUtils';
import MarketsContext, { IMarket, DEFAULT_MARKET } from '../../contexts/MarketsContext';
import { UserConsumer } from '../../contexts/UserContext';

interface ITooltipWrapper {
  children: any,
  label: string | null,
}

const TooptipWrapper = ({ children, label }: ITooltipWrapper) => {
  if (!label) {
    return children;
  }
  return (
    <Tooltip placement="left" title={label}>
      {children}
    </Tooltip>
  );
};

const MarketsMenu = ({ market, setMarket, account }: any) => (
  <Menu
    defaultSelectedKeys={[market.marketCode]}
    selectedKeys={[market.marketCode]}
  >
    {MARKETS.map(({ label, marketCode, countryCode, disabled }) => {
      let tooltipMessage: string | null = 'Login required';
      let unlockedMarket = false;
      if (account) {
        const { exchange } = account;
        unlockedMarket = exchange.includes(marketCode);
        tooltipMessage = unlockedMarket ?
          null : `Unlock ${label} Market`;
      }
      tooltipMessage = disabled ? 'Coming Soon' : tooltipMessage;
      return (
        <Menu.Item
          key={marketCode}
          className="px-3 py-2"
          onClick={() => setMarket(marketCode)}
          disabled={disabled}
        >
          <TooptipWrapper label={tooltipMessage}>
            {disabled ? (
              <Icon className="ml-1 mr-4" type="clock-circle" />
            ) : (
              <>
                {unlockedMarket ? (
                  <FlagIcon className="mr-3" size="lg" code={countryCode.toLowerCase()} />
                ) : (
                  <Icon className="ml-1 mr-4" type="lock" />
                )}
              </>
            )}
            <span>{label}</span>
          </TooptipWrapper>
        </Menu.Item>
      );
    })}
  </Menu>
);

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
    const { label, countryCode }: IMarket =
      MARKETS.find((m) => m.marketCode === market.marketCode) || DEFAULT_MARKET;
    return (
      <UserConsumer>
        {({ account }: any) => (
          <Dropdown
            className="float-right mx-2"
            overlayStyle={{ position: 'fixed' }}
            overlay={MarketsMenu({ market, setMarket, account })}
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
        )}
      </UserConsumer>
    );
  }
}

MarketsDropdown.contextType = MarketsContext;

export default MarketsDropdown;
