import React from 'react';
import { Query } from 'react-apollo';
import { Card, Typography, Divider, Alert } from 'antd';

import MiniSpinner from 'components/MiniSpinner';
import AppDynamicChart from 'components/AppDynamicChart';

import { useUserContextValue } from 'contexts/UserContext';
import { useMarketsContextValue } from 'contexts/MarketsContext';
import { truncateDecimals } from 'utils/numberUtils';
import { CHART_COLORS } from 'utils/data/chartDataUtils';
import { mergeObjectArrayValues } from 'utils/arrayUtils';
import { LEADING_HOSPITALITY_ROOM_RATE_VS_REVENUE } from 'apollo/queries/chart';

const { Title } = Typography;

const HotelRoomRatesVsRevenue = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  const { token } = useUserContextValue();

  let serverError: string | undefined;
  let dataSource: any[] = [];
  const mergedTicks: number[] = [];

  return (
    <Query<any>
      query={LEADING_HOSPITALITY_ROOM_RATE_VS_REVENUE}
      variables={{
        token,
        exchange: marketCode,
      }}
    >
      {({ data: { leadingCharts }, loading, error }) => {
        if (!loading) {
          dataSource = mergeObjectArrayValues(leadingCharts).map((item: any) => {
            const {
              revenuePerAvailableRoom,
              standardAverageRoomRates,
            } = item;
            mergedTicks.push(
              revenuePerAvailableRoom,
              standardAverageRoomRates,
            );
            return {
              ...item,
              tooltipLabel: item.label,
              tooltipRevenuePerAvailableRoom: truncateDecimals(revenuePerAvailableRoom),
              tooltipStandardAverageRoomRates: truncateDecimals(standardAverageRoomRates),
            };
          }).reverse();
        }
        if (error) {
          serverError = error.graphQLErrors[0].message;
        }
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>
              Singapore Hotel Standard Average Room Rates vs Revenue per Available Room
            </Title>
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
                    label: 'Dollars ($)',
                    ticks: mergedTicks.filter((v) => v),
                  }}
                  chartLines={[
                    {
                      key: 'revenuePerAvailableRoom',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      key: 'standardAverageRoomRates',
                      color: CHART_COLORS.RED,
                    },
                  ]}
                  legendPayload={[
                    {
                      id: 1,
                      value: 'Standard Average Room Rate (ARR) ($)',
                      type: 'line',
                      color: CHART_COLORS.RED,
                    },
                    {
                      id: 2,
                      value: 'Revenue per Available Room (RevPar) ($)',
                      type: 'line',
                      color: CHART_COLORS.GREEN,
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

export default HotelRoomRatesVsRevenue;
