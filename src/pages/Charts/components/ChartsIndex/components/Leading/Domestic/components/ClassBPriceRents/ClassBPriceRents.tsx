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
import {
  LEADING_DOMESTIC_CLASSB_AVERAGE_PRICES_AND_RENTS_BY_AREA,
} from 'apollo/queries/chart';

const { Title } = Typography;

const ClassBPriceRents = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  const { token } = useUserContextValue();

  let serverError: string | undefined;
  let dataSource: any[] = [];
  const mergedLeftTicks: number[] = [];
  const mergedRightTicks: number[] = [];

  return (
    <Query<any>
      query={LEADING_DOMESTIC_CLASSB_AVERAGE_PRICES_AND_RENTS_BY_AREA}
      variables={{
        token,
        exchange: marketCode,
      }}
    >
      {({ data: { leadingCharts }, loading, error }) => {
        if (!loading) {
          dataSource = mergeObjectArrayValues(leadingCharts).map((item: any) => {
            const {
              averagePricesClassBHongKong,
              averagePricesClassBKowloon,
              averagePricesClassBNT,
              averageRentsClassBHongKong,
              averageRentsClassBKowloon,
              averageRentsClassBNT,
            } = item;
            mergedLeftTicks.push(
              averagePricesClassBHongKong,
              averagePricesClassBKowloon,
              averagePricesClassBNT,
            );
            mergedRightTicks.push(
              averageRentsClassBHongKong,
              averageRentsClassBKowloon,
              averageRentsClassBNT,
            );
            return {
              ...item,
              tooltipLabel: item.label,
              tooltipAveragePricesClassBHongKong: formatCurrency(averagePricesClassBHongKong),
              tooltipAveragePricesClassBKowloon: formatCurrency(averagePricesClassBKowloon),
              tooltipAveragePricesClassBNT: formatCurrency(averagePricesClassBNT),
              tooltipAverageRentsClassBHongKong: formatCurrency(averageRentsClassBHongKong),
              tooltipAverageRentsClassBKowloon: formatCurrency(averageRentsClassBKowloon),
              tooltipAverageRentsClassBNT: formatCurrency(averageRentsClassBNT),
            };
          }).reverse();
        }
        if (error) {
          serverError = error.graphQLErrors[0].message;
        }
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>Class B - Average Prices and Rents by Area</Title>
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
                    label: 'Average Prices',
                    ticks: mergedLeftTicks.filter((v) => v),
                  }}
                  rightYAxis={{
                    label: 'Average Rents',
                    ticks: mergedRightTicks.filter((v) => v),
                  }}
                  chartLines={[
                    {
                      key: 'averagePricesClassBHongKong',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      key: 'averagePricesClassBKowloon',
                      color: CHART_COLORS.BLUE,
                    },
                    {
                      key: 'averagePricesClassBNT',
                      color: CHART_COLORS.ORANGE,
                    },
                    {
                      key: 'averageRentsClassBHongKong',
                      color: CHART_COLORS.RED,
                      yAxisId: 'right',
                    },
                    {
                      key: 'averageRentsClassBKowloon',
                      color: CHART_COLORS.YELLOW,
                      yAxisId: 'right',
                    },
                    {
                      key: 'averageRentsClassBNT',
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
                      color: CHART_COLORS.RED,
                    },
                    {
                      id: 5,
                      value: 'Average Rents (Kowloon)',
                      type: 'line',
                      color: CHART_COLORS.YELLOW,
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

export default ClassBPriceRents;
