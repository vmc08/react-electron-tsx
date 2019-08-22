import React from 'react';
import { Row, Col } from 'antd';
import AppLayout from '../components/layout/AppLayout';

import { UserConsumer } from '../contexts/UserContext';
import LoadableComponent from '../config/LoadableComponent';

const PriceIndex = LoadableComponent({
  componentPathName: 'components/pages/charts/PriceIndex',
});

const FTSE = LoadableComponent({
  componentPathName: 'components/pages/charts/FTSE',
});

const YieldSpread = LoadableComponent({
  componentPathName: 'components/pages/charts/YieldSpread',
});

const MarketCapNPI = LoadableComponent({
  componentPathName: 'components/pages/charts/MarketCapNPI',
});

class Chart extends React.Component<{ requireAuth: boolean }> {
  render() {
    const { requireAuth } = this.props;
    return (
      <AppLayout requireAuth={requireAuth}>
        <UserConsumer>
          {(value) => {
            return (
              <>
                <Row type="flex" gutter={16}>
                  <Col className="pb-2 pb-sm-3" xs={24}>
                    <PriceIndex />
                  </Col>
                </Row>
                <Row type="flex" gutter={16}>
                  <Col className="pb-2 pb-sm-3" xs={24}>
                    <FTSE />
                  </Col>
                </Row>
                <Row type="flex" gutter={16}>
                  <Col className="pb-2 pb-sm-3" xs={24}>
                    <YieldSpread />
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col className="mb-2 mb-lg-0" xs={24}>
                    <MarketCapNPI />
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

export default Chart;
