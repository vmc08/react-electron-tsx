import React from 'react';
import { Query } from 'react-apollo';
import { Card, Typography, Divider } from 'antd';

import DashboardSpinner from '../../spinners/DashboardSpinner';

import { useMarketsContextValue } from '../../../contexts/MarketsContext';
import { useUserContextValue } from '../../../contexts/UserContext';
import { useIntervalContext } from '../../../contexts/IntervalContext';
import { TOP_VOLUME } from '../../../apollo/queries/dashboard';

const { Title } = Typography;

const TopVolume = () => {
  const { token }: any = useUserContextValue();
  const { interval }: any = useIntervalContext();
  const { market: exchange }: any = useMarketsContextValue();
  return (
    <Query<any>
      query={TOP_VOLUME}
      variables={{ token, exchange, interval }}
    >
      {({ data, loading, error }) => {
        return (
          <Card className="mb-2 mb-sm-3 p-3" bodyStyle={{ padding: 0 }}>
            <Title level={4}>Top Volume</Title>
            <Divider className="my-3" />
            <DashboardSpinner isLoading={loading}>
              Loading
            </DashboardSpinner>
          </Card>
        );
      }}
    </Query>
  );
};

export default TopVolume;
