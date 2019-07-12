import React from 'react';
import { Card, Typography } from 'antd';

import { TOP_GAINERS } from '../../../apollo/queries/dashboard';

class TopGainers extends React.Component {
  render() {
    return (
      <Card className="mb-2 mb-sm-3" loading/>
    );
  }
}

export default TopGainers;
