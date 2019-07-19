import React from 'react';
import { Query } from 'react-apollo';
import { Card, Typography, Divider, Row, Col, Icon, Tooltip } from 'antd';

import DashboardSpinner from '../../spinners/DashboardSpinner';

import { useMarketsContextValue } from '../../../contexts/MarketsContext';
import { useUserContextValue } from '../../../contexts/UserContext';
import { useIntervalContext } from '../../../contexts/IntervalContext';
import { MARKET_CAP } from '../../../apollo/queries/dashboard';

import AppAreaChart from '../../charts/AppAreaChart';
import { formatCurrency } from '../../../utils/numberUtils';
import { truncateDecimals } from '../../../utils/numberUtils';

const { Title, Text } = Typography;

const MarketCap = () => {
  const { token } = useUserContextValue();
  const { interval } = useIntervalContext();
  const { market: { marketCode, currency } } = useMarketsContextValue();

  let change = 0;
  let latestValue = 0;
  let dataSource: any[] = [];

  return (
    <Query<any>
      query={MARKET_CAP}
      variables={{ token, exchange: marketCode, interval }}
    >
      {({ data: { marketCap }, loading, error }) => {
        if (!loading) {
          change = marketCap.change * 100;
          latestValue = marketCap.latest;
          dataSource = marketCap.chart.map(({ label, value }: {label: string, value: number}) => ({
            label, value,
          })).reverse();
        }
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>Market Cap</Title>
            <Divider className="my-3" />
            <DashboardSpinner isLoading={loading}>
              {!loading && (
                <Row className="mb-3">
                  <Col xs={12}>
                    <Tooltip
                      placement="bottomLeft"
                      title={`${currency} ${latestValue.toLocaleString()}`}
                    >
                      <Text strong type="secondary" className="ml-2" style={{ fontSize: 18 }}>
                        {currency} {formatCurrency(latestValue)}
                      </Text>
                    </Tooltip>
                  </Col>
                  <Col xs={12}>
                    <Text
                      strong
                      className="float-right mr-2"
                      style={{
                        fontSize: 18,
                        color: change > 0 ? '#52C41A' : change < 0 ? '#F5222D' : 'inherit',
                      }}
                    >
                      <span>
                        {change !== 0 && (
                          <Icon type={change > 0 ? 'arrow-up' : 'arrow-down'} className="mr-1" />
                        )}
                        {truncateDecimals(change)}%
                      </span>
                    </Text>
                  </Col>
                </Row>
              )}
              <AppAreaChart
                change={change}
                dataSource={dataSource}
                height={200}
                hideYLabels={true}
                hideXLabels={true}
              />
            </DashboardSpinner>
          </Card>
        );
      }}
    </Query>
  );
};

export default MarketCap;
