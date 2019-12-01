import React from 'react';
import { UserConsumer } from 'contexts/UserContext';
import AppLayout from 'components/AppLayout';

class MarketBriefs extends React.Component<{ requireAuth: boolean }> {
  render() {
    const { requireAuth } = this.props;
    return (
      <AppLayout requireAuth={requireAuth}>
        <UserConsumer>
          {(value) => {
            return (
              <div>Market Briefs Page</div>
            );
          }}
        </UserConsumer>
      </AppLayout>
    );
  }
}

export default MarketBriefs;
