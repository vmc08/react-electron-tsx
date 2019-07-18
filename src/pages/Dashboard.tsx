import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col, Menu, Card, Result, Button } from 'antd';

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

interface IDashboardProps {
  requireAuth: boolean,
  authenticated: boolean,
}

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

const Dashboard = (props: IDashboardProps) => {
  const { requireAuth, authenticated } = props;
  return (
    <AppLayout requireAuth={requireAuth}>
      {authenticated ? (
        <>
          <Row type="flex" gutter={16}>
            <Col xs={24}>
              <IntervalMenu />
            </Col>
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
              Insights here
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
      ) : (
        <div className="flex-center-contents">
          <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={(
              <Link to="/login">
                <Button type="primary">Signin is Required</Button>
              </Link>
            )}
          />
        </div>
      )}
    </AppLayout>
  );
};

export default Dashboard;
