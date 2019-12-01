import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Card, Typography, Divider, Table, Row, Col, Alert } from 'antd';

import MiniSpinner from 'components/MiniSpinner';
import EmptyState from 'components/EmptyState';

import { useMarketsContextValue } from 'contexts/MarketsContext';
import { useUserContextValue } from 'contexts/UserContext';
import { formatCurrency } from 'utils/numberUtils';
import { DASHBOARD_PORTFOLIO } from 'apollo/queries/dashboard';

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

const Portfolio = () => {
  const { token } = useUserContextValue();
  const { market: { marketCode, currency } } = useMarketsContextValue();

  let portfolioTotal = 0;
  let serverError: string | undefined;
  let dataSource: any = [];
  const columns = [
    { title: 'Reit Name', dataIndex: 'name', key: 'name' },
    { title: 'Value', dataIndex: 'value', key: 'value', className: 'text-right w-40' },
  ];

  return (
    <Query<any>
      query={DASHBOARD_PORTFOLIO}
      variables={{ token, exchange: marketCode }}
    >
      {({ data, loading, error }) => {
        if (!loading && data.portfolio.holdings.length) {
          portfolioTotal = data.portfolio.totalValue;
        }
        if (error) {
          serverError = error.graphQLErrors[0].message;
        } else {
          dataSource = loading ?
            [] : data.portfolio.holdings.slice(0, 5).map(({ currentValue, reit }: any) => ({
              name: reit.name,
              value: `${currency} ${formatCurrency(currentValue)}`,
            }));
        }
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Row>
              <Col xs={12}>
                <Title level={4} className="mb-0">Portfolio</Title>
              </Col>
              <Col xs={12}>
                <Link to="/portfolio">
                  <Text type="secondary" className="float-right">Show all</Text>
                </Link>
              </Col>
            </Row>
            <Divider className="my-3" />
            {serverError ? (
              <Alert message={serverError} type="error" />
            ) : (
              <MiniSpinner isLoading={loading}>
                {(!loading && !!dataSource.length) && (
                  <Row className="mb-3">
                    <Col xs={12}>
                      <Text strong className="ml-2" style={{ fontSize: 18 }}>
                        Total
                      </Text>
                    </Col>
                    <Col xs={12}>
                      <Text strong className="float-right mr-2" style={{ fontSize: 18 }}>
                        {formatCurrency(portfolioTotal)}
                      </Text>
                    </Col>
                  </Row>
                )}
                <StyledTable
                  locale={{
                    emptyText: <EmptyState
                      mainText="There are no items in your portfolio"
                      subText="Buy some to get started"
                      buttonText="Buy"
                      buttonLink="/portfolio"
                    />,
                  }}
                  rowKey={(row: any) => row.name}
                  size="middle"
                  showHeader={false}
                  pagination={false}
                  dataSource={dataSource}
                  columns={columns}
                />
              </MiniSpinner>
            )}
          </Card>
        );
      }}
    </Query>
  );
};

export default Portfolio;
