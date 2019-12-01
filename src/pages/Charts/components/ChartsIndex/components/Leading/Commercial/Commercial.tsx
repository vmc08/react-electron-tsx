import React from 'react';
import { Row, Col } from 'antd';

import LoadableComponent from 'config/LoadableComponent';

const PriceRentalIndex = LoadableComponent({
  componentPathName: 'pages/Charts/components/ChartsIndex/components/Leading/Commercial/components/PriceRentalIndex',
});

const VacancyRates = LoadableComponent({
  componentPathName: 'pages/Charts/components/ChartsIndex/components/Leading/Commercial/components/VacancyRates',
});

const MedianRentals = LoadableComponent({
  componentPathName: 'pages/Charts/components/ChartsIndex/components/Leading/Commercial/components/MedianRentals',
});

const PotentialSupplyStatistics = LoadableComponent({
  componentPathName: 'pages/Charts/components/ChartsIndex/components/Leading/Commercial/components/PotentialSupplyStatistics',
});

const Commercial = () => {
  return (
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
};

export default Commercial;
