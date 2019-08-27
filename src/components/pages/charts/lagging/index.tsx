import React from 'react';
import { Row, Col } from 'antd';

import { useMarketsContextValue } from '../../../../contexts/MarketsContext';
import LoadableComponent from '../../../../config/LoadableComponent';

const PriceIndex = LoadableComponent({
  componentPathName: 'components/pages/charts/lagging/components/PriceIndex',
});

const FTSE = LoadableComponent({
  componentPathName: 'components/pages/charts/lagging/components/FTSE',
});

const YieldSpread = LoadableComponent({
  componentPathName: 'components/pages/charts/lagging/components/YieldSpread',
});

const MarketCapNPI = LoadableComponent({
  componentPathName: 'components/pages/charts/lagging/components/MarketCapNPI',
});

const Lagging = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  return (
    <>
      <Row type="flex" gutter={16}>
        <Col className="pb-2 pb-sm-3" xs={24}>
          <PriceIndex />
        </Col>
      </Row>
      {(marketCode !== 'MYX') && (
        <Row type="flex" gutter={16}>
          <Col className="pb-2 pb-sm-3" xs={24}>
            <FTSE />
          </Col>
        </Row>
      )}
      <Row type="flex" gutter={16}>
        <Col className="pb-2 pb-sm-3" xs={24}>
          <YieldSpread />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="mb-2 mb-lg-0" xs={24}>
          <MarketCapNPI />
        </Col>
      </Row>
    </>
  );
};

export default Lagging;
