import React from 'react';
import { Row, Col } from 'antd';

import LoadableComponent from 'config/LoadableComponent';

const PriceRentalIndexTeritoryWide = LoadableComponent({
  componentPathName: 'pages/Charts/components/ChartsIndex/components/Leading/Office/components/PriceRentalIndexTeritoryWide',
});

const PriceIndexTerritoryWide = LoadableComponent({
  componentPathName: 'pages/Charts/components/ChartsIndex/components/Leading/Office/components/PriceIndexTerritoryWide',
});

const RentalIndexTerritoryWide = LoadableComponent({
  componentPathName: 'pages/Charts/components/ChartsIndex/components/Leading/Office/components/RentalIndexTerritoryWide',
});

const Office = () => {
  return (
    <>
      <Row type="flex" gutter={16}>
        <Col className="pb-2 pb-sm-3" xs={24}>
          <PriceRentalIndexTeritoryWide />
        </Col>
      </Row>
      <Row type="flex" gutter={16}>
        <Col className="pb-2 pb-sm-3" xs={24}>
          <PriceIndexTerritoryWide />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="mb-2 mb-lg-0" xs={24}>
          <RentalIndexTerritoryWide />
        </Col>
      </Row>
    </>
  );
};

export default Office;
