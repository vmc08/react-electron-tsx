import React from 'react';
import { Query } from 'react-apollo';
import { Card, Typography, Divider, Alert } from 'antd';

import DashboardSpinner from '../../../../../spinners/DashboardSpinner';
import AppDynamicChart from '../../../../../AppDynamicChart';

import { useUserContextValue } from '../../../../../../contexts/UserContext';
import { useMarketsContextValue } from '../../../../../../contexts/MarketsContext';
import { formatCurrency } from '../../../../../../utils/numberUtils';
import { mergeObjectArrayValues } from '../../../../../../utils/arrayUtils';
import { CHART_COLORS } from '../../../../../../utils/data/chartDataUtils';
import {
  LEADING_HOSPITALITY_HOTEL_ROOM_NIGHT_TRENDS,
} from '../../../../../../apollo/queries/chart';

const { Title } = Typography;

const HotelRoomTrends = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  const { token } = useUserContextValue();

  let serverError: string | undefined;
  let dataSource: any[] = [];
  const mergedTicks: number[] = [];

  return (
    <Query<any>
      query={LEADING_HOSPITALITY_HOTEL_ROOM_NIGHT_TRENDS}
      variables={{
        token,
        exchange: marketCode,
      }}
    >
      {({ data: { leadingCharts }, loading, error }) => {
        if (!loading) {
          dataSource = mergeObjectArrayValues(leadingCharts).map((item: any) => {
            const {
              hotelRoomNightTrendsAvailableRoomNights,
              hotelRoomNightTrendsGrossLettings,
              hotelRoomNightTrendsPaidLettings,
              totalVisitorArrivals,
            } = item;
            mergedTicks.push(
              hotelRoomNightTrendsAvailableRoomNights,
              hotelRoomNightTrendsGrossLettings,
              hotelRoomNightTrendsPaidLettings,
              totalVisitorArrivals,
            );
            return {
              ...item,
              tooltipLabel: item.label,
              tooltipHotelRoomNightTrendsAvailableRoomNights:
                formatCurrency(hotelRoomNightTrendsAvailableRoomNights),
              tooltipHotelRoomNightTrendsGrossLettings:
                formatCurrency(hotelRoomNightTrendsGrossLettings),
              tooltipHotelRoomNightTrendsPaidLettings:
                formatCurrency(hotelRoomNightTrendsPaidLettings),
              tooltipTotalVisitorArrivals:
                formatCurrency(totalVisitorArrivals),
            };
          }).reverse();
        }
        if (error) {
          serverError = error.graphQLErrors[0].message;
        }
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>Singapore Hotel Room Night Trends</Title>
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
                    label: 'Room Night Trends (\'000)',
                    ticks: mergedTicks.filter((v) => v),
                  }}
                  rightYAxis={{
                    label: 'Total International Visitor Arrivals (\'mil)',
                    ticks: mergedTicks.filter((v) => v),
                  }}
                  chartLines={[
                    {
                      key: 'hotelRoomNightTrendsAvailableRoomNights',
                      color: CHART_COLORS.RED,
                    },
                    {
                      key: 'hotelRoomNightTrendsGrossLettings',
                      color: CHART_COLORS.ORANGE,
                    },
                    {
                      key: 'hotelRoomNightTrendsPaidLettings',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      key: 'totalVisitorArrivals',
                      color: CHART_COLORS.YELLOW,
                      yAxisId: 'right',
                    },
                  ]}
                  legendPayload={[
                    {
                      id: 1,
                      value: 'Available Room Nights',
                      type: 'line',
                      color: CHART_COLORS.RED,
                    },
                    {
                      id: 2,
                      value: 'Paid Lettings',
                      type: 'line',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      id: 3,
                      value: 'Gross Lettings (Room Nights)',
                      type: 'line',
                      color: CHART_COLORS.ORANGE,
                    },
                    {
                      id: 4,
                      value: 'Total International Visitor Arrivals',
                      type: 'line',
                      color: CHART_COLORS.YELLOW,
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

export default HotelRoomTrends;
