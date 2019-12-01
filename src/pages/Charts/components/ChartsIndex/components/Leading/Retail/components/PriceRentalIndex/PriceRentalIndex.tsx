import React from 'react';
import { Query } from 'react-apollo';
import { Card, Typography, Divider, Alert } from 'antd';

import MiniSpinner from 'components/MiniSpinner';
import AppDynamicChart from 'components/AppDynamicChart';

import { useUserContextValue } from 'contexts/UserContext';
import { useMarketsContextValue } from 'contexts/MarketsContext';
import { truncateDecimals } from 'utils/numberUtils';
import { mergeObjectArrayValues } from 'utils/arrayUtils';
import { CHART_COLORS } from 'utils/data/chartDataUtils';
import { LEADING_RETAIL_PRICE_VS_RENTAL } from 'apollo/queries/chart';

const { Title } = Typography;

const PriceRentalIndex = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  const { token } = useUserContextValue();

  let serverError: string | undefined;
  let dataSource: any[] = [];
  const mergedTicks: number[] = [];

  return (
    <Query<any>
      query={LEADING_RETAIL_PRICE_VS_RENTAL}
      variables={{
        token,
        exchange: marketCode,
      }}
    >
      {({ data: { leadingCharts }, loading, error }) => {
        if (!loading) {
          dataSource = mergeObjectArrayValues(leadingCharts).map((item: any) => {
            mergedTicks.push(item.priceIndex, item.rentalIndex);
            return {
              ...item,
              tooltipLabel: item.label,
              tooltipPriceIndex: truncateDecimals(item.priceIndex),
              tooltipRentalIndex: truncateDecimals(item.rentalIndex),
            };
          }).reverse();
        }
        if (error) {
          serverError = error.graphQLErrors[0].message;
        }
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>Price vs Rental Index - Retail Space</Title>
            <Divider className="my-3" />
            {serverError ? (
              <Alert message={serverError} type="error" />
            ) : (
              <MiniSpinner isLoading={loading}>
                <AppDynamicChart
                  height={570}
                  dataSource={dataSource}
                  xTickInterval={4}
                  yTickLabelFormatter={(value) => truncateDecimals(value)}
                  leftYAxis={{
                    label: 'Prince Index',
                    ticks: mergedTicks.filter((v) => v),
                  }}
                  rightYAxis={{
                    label: 'Rental Index',
                    ticks: mergedTicks.filter((v) => v),
                  }}
                  chartLines={[
                    {
                      key: 'priceIndex',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      key: 'rentalIndex',
                      color: CHART_COLORS.BLUE,
                      yAxisId: 'right',
                    },
                  ]}
                  legendPayload={[
                    {
                      id: 1,
                      value: 'Price Index',
                      type: 'line',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      id: 2,
                      value: 'Rental Index',
                      type: 'line',
                      color: CHART_COLORS.BLUE,
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

export default PriceRentalIndex;
