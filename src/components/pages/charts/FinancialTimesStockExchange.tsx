import React from 'react';
import { Row, Col, Card, Typography, Divider } from 'antd';

import TradingView from '../../TradingView';
import { useMarketsContextValue } from '../../../contexts/MarketsContext';
import { CHART_LABELS } from '../../../utils/data/chartDataUtils';

const { Title } = Typography;

const FinancialTimesStockExchange = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  const { symbol, label } = CHART_LABELS[marketCode];
  return (
    <Row type="flex" gutter={16}>
      <Col className="pb-2 pb-sm-3" xs={24}>
        <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
          <Title level={4}>{label}</Title>
          <Divider className="my-3" />
          <TradingView
            id="ftse-price-index"
            symbol={`${symbol}.${marketCode}`}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default FinancialTimesStockExchange;
