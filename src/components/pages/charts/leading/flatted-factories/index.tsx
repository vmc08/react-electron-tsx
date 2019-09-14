import React from 'react';
import { Row, Col } from 'antd';

import LoadableComponent from '../../../../../config/LoadableComponent';

const PriceRentalIndexTeritoryWide = LoadableComponent({
  componentPathName:
    'components/pages/charts/leading/flatted-factories/components/PriceRentalIndexTeritoryWide',
});

const AveragePriceAndRents = LoadableComponent({
  componentPathName:
    'components/pages/charts/leading/flatted-factories/components/AveragePriceAndRents',
});

const FlattedFactories = () => {
  return (
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
};

export default FlattedFactories;
