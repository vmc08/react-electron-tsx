import React from 'react';
import { UserConsumer } from '../contexts/UserContext';
import AppLayout from '../components/layout/AppLayout';

class Documentation extends React.Component {
  render() {
    return (
      <AppLayout>
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

export default Documentation;
