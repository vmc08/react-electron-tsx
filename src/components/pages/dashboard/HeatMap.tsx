import React from 'react';
import { Query } from 'react-apollo';
import { Card, Typography, Divider } from 'antd';

import DashboardSpinner from '../../spinners/DashboardSpinner';

import { useMarketsContextValue } from '../../../contexts/MarketsContext';
import { useUserContextValue } from '../../../contexts/UserContext';
import { useIntervalContext } from '../../../contexts/IntervalContext';
import { HEAT_MAP } from '../../../apollo/queries/dashboard';

const { Title } = Typography;

const HeatMap = () => {
  const { token }: any = useUserContextValue();
  const { interval }: any = useIntervalContext();
  const { market: { marketCode } }: any = useMarketsContextValue();
  return (
    <Query<any>
      query={HEAT_MAP}
      variables={{ token, exchange: marketCode, interval }}
    >
      {({ data, loading, error }) => {
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>Heat Map</Title>
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

export default HeatMap;
