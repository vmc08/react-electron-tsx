import React from 'react';
import { Card, Typography, Divider } from 'antd';

import TradingView from '../../TradingView';
import { useMarketsContextValue } from '../../../contexts/MarketsContext';
import { CHART_LABELS } from '../../../utils/data/chartDataUtils';

const { Title } = Typography;

const FTSE = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  const { symbol, label } = CHART_LABELS[marketCode];
  return (
    <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
      <Title level={4}>{label}</Title>
      <Divider className="my-3" />
      <TradingView
        id="ftse-price-index"
        symbol={`${symbol}.${marketCode}`}
      />
    </Card>
  );
};

export default FTSE;
