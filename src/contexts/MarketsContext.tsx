import React, { createContext, useContext } from 'react';
import { MARKETS } from '../utils/data/appDataUtils';

export const DEFAULT_MARKET = MARKETS[0];

export interface IMarket {
  label: string,
  marketCode: string,
  countryCode: string,
  currency: string,
  disabled: boolean,
}

export interface IMarketsContext {
  setMarket?: (market: string) => void,
  market: IMarket,
}

const MarketsContext = createContext<IMarketsContext>({
  market: DEFAULT_MARKET,
  setMarket: (m: string) => m,
});

class MarketsProvider extends React.Component<{}, { market: string }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      market: localStorage.getItem('market') || 'SGX',
    };
    this.setMarket = this.setMarket.bind(this);
  }

  setMarket(market: string) {
    this.setState({ market }, () => {
      localStorage.setItem('market', market);
    });
  }

  render() {
    const { setMarket, state } = this;
    const { market: marketCode } = state;
    const market = MARKETS.find((m: IMarket) => {
      return m.marketCode === marketCode;
    }) || DEFAULT_MARKET;
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
