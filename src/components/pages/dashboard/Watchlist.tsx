import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Card, Typography, Divider, Table, Row, Col } from 'antd';

import DashboardSpinner from '../../spinners/DashboardSpinner';
import EmptyState from '../../EmptyState';

import { useMarketsContextValue } from '../../../contexts/MarketsContext';
import { useUserContextValue } from '../../../contexts/UserContext';
import { DASHBOARD_WATCHLIST } from '../../../apollo/queries/dashboard';
import { formatCurrency } from '../../../utils/numberUtils';

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

const Watchlist = () => {
  const { token } = useUserContextValue();
  const { market: { marketCode, currency } } = useMarketsContextValue();
  return (
    <Query<any>
      query={DASHBOARD_WATCHLIST}
      variables={{ token, exchange: marketCode }}
    >
      {({ data, loading, error }) => {
        const dataSource = loading ?
          [] : data.watchlist.slice(0, 5).map(({ reit }: any) => ({
            name: reit.name,
            value: `${currency} ${formatCurrency(reit.price)}`,
          }));
        const columns = [
          { title: 'Reit Name', dataIndex: 'name', key: 'name' },
          { title: 'Value', dataIndex: 'value', key: 'value', className: 'text-right w-40' },
        ];
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Row>
              <Col xs={12}>
                <Title level={4} className="mb-0">Watchlist</Title>
              </Col>
              <Col xs={12}>
                <Link to="/watchlist">
                  <Text type="secondary" className="float-right">Show all</Text>
                </Link>
              </Col>
            </Row>
            <Divider className="my-3" />
            <DashboardSpinner isLoading={loading}>
              <StyledTable
                locale={{
                  emptyText: <EmptyState
                    mainText="There are no items in your watchlist"
                    subText="Add some to get started"
                    buttonText="See all REITs"
                    buttonLink="/reits"
                  />,
                }}
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

export default Watchlist;
