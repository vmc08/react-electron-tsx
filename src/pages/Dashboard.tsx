import React from 'react';
import styled from 'styled-components';
import { Row, Col, Menu, Card } from 'antd';

import LoadableComponent from '../config/LoadableComponent';

import AppLayout from '../components/layout/AppLayout';

const MarketCap = LoadableComponent({
  componentPathName: 'components/pages/dashboard/MarketCap',
  loadingComponent: <Card className="mb-2 mb-sm-3" loading />,
});

const HeatMap = LoadableComponent({
  componentPathName: 'components/pages/dashboard/HeatMap',
  loadingComponent: <Card className="mb-2 mb-sm-3" loading />,
});

const TopGainers = LoadableComponent({
  componentPathName: 'components/pages/dashboard/TopGainers',
  loadingComponent: <Card className="mb-2 mb-sm-3" loading />,
});

const TopVolume = LoadableComponent({
  componentPathName: 'components/pages/dashboard/TopVolume',
  loadingComponent: <Card className="mb-2 mb-sm-3" loading />,
});

const TopLosers = LoadableComponent({
  componentPathName: 'components/pages/dashboard/TopLosers',
  loadingComponent: <Card className="mb-2 mb-sm-3" loading />,
});

import Portfolio from '../components/pages/dashboard/Portfolio';
import Watchlist from '../components/pages/dashboard/Watchlist';

import { useIntervalContext } from '../contexts/IntervalContext';

const StyledMenu = styled(Menu)`
  background: transparent !important;
  border-bottom: 0 !important;
  .ant-menu-item {
    min-width: 85px;
    text-align: center;
    margin: 0 5px;
  }
`;

const IntervalMenu = () => {
  const { interval, setDashboardInterval }: any = useIntervalContext();
  return (
    <StyledMenu
      className="mb-2 mb-sm-3"
      mode="horizontal"
      defaultSelectedKeys={[interval]}
      selectedKeys={[interval]}
    >
      {['Week', 'Month', 'Year'].map((di) => (
        <Menu.Item
          key={di.charAt(0)}
          onClick={() => setDashboardInterval(di.charAt(0))}
        >
          {di}
        </Menu.Item>
      ))}
    </StyledMenu>
  );
};

const Dashboard = (props: { requireAuth: boolean }) => {
  const { requireAuth } = props;
  return (
    <AppLayout requireAuth={requireAuth}>
      <Row gutter={16}>
        <Col xs={24}>
          <IntervalMenu />
        </Col>
        <Col xs={24} xl={12}>
          <MarketCap />
        </Col>
        <Col xs={24} xl={12}>
          <HeatMap />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} xl={8}>
          <TopGainers />
        </Col>
        <Col xs={24} xl={8}>
          <TopVolume />
        </Col>
        <Col xs={24} xl={8}>
          <TopLosers />
        </Col>
      </Row>
      <Row type="flex" gutter={16}>
        <Col xs={{ span: 24, order: 2 }} xl={{ span: 16, order: 1 }}>
          Insights here
        </Col>
        <Col xs={{ span: 24, order: 1 }} xl={{ span: 8, order: 2 }}>
          <Row gutter={16}>
            <Col>
              <Portfolio />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col>
              <Watchlist />
            </Col>
          </Row>
        </Col>
      </Row>
    </AppLayout>
  );
};

export default Dashboard;
