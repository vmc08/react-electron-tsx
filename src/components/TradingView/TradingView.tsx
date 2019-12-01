import React from 'react';
import styled from 'styled-components';
import AsyncScriptLoader from 'react-async-script';

import { TRADING_VIEW_DEFAULT_CONFIG } from 'utils/data/chartDataUtils';

const DEFAULT_INTERVAL = 'D';

interface ITradingView {
  id: string,
  symbol: string,
}

interface ITradingViewState {
  widgetInstance: any,
  container_id: string,
  symbol: string,
}

const StyledTradingView = styled.div`
  width: 100%;
  height: 570px;
`;

const AsyncScriptLoaderTradingView = AsyncScriptLoader(
  '/assets/tradingview/charting_library/charting_library.min.js',
)(StyledTradingView);

class TradingView extends React.PureComponent<ITradingView, ITradingViewState> {
  constructor(props: ITradingView) {
    super(props);
    this.state = {
      symbol: props.symbol,
      widgetInstance: null,
      container_id: `${props.id}-tv-identifier`,
    };
    this.initializedTradingView = this.initializedTradingView.bind(this);
  }

  componentDidUpdate({ symbol }: ITradingView) {
    if (symbol !== this.props.symbol) {
      this.setState({ symbol: this.props.symbol }, () => {
        const { widgetInstance, symbol: symbolState } = this.state;
        if (widgetInstance) {
          widgetInstance.setSymbol(symbolState, DEFAULT_INTERVAL);
        }
      });
    }
  }

  initializedTradingView() {
    if (!window) {
      return;
    }
    const { symbol, container_id } = this.state;
    const tvConfig = {
      symbol,
      container_id,
      interval: DEFAULT_INTERVAL,
      datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(
        process.env.REACT_APP_DATA_FEED_URL,
      ),
      ...TRADING_VIEW_DEFAULT_CONFIG,
    };
    this.setState({
      widgetInstance: new (window as any).TradingView.widget(tvConfig),
    });
  }

  render() {
    const { container_id } = this.state;
    return (
      <AsyncScriptLoaderTradingView
        asyncScriptOnLoad={this.initializedTradingView}
        id={container_id}
      />
    );
  }
}

export default TradingView;
