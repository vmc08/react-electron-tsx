import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { Card, Typography, Divider, Table, Alert } from 'antd';

import DashboardSpinner from '../../spinners/DashboardSpinner';
import EmptyState from '../../EmptyState';

import { useMarketsContextValue } from '../../../contexts/MarketsContext';
import { useUserContextValue } from '../../../contexts/UserContext';
import { useIntervalContext } from '../../../contexts/IntervalContext';
import { TOP_VOLUME } from '../../../apollo/queries/dashboard';
import { formatCurrency } from '../../../utils/numberUtils';

const { Title } = Typography;
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

const TopVolume = () => {
  const { token } = useUserContextValue();
  const { interval } = useIntervalContext();
  const { market: { marketCode, currency } } = useMarketsContextValue();

  let serverError: string | undefined;
  let dataSource: any = [];
  const columns = [
    { title: 'Reit Name', dataIndex: 'name', key: 'name' },
    { title: 'Value', dataIndex: 'value', key: 'value', className: 'text-right w-40' },
  ];

  return (
    <Query<any>
      query={TOP_VOLUME}
      variables={{ token, exchange: marketCode, interval }}
    >
      {({ data, loading, error }) => {
        if (error) {
          serverError = error.graphQLErrors[0].message;
        } else {
          dataSource = loading ?
          [] : data.topVolume.map(({ reit, volume }: any) => ({
            name: reit.name,
            value: `${currency} ${formatCurrency(volume)}`,
          }));
        }
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>Top Volume</Title>
            <Divider className="my-3" />
            {serverError ? (
              <Alert message={serverError} type="error" />
            ) : (
              <DashboardSpinner isLoading={loading}>
                <StyledTable
                  locale={{
                    emptyText: <EmptyState />,
                  }}
                  rowKey={(row: any) => row.name}
                  size="middle"
                  showHeader={false}
                  pagination={false}
                  dataSource={dataSource}
                  columns={columns}
                />
              </DashboardSpinner>
            )}
          </Card>
        );
      }}
    </Query>
  );
};

export default TopVolume;
