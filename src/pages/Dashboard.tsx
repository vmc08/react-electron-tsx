import React from 'react';
import { UserConsumer } from '../contexts/UserContext';

class Dashboard extends React.Component {
  render() {
    return (
      <UserConsumer>
        {(value) => {
          return (
            <div style={{ minHeight: '100vh' }}>Dashboard Page</div>
          );
        }}
      </UserConsumer>
    );
  }
}

export default Dashboard;
