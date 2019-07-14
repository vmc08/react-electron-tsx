import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { Card, Typography, Divider, Table, Icon } from 'antd';

import DashboardSpinner from '../../spinners/DashboardSpinner';

import { useMarketsContextValue } from '../../../contexts/MarketsContext';
import { useUserContextValue } from '../../../contexts/UserContext';
import { useIntervalContext } from '../../../contexts/IntervalContext';
import { TOP_LOSERS } from '../../../apollo/queries/dashboard';
import { truncateDecimals } from '../../../utils/numberUtils';

const { Title, Text } = Typography;
const StyledTable = styled(Table)`
  .ant-table-placeholder {
    border-bottom: 0;
  }
  .ant-table-row {
    td {
      border-bottom: 0;
    }
  }
`;

const TopLosers = () => {
  const { token }: any = useUserContextValue();
  const { interval }: any = useIntervalContext();
  const { market: { marketCode } }: any = useMarketsContextValue();
  return (
    <Query<any>
      query={TOP_LOSERS}
      variables={{ token, exchange: marketCode, interval, criteria: 'priceChangeRatio' }}
    >
      {({ data, loading, error }) => {
        const dataSource = loading ?
          [] : data.topLosers.map(({ reit, priceChangeRatio }: any) => ({
            name: reit.name,
            value: <span>
              <Icon type="arrow-down" className="mr-1" />
              {truncateDecimals(priceChangeRatio * 100)}%
            </span>,
          }));
        const columns = [
          { title: 'Reit Name', dataIndex: 'name', key: 'name' },
          {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            className: 'text-right',
            render: (text: string) => <Text type="danger">{text}</Text>,
          },
        ];
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>Top Losers</Title>
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

export default TopLosers;
