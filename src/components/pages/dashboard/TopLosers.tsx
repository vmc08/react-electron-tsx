import React from 'react';
import { Card, Typography } from 'antd';

import { TOP_LOSERS } from '../../../apollo/queries/dashboard';

class TopLosers extends React.Component {
  render() {
    return (
      <Card className="mb-2 mb-sm-3" loading/>
    );
  }
}

export default TopLosers;
