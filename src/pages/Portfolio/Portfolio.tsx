import React from 'react';
import { UserConsumer } from 'contexts/UserContext';
import AppLayout from 'components/AppLayout';

class Portfolio extends React.Component<{ requireAuth: boolean }> {
  render() {
    const { requireAuth } = this.props;
    return (
      <AppLayout requireAuth={requireAuth}>
        <UserConsumer>
          {(value) => {
            return (
              <div>Portfolio Page</div>
            );
          }}
        </UserConsumer>
      </AppLayout>
    );
  }
}

export default Portfolio;
