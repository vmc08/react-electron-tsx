import React from 'react';
import { Row, Col } from 'antd';

import { MARKETS_WITHOUT_INDICATORS } from 'utils/data/appDataUtils';
import { useMarketsContextValue } from 'contexts/MarketsContext';
import LoadableComponent from 'config/LoadableComponent';
import { UserConsumer } from 'contexts/UserContext';

const PriceIndex = LoadableComponent({
  componentPathName: 'pages/Charts/components/ChartsIndex/components/Lagging/components/PriceIndex',
});

const FTSE = LoadableComponent({
  componentPathName: 'pages/Charts/components/ChartsIndex/components/Lagging/components/FTSE',
});

const YieldSpread = LoadableComponent({
  componentPathName:
    'pages/Charts/components/ChartsIndex/components/Lagging/components/YieldSpread',
});

const MarketCapNPI = LoadableComponent({
  componentPathName:
    'pages/Charts/components/ChartsIndex/components/Lagging/components/MarketCapNPI',
});

const Lagging = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  return (
    <UserConsumer>
      {({ token }) => (
        <>
          {token && (
            <Row type="flex" gutter={16}>
              <Col className="pb-2 pb-sm-3" xs={24}>
                <PriceIndex />
              </Col>
            </Row>
          )}
          {(!MARKETS_WITHOUT_INDICATORS.includes(marketCode)) && (
            <Row type="flex" gutter={16}>
              <Col className="pb-2 pb-sm-3" xs={24}>
                <FTSE />
              </Col>
            </Row>
          )}
          {token && (
            <Row type="flex" gutter={16}>
              <Col className="pb-2 pb-sm-3" xs={24}>
                <YieldSpread />
              </Col>
            </Row>
          )}
          {token && (
            <Row gutter={16}>
              <Col className="mb-2 mb-lg-0" xs={24}>
                <MarketCapNPI />
              </Col>
            </Row>
          )}
        </>
      )}
    </UserConsumer>
  );
};

export default Lagging;
