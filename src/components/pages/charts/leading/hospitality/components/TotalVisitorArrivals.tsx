import React from 'react';
import { Query } from 'react-apollo';
import { Card, Typography, Divider, Alert } from 'antd';

import DashboardSpinner from '../../../../../spinners/DashboardSpinner';
import AppDynamicChart from '../../../../../AppDynamicChart';

import { useUserContextValue } from '../../../../../../contexts/UserContext';
import { useMarketsContextValue } from '../../../../../../contexts/MarketsContext';
import { formatCurrency } from '../../../../../../utils/numberUtils';
import { CHART_COLORS } from '../../../../../../utils/data/chartDataUtils';
import { LEADING_HOSPITALITY_TOTAL_VISITOR_ARRIVALS } from '../../../../../../apollo/queries/chart';

const { Title } = Typography;

const TotalVisitorArrivals = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  const { token } = useUserContextValue();

  let serverError: string | undefined;
  let dataSource: any[] = [];

  return (
    <Query<any>
      query={LEADING_HOSPITALITY_TOTAL_VISITOR_ARRIVALS}
      variables={{
        token,
        exchange: marketCode,
      }}
    >
      {({ data: { leadingCharts }, loading, error }) => {
        if (!loading) {
          const { totalVisitorArrivals } = leadingCharts;
          dataSource = totalVisitorArrivals.map((
            { label, value }: {label: string, value: number},
          ) => ({
            label, value,
            tooltipLabel: label,
            tooltipValue: <span>{formatCurrency(value)}</span>,
          })).reverse();
        }
        if (error) {
          serverError = error.graphQLErrors[0].message;
        }
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>Total International Visitor Arrivals into Singapore</Title>
            <Divider className="my-3" />
            {serverError ? (
              <Alert message={serverError} type="error" />
            ) : (
              <DashboardSpinner isLoading={loading}>
                <AppDynamicChart
                  height={570}
                  dataSource={dataSource}
                  xTickInterval={4}
                  yTickLabelFormatter={(value) => formatCurrency(value)}
                  leftYAxis={{
                    label: 'Total International Visitor Arrivals (\'mil)',
                    ticks: dataSource.map((source) => source.value),
                  }}
                  legendPayload={[
                    {
                      id: 1,
                      value: 'Total International Visitor Arrivals',
                      type: 'line',
                      color: CHART_COLORS.GREEN,
                    },
                  ]}
                />
              </DashboardSpinner>
            )}
          </Card>
        );
      }}
    </Query>
  );
};

export default TotalVisitorArrivals;
