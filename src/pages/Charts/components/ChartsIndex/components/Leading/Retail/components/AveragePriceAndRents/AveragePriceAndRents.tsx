import React from 'react';
import { Query } from 'react-apollo';
import { Card, Typography, Divider, Alert } from 'antd';

import MiniSpinner from 'components/MiniSpinner';
import AppDynamicChart from 'components/AppDynamicChart';

import { useUserContextValue } from 'contexts/UserContext';
import { useMarketsContextValue } from 'contexts/MarketsContext';
import { formatCurrency } from 'utils/numberUtils';
import { mergeObjectArrayValues } from 'utils/arrayUtils';
import { CHART_COLORS } from 'utils/data/chartDataUtils';
import { LEADING_RETAIL_AVERAGE_AND_RENTS_BY_AREA } from 'apollo/queries/chart';

const { Title } = Typography;

const AveragePriceAndRents = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  const { token } = useUserContextValue();

  let serverError: string | undefined;
  let dataSource: any[] = [];
  const mergedLeftTicks: number[] = [];
  const mergedRightTicks: number[] = [];

  return (
    <Query<any>
      query={LEADING_RETAIL_AVERAGE_AND_RENTS_BY_AREA}
      variables={{
        token,
        exchange: marketCode,
      }}
    >
      {({ data: { leadingCharts }, loading, error }) => {
        if (!loading) {
          dataSource = mergeObjectArrayValues(leadingCharts).map((item: any) => {
            const {
              averagePricesHongKong,
              averagePricesKowloon,
              averagePricesNT,
              averageRentsHongKong,
              averageRentsKowloon,
              averageRentsNT,
            } = item;
            mergedLeftTicks.push(
              averagePricesHongKong,
              averagePricesKowloon,
              averagePricesNT,
            );
            mergedRightTicks.push(
              averageRentsHongKong,
              averageRentsKowloon,
              averageRentsNT,
            );
            return {
              ...item,
              tooltipLabel: item.label,
              tooltipAveragePricesHongKong: formatCurrency(averagePricesHongKong),
              tooltipAveragePricesKowloon: formatCurrency(averagePricesKowloon),
              tooltipAveragePricesNT: formatCurrency(averagePricesNT),
              tooltipAverageRentsHongKong: formatCurrency(averageRentsHongKong),
              tooltipAverageRentsKowloon: formatCurrency(averageRentsKowloon),
              tooltipAverageRentsNT: formatCurrency(averageRentsNT),
            };
          }).reverse();
        }
        if (error) {
          serverError = error.graphQLErrors[0].message;
        }
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>Average Prices and Rents by Area</Title>
            <Divider className="my-3" />
            {serverError ? (
              <Alert message={serverError} type="error" />
            ) : (
              <MiniSpinner isLoading={loading}>
                <AppDynamicChart
                  height={570}
                  dataSource={dataSource}
                  xTickInterval={40}
                  yTickLabelFormatter={(value) => formatCurrency(value)}
                  leftYAxis={{
                    label: 'Average Price',
                    ticks: mergedLeftTicks.filter((v) => v),
                  }}
                  rightYAxis={{
                    label: 'Average Rents',
                    ticks: mergedRightTicks.filter((v) => v),
                  }}
                  chartLines={[
                    {
                      key: 'averagePricesHongKong',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      key: 'averagePricesKowloon',
                      color: CHART_COLORS.BLUE,
                    },
                    {
                      key: 'averagePricesNT',
                      color: CHART_COLORS.ORANGE,
                    },
                    {
                      key: 'averageRentsHongKong',
                      color: CHART_COLORS.YELLOW,
                      yAxisId: 'right',
                    },
                    {
                      key: 'averageRentsKowloon',
                      color: CHART_COLORS.RED,
                      yAxisId: 'right',
                    },
                    {
                      key: 'averageRentsNT',
                      color: CHART_COLORS.CYAN,
                      yAxisId: 'right',
                    },
                  ]}
                  legendPayload={[
                    {
                      id: 1,
                      value: 'Average Prices (Hong Kong)',
                      type: 'line',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      id: 2,
                      value: 'Average Prices (Kowloon)',
                      type: 'line',
                      color: CHART_COLORS.BLUE,
                    },
                    {
                      id: 3,
                      value: 'Average Prices (N.T.)',
                      type: 'line',
                      color: CHART_COLORS.ORANGE,
                    },
                    {
                      id: 4,
                      value: 'Average Rents (Hong Kong)',
                      type: 'line',
                      color: CHART_COLORS.YELLOW,
                    },
                    {
                      id: 5,
                      value: 'Average Rents (Kowloon)',
                      type: 'line',
                      color: CHART_COLORS.RED,
                    },
                    {
                      id: 6,
                      value: 'Average Rents (N.T.)',
                      type: 'line',
                      color: CHART_COLORS.CYAN,
                    },
                  ]}
                />
              </MiniSpinner>
            )}
          </Card>
        );
      }}
    </Query>
  );
};

export default AveragePriceAndRents;
