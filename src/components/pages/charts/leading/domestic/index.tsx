import React from 'react';
import { Row, Col } from 'antd';

import LoadableComponent from '../../../../../config/LoadableComponent';

const PriceRentalIndexTeritoryWide = LoadableComponent({
  componentPathName:
    'components/pages/charts/leading/domestic/components/PriceRentalIndexTeritoryWide',
});

const PriceIndexTerritoryWide = LoadableComponent({
  componentPathName:
    'components/pages/charts/leading/domestic/components/PriceIndexTerritoryWide',
});

const RentalIndexTerritoryWide = LoadableComponent({
  componentPathName:
    'components/pages/charts/leading/domestic/components/RentalIndexTerritoryWide',
});

const ClassAPriceRents = LoadableComponent({
  componentPathName:
    'components/pages/charts/leading/domestic/components/ClassAPriceRents',
});

const ClassBPriceRents = LoadableComponent({
  componentPathName:
    'components/pages/charts/leading/domestic/components/ClassBPriceRents',
});

const ClassCPriceRents = LoadableComponent({
  componentPathName:
    'components/pages/charts/leading/domestic/components/ClassCPriceRents',
});

const ClassDPriceRents = LoadableComponent({
  componentPathName:
    'components/pages/charts/leading/domestic/components/ClassDPriceRents',
});

const ClassEPriceRents = LoadableComponent({
  componentPathName:
    'components/pages/charts/leading/domestic/components/ClassEPriceRents',
});

const Domestic = () => {
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
      <Row type="flex" gutter={16}>
        <Col className="pb-2 pb-sm-3" xs={24}>
          <RentalIndexTerritoryWide />
        </Col>
      </Row>
      <Row type="flex" gutter={16}>
        <Col className="pb-2 pb-sm-3" xs={24}>
          <ClassAPriceRents />
        </Col>
      </Row>
      <Row type="flex" gutter={16}>
        <Col className="pb-2 pb-sm-3" xs={24}>
          <ClassBPriceRents />
        </Col>
      </Row>
      <Row type="flex" gutter={16}>
        <Col className="pb-2 pb-sm-3" xs={24}>
          <ClassCPriceRents />
        </Col>
      </Row>
      <Row type="flex" gutter={16}>
        <Col className="pb-2 pb-sm-3" xs={24}>
          <ClassDPriceRents />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="mb-2 mb-lg-0" xs={24}>
          <ClassEPriceRents />
        </Col>
      </Row>
    </>
  );
};

export default Domestic;
