import React from 'react';
import { Row, Col } from 'antd';

import LoadableComponent from '../../../../../config/LoadableComponent';

const PriceRentalIndex = LoadableComponent({
  componentPathName: 'components/pages/charts/leading/commercial/components/PriceRentalIndex',
});

const VacancyRates = LoadableComponent({
  componentPathName: 'components/pages/charts/leading/commercial/components/VacancyRates',
});

const MedianRentals = LoadableComponent({
  componentPathName: 'components/pages/charts/leading/commercial/components/MedianRentals',
});

const PotentialSupplyStatistics = LoadableComponent({
  componentPathName:
    'components/pages/charts/leading/commercial/components/PotentialSupplyStatistics',
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
