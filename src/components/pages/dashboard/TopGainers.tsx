import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { Card, Typography, Divider, Table, Icon } from 'antd';

import DashboardSpinner from '../../spinners/DashboardSpinner';

import { useMarketsContextValue } from '../../../contexts/MarketsContext';
import { useUserContextValue } from '../../../contexts/UserContext';
import { useIntervalContext } from '../../../contexts/IntervalContext';
import { TOP_GAINERS } from '../../../apollo/queries/dashboard';
import { truncateDecimals } from '../../../utils/numberUtils';

const { Title, Text } = Typography;
const StyledTable = styled(Table)`
  .ant-table-placeholder {
    border: 0;
  }
  .ant-table-row {
    td {
      border-bottom: 0;
    }
  }
`;

const TopGainers = () => {
  const { token } = useUserContextValue();
  const { interval } = useIntervalContext();
  const { market: { marketCode } } = useMarketsContextValue();
  return (
    <Query<any>
      query={TOP_GAINERS}
      variables={{ token, exchange: marketCode, interval, criteria: 'priceChangeRatio' }}
    >
      {({ data, loading, error }) => {
        const dataSource = loading ?
          [] : data.topGainers.map(({ reit, priceChangeRatio }: any) => ({
            name: reit.name,
            value: <span>
              <Icon type="arrow-up" className="mr-1" />
              {truncateDecimals(priceChangeRatio * 100)}%
            </span>,
          }));
        const columns = [
          { title: 'Reit Name', dataIndex: 'name', key: 'name' },
          {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            className: 'text-right w-40',
            render: (text: string) => <Text style={{ color: '#52C41A' }}>{text}</Text>,
          },
        ];
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>Top Gainers</Title>
            <Divider className="my-3" />
            <DashboardSpinner isLoading={loading}>
              <StyledTable
                rowKey={(row: any) => row.name}
                size="middle"
                showHeader={false}
                pagination={false}
                dataSource={dataSource}
                columns={columns}
              />
            </DashboardSpinner>
          </Card>
        );
      }}
    </Query>
  );
};

export default TopGainers;
