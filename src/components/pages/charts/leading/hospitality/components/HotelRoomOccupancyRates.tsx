import React from 'react';
import { Query } from 'react-apollo';
import { Card, Typography, Divider, Alert } from 'antd';

import DashboardSpinner from '../../../../../spinners/DashboardSpinner';
import AppDynamicChart from '../../../../../AppDynamicChart';

import { useUserContextValue } from '../../../../../../contexts/UserContext';
import { useMarketsContextValue } from '../../../../../../contexts/MarketsContext';
import { truncateDecimals } from '../../../../../../utils/numberUtils';
import { CHART_COLORS } from '../../../../../../utils/data/chartDataUtils';
import {
  LEADING_HOSPITALITY_STANDARD_AVG_OCCUPANCY_RATES,
} from '../../../../../../apollo/queries/chart';

const { Title } = Typography;

const HotelRoomOccupancyRates = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  const { token } = useUserContextValue();

  let serverError: string | undefined;
  let dataSource: any[] = [];

  return (
    <Query<any>
      query={LEADING_HOSPITALITY_STANDARD_AVG_OCCUPANCY_RATES}
      variables={{
        token,
        exchange: marketCode,
      }}
    >
      {({ data: { leadingCharts }, loading, error }) => {
        if (!loading) {
          const { standardAverageOccupancyRates } = leadingCharts;
          dataSource = standardAverageOccupancyRates.map((
            { label, value }: {label: string, value: number},
          ) => ({
            label, value,
            tooltipLabel: label,
            tooltipValue: <span>{truncateDecimals(value * 100)}%</span>,
          })).reverse();
        }
        if (error) {
          serverError = error.graphQLErrors[0].message;
        }
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>Singapore Hotel Room Standard Average Occupancy Rates (%)</Title>
            <Divider className="my-3" />
            {serverError ? (
              <Alert message={serverError} type="error" />
            ) : (
              <DashboardSpinner isLoading={loading}>
                <AppDynamicChart
                  height={570}
                  dataSource={dataSource}
                  xTickInterval={4}
                  yTickLabelFormatter={(value) => `${truncateDecimals(value * 100)}%`}
                  leftYAxis={{
                    label: 'Standard Average Occupancy Rates (%)',
                    ticks: dataSource.map((source) => source.value),
                  }}
                  legendPayload={[
                    {
                      id: 1,
                      value: 'Standard Average Occupancy Rate (AOR) (%)',
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

export default HotelRoomOccupancyRates;
