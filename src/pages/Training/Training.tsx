import React from 'react';
import { UserConsumer } from 'contexts/UserContext';
import AppLayout from 'components/AppLayout';

class Training extends React.Component<{ requireAuth: boolean }> {
  render() {
    const { requireAuth } = this.props;
    return (
      <AppLayout requireAuth={requireAuth}>
        <UserConsumer>
          {(value) => {
            return (
              <div>Training Page</div>
            );
          }}
        </UserConsumer>
      </AppLayout>
    );
  }
}

export default Training;
