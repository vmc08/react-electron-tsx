import React from 'react';
import { UserConsumer } from '../contexts/UserContext';
import AppLayout from '../components/layout/AppLayout';

import PriceIndex from '../components/pages/charts/PriceIndex';

class Chart extends React.Component<{ requireAuth: boolean }> {
  render() {
    const { requireAuth } = this.props;
    return (
      <AppLayout requireAuth={requireAuth}>
        <UserConsumer>
          {(value) => {
            return (
              <PriceIndex />
            );
          }}
        </UserConsumer>
      </AppLayout>
    );
  }
}

export default Chart;
