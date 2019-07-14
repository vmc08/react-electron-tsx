import React, { createContext, useContext } from 'react';
import { markets } from '../utils/appDataUtils';

const MarketsContext = createContext({});

class MarketsProvider extends React.Component<{}, { market: string }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      market: sessionStorage.getItem('market') || 'SGX',
    };
    this.setMarket = this.setMarket.bind(this);
  }

  setMarket(market: string) {
    this.setState({ market }, () => {
      sessionStorage.setItem('market', market);
    });
  }

  render() {
    const { setMarket, state } = this;
    const { market: marketCode } = state;
    const market = markets.find((m: any) => {
      return m.marketCode === marketCode;
    });
    return (
      <MarketsContext.Provider value={{ market, setMarket }}>
        {this.props.children}
      </MarketsContext.Provider>
    );
  }
}

const MarketsConsumer = MarketsContext.Consumer;

const useMarketsContextValue = () => useContext(MarketsContext);

export { MarketsProvider, MarketsConsumer, useMarketsContextValue };

export default MarketsContext;
