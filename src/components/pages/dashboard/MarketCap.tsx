import React from 'react';
import { Query } from 'react-apollo';
import { Card, Typography } from 'antd';

import { MARKET_CAP } from '../../../apollo/queries/dashboard';

class MarketCap extends React.Component {
  render() {
    return (
      <Card className="mb-2 mb-sm-3" loading />
      // <Query<any> query={MARKET_CAP}>
      //   {({ data, loading }) => {
      //     console.log(data);
      //     return (
      //       <Card className="mb-2 mb-sm-3" loading={loading}/>
      //     );
      //   }}
      // </Query>
    );
  }
}

export default MarketCap;
