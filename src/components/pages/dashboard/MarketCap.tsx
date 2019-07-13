import React from 'react';
import { Query } from 'react-apollo';
import { Card, Typography, Divider } from 'antd';

import DashboardSpinner from '../../spinners/DashboardSpinner';

import { useMarketsContextValue } from '../../../contexts/MarketsContext';
import { useUserContextValue } from '../../../contexts/UserContext';
import { useIntervalContext } from '../../../contexts/IntervalContext';
import { MARKET_CAP } from '../../../apollo/queries/dashboard';

const { Title } = Typography;

const MarketCap = () => {
  const { token }: any = useUserContextValue();
  const { interval }: any = useIntervalContext();
  const { market: exchange }: any = useMarketsContextValue();
  return (
    <Query<any>
      query={MARKET_CAP}
      variables={{ token, exchange, interval }}
    >
      {({ data, loading, error }) => {
        return (
          <Card className="mb-2 mb-sm-3 p-3" bodyStyle={{ padding: 0 }}>
            <Title level={4}>Market Cap</Title>
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

export default MarketCap;
