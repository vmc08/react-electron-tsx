import React from 'react';
import { Card, Typography } from 'antd';

import { HEAT_MAP } from '../../../apollo/queries/dashboard';

class HeatMap extends React.Component {
  render() {
    return (
      <Card className="mb-2 mb-sm-3" loading/>
    );
  }
}

export default HeatMap;
