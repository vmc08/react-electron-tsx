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

const StyledRow = styled(Row)`
`;

const StyledCol = styled(Col)`
`;

class Dashboard extends React.Component<{ requireAuth: boolean }> {
  render() {
    const { requireAuth } = this.props;
    return (
      <AppLayout requireAuth={requireAuth}>
        <UserConsumer>
          {(value) => {
            return (
              <>
                <StyledRow gutter={24}>
                  <StyledCol xs={24} xl={12}>
                    <MarketCap />
                  </StyledCol>
                  <StyledCol xs={24} xl={12}>
                    <HeatMap />
                  </StyledCol>
                </StyledRow>
                <StyledRow gutter={24}>
                  <StyledCol xs={24} xl={8}>
                    <TopGainers />
                  </StyledCol>
                  <StyledCol xs={24} xl={8}>
                    <TopVolume />
                  </StyledCol>
                  <StyledCol xs={24} xl={8}>
                    <TopLosers />
                  </StyledCol>
                </StyledRow>
                <StyledRow gutter={24}>
                  <StyledCol xs={24} xl={16}>
                    Insights here
                  </StyledCol>
                  <StyledCol xs={24} xl={8}>
                    <StyledRow gutter={24}>
                      <StyledCol>
                        <Portfolio />
                      </StyledCol>
                    </StyledRow>
                    <StyledRow gutter={24}>
                      <StyledCol>
                        <Watchlist />
                      </StyledCol>
                    </StyledRow>
                  </StyledCol>
                </StyledRow>
              </>
            );
          }}
        </UserConsumer>
      </AppLayout>
    );
  }
}

export default Dashboard;
