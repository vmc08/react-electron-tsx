import React from 'react';
import { Row, Col, Card } from 'antd';
import LoadableComponent from '../../../config/LoadableComponent';

const MarketCap = LoadableComponent({
  componentPathName: 'components/pages/dashboard/MarketCap',
  loadingComponent: <Card loading />,
});

const HeatMap = LoadableComponent({
  componentPathName: 'components/pages/dashboard/HeatMap',
  loadingComponent: <Card loading />,
});

const TopGainers = LoadableComponent({
  componentPathName: 'components/pages/dashboard/TopGainers',
  loadingComponent: <Card loading />,
});

const TopVolume = LoadableComponent({
  componentPathName: 'components/pages/dashboard/TopVolume',
  loadingComponent: <Card loading />,
});

const TopLosers = LoadableComponent({
  componentPathName: 'components/pages/dashboard/TopLosers',
  loadingComponent: <Card loading />,
});

const Portfolio = LoadableComponent({
  componentPathName: 'components/pages/dashboard/Portfolio',
  loadingComponent: <Card loading />,
});

const Watchlist = LoadableComponent({
  componentPathName: 'components/pages/dashboard/Watchlist',
  loadingComponent: <Card loading />,
});

const Insights = LoadableComponent({
  componentPathName: 'components/pages/dashboard/Insights',
  loadingComponent: <Card loading />,
});

const DashboardIndex = (props: { token: string }) => (
  <>
    <Row type="flex" gutter={16}>
      <Col className="pb-2 pb-sm-3" xs={24} xl={12}>
        <MarketCap />
      </Col>
      <Col className="pb-2 pb-sm-3" xs={24} xl={12}>
        <HeatMap />
      </Col>
    </Row>
    <Row type="flex" gutter={16}>
      <Col className="pb-2 pb-sm-3" xs={24} xl={8}>
        <TopGainers />
      </Col>
      <Col className="pb-2 pb-sm-3" xs={24} xl={8}>
        <TopVolume />
      </Col>
      <Col className="pb-2 pb-sm-3" xs={24} xl={8}>
        <TopLosers />
      </Col>
    </Row>
    <Row type="flex" gutter={16}>
      <Col xs={{ span: 24, order: 2 }} xl={{ span: 16, order: 1 }}>
        <Insights token={props.token} />
      </Col>
      <Col xs={{ span: 24, order: 1 }} xl={{ span: 8, order: 2 }}>
        <Row gutter={16}>
          <Col className="mb-2 mb-sm-3">
            <Portfolio />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="mb-2 mb-lg-0">
            <Watchlist />
          </Col>
        </Row>
      </Col>
    </Row>
  </>
);

export default DashboardIndex;
