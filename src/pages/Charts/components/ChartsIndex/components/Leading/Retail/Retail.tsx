import React from 'react';
import { Row, Col } from 'antd';
import { useMarketsContextValue } from 'contexts/MarketsContext';

import LoadableComponent from 'config/LoadableComponent';

const PriceRentalIndex = LoadableComponent({
  componentPathName: 'pages/Charts/components/ChartsIndex/components/Leading/Retail/components/PriceRentalIndex',
});

const VacancyRates = LoadableComponent({
  componentPathName: 'pages/Charts/components/ChartsIndex/components/Leading/Retail/components/VacancyRates',
});

const MedianRentals = LoadableComponent({
  componentPathName: 'pages/Charts/components/ChartsIndex/components/Leading/Retail/components/MedianRentals',
});

const PotentialSupplyStatistics = LoadableComponent({
  componentPathName:
    'pages/Charts/components/ChartsIndex/components/Leading/Retail/components/PotentialSupplyStatistics',
});

const PriceRentalIndexTeritoryWide = LoadableComponent({
  componentPathName:
    'pages/Charts/components/ChartsIndex/components/Leading/Retail/components/PriceRentalIndexTeritoryWide',
});

const AveragePriceAndRents = LoadableComponent({
  componentPathName:
    'pages/Charts/components/ChartsIndex/components/Leading/Retail/components/AveragePriceAndRents',
});

const SGRetail = () => (
  <>
    <Row type="flex" gutter={16}>
      <Col className="pb-2 pb-sm-3" xs={24}>
        <PriceRentalIndex />
      </Col>
    </Row>
    <Row type="flex" gutter={16}>
      <Col className="pb-2 pb-sm-3" xs={24}>
        <VacancyRates />
      </Col>
    </Row>
    <Row type="flex" gutter={16}>
      <Col className="pb-2 pb-sm-3" xs={24}>
        <MedianRentals />
      </Col>
    </Row>
    <Row gutter={16}>
      <Col className="mb-2 mb-lg-0" xs={24}>
        <PotentialSupplyStatistics />
      </Col>
    </Row>
  </>
);

const HKEXRetail = () => (
  <>
    <Row type="flex" gutter={16}>
      <Col className="pb-2 pb-sm-3" xs={24}>
        <PriceRentalIndexTeritoryWide />
      </Col>
    </Row>
    <Row gutter={16}>
      <Col className="mb-2 mb-lg-0" xs={24}>
        <AveragePriceAndRents />
      </Col>
    </Row>
  </>
);

const Retail = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  const RetailComponent: { [key: string]: any } = {
    SGX: <SGRetail />,
    HKEX: <HKEXRetail />,
  };
  return RetailComponent[marketCode] || <div />;
};

export default Retail;
