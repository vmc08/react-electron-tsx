import React from 'react';
import { Row, Col } from 'antd';

import LoadableComponent from 'config/LoadableComponent';

const TotalVisitorArrivals = LoadableComponent({
  componentPathName:
  'pages/Charts/components/ChartsIndex/components/Leading/Hospitality/components/TotalVisitorArrivals',
});

const SeasonalVisitorArrivals = LoadableComponent({
  componentPathName:
    'pages/Charts/components/ChartsIndex/components/Leading/Hospitality/components/SeasonalVisitorArrivals',
});

const HotelRoomTrends = LoadableComponent({
  componentPathName:
    'pages/Charts/components/ChartsIndex/components/Leading/Hospitality/components/HotelRoomTrends',
});

const HotelRoomOccupancyRates = LoadableComponent({
  componentPathName:
    'pages/Charts/components/ChartsIndex/components/Leading/Hospitality/components/HotelRoomOccupancyRates',
});

const HotelRoomRatesVsRevenue = LoadableComponent({
  componentPathName:
    'pages/Charts/components/ChartsIndex/components/Leading/Hospitality/components/HotelRoomRatesVsRevenue',
});

const PotentialSupplyStatistics = LoadableComponent({
  componentPathName:
    'pages/Charts/components/ChartsIndex/components/Leading/Hospitality/components/PotentialSupplyStatistics',
});

const Hospitality = () => {
  return (
    <>
      <Row type="flex" gutter={16}>
        <Col className="pb-2 pb-sm-3" xs={24}>
          <TotalVisitorArrivals />
        </Col>
      </Row>
      <Row type="flex" gutter={16}>
        <Col className="pb-2 pb-sm-3" xs={24}>
          <SeasonalVisitorArrivals />
        </Col>
      </Row>
      <Row type="flex" gutter={16}>
        <Col className="pb-2 pb-sm-3" xs={24}>
          <HotelRoomTrends />
        </Col>
      </Row>
      <Row type="flex" gutter={16}>
        <Col className="pb-2 pb-sm-3" xs={24}>
          <HotelRoomOccupancyRates />
        </Col>
      </Row>
      <Row type="flex" gutter={16}>
        <Col className="pb-2 pb-sm-3" xs={24}>
          <HotelRoomRatesVsRevenue />
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

export default Hospitality;
