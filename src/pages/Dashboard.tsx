import React from 'react';
import { UserConsumer } from '../contexts/UserContext';
import AppLayout from '../components/layout/AppLayout';

class Dashboard extends React.Component<{ requireAuth: boolean }> {
  render() {
    const { requireAuth } = this.props;
    return (
      <AppLayout requireAuth={requireAuth}>
        <UserConsumer>
          {(value) => {
            return (
              <div>Dashboard Page</div>
            );
          }}
        </UserConsumer>
      </AppLayout>
    );
  }
}

export default Dashboard;
