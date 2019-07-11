import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';

import { UserConsumer } from '../contexts/UserContext';
import AppLayout from '../components/layout/AppLayout';
import MarketCap from '../components/pages/dashboard/MarketCap';
import HeatMap from '../components/pages/dashboard/HeatMap';
import TopGainers from '../components/pages/dashboard/TopGainers';
import TopVolume from '../components/pages/dashboard/TopVolume';
import TopLosers from '../components/pages/dashboard/TopLosers';
import Portfolio from '../components/pages/dashboard/Portfolio';
import Watchlist from '../components/pages/dashboard/Watchlist';

class Dashboard extends React.Component<{ requireAuth: boolean }> {
  render() {
    const { requireAuth } = this.props;
    return (
      <AppLayout requireAuth={requireAuth}>
        <UserConsumer>
          {(value) => {
            return (
              <>
                <Row gutter={16}>
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
              </>
            );
          }}
        </UserConsumer>
      </AppLayout>
    );
  }
}

export default Dashboard;
