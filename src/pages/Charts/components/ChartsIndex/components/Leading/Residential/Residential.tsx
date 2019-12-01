import React from 'react';
import { Row, Col } from 'antd';

import LoadableComponent from 'config/LoadableComponent';

const PriceRentalIndexHDB = LoadableComponent({
  componentPathName: 'pages/Charts/components/ChartsIndex/components/Leading/Residential/components/PriceRentalIndexHDB',
});

const PriceRentalIndexResidential = LoadableComponent({
  componentPathName:
    'pages/Charts/components/ChartsIndex/components/Leading/Residential/components/PriceRentalIndexResidential',
});

const VacancyRates = LoadableComponent({
  componentPathName: 'pages/Charts/components/ChartsIndex/components/Leading/Residential/components/VacancyRates',
});

const PotentialSupplyStatistics = LoadableComponent({
  componentPathName: 'pages/Charts/components/ChartsIndex/components/Leading/Residential/components/PotentialSupplyStatistics',
});

const Residential = () => {
  return (
    <>
      <Row type="flex" gutter={16}>
        <Col className="pb-2 pb-sm-3" xs={24}>
          <PriceRentalIndexHDB />
        </Col>
      </Row>
      <Row type="flex" gutter={16}>
        <Col className="pb-2 pb-sm-3" xs={24}>
          <PriceRentalIndexResidential />
        </Col>
      </Row>
      <Row type="flex" gutter={16}>
        <Col className="pb-2 pb-sm-3" xs={24}>
          <VacancyRates />
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

export default Residential;
