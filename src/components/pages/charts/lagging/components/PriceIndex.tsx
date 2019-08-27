import React from 'react';
import { Card, Typography, Divider } from 'antd';

import TradingView from '../../../../TradingView';
import { useMarketsContextValue } from '../../../../../contexts/MarketsContext';

const { Title } = Typography;

const PriceIndex = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  return (
    <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
      <Title level={4}>Market Cap Weighted Price Index of REITs</Title>
      <Divider className="my-3" />
      <TradingView
        id="market-cap-price-index"
        symbol={`RSI.${marketCode}`}
      />
    </Card>
  );
};

export default PriceIndex;
