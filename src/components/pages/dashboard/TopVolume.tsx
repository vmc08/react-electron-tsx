import React from 'react';
import { Card, Typography } from 'antd';

import { TOP_VOLUME } from '../../../apollo/queries/dashboard';

class TopVolume extends React.Component {
  render() {
    return (
      <Card className="mb-2 mb-sm-3" loading/>
    );
  }
}

export default TopVolume;
