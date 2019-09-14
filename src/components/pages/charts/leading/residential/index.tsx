import React from 'react';
import { Row, Col } from 'antd';

import LoadableComponent from '../../../../../config/LoadableComponent';

const PriceRentalIndexHDB = LoadableComponent({
  componentPathName: 'components/pages/charts/leading/residential/components/PriceRentalIndexHDB',
});

const PriceRentalIndexResidential = LoadableComponent({
  componentPathName:
    'components/pages/charts/leading/residential/components/PriceRentalIndexResidential',
});

const VacancyRates = LoadableComponent({
  componentPathName: 'components/pages/charts/leading/residential/components/VacancyRates',
});

const PotentialSupplyStatistics = LoadableComponent({
  componentPathName:
    'components/pages/charts/leading/residential/components/PotentialSupplyStatistics',
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
