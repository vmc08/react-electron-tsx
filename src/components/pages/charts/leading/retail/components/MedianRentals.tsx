import React from 'react';
import { Query } from 'react-apollo';
import { Card, Typography, Divider, Alert } from 'antd';

import DashboardSpinner from '../../../../../spinners/DashboardSpinner';
import AppDynamicChart from '../../../../../AppDynamicChart';

import { useUserContextValue } from '../../../../../../contexts/UserContext';
import { useMarketsContextValue } from '../../../../../../contexts/MarketsContext';
import { truncateDecimals } from '../../../../../../utils/numberUtils';
import { mergeObjectArrayValues } from '../../../../../../utils/arrayUtils';
import { CHART_COLORS } from '../../../../../../utils/data/chartDataUtils';
import { LEADING_RETAIL_MEDIAN_RENTALS } from '../../../../../../apollo/queries/chart';

const { Title } = Typography;

const MedianRentals = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  const { token } = useUserContextValue();

  let serverError: string | undefined;
  let dataSource: any[] = [];
  const mergedTicks: number[] = [];

  return (
    <Query<any>
      query={LEADING_RETAIL_MEDIAN_RENTALS}
      variables={{
        token,
        exchange: marketCode,
      }}
    >
      {({ data: { leadingCharts }, loading, error }) => {
        if (!loading) {
          dataSource = mergeObjectArrayValues(leadingCharts).map((item: any) => {
            const {
              medianRentalsOrchardAreaLeaseCommencement,
              medianRentalsOrchardAreaContractDate,
              medianRentalsOutsideOrchardAreaLeaseCommencement,
              medianRentalsOutsideOrchardAreaContractDate,
              medianRentalsOutsideCentralAreaLeaseCommencement,
              medianRentalsOutsideCentralAreaContractDate,
            } = item;
            mergedTicks.push(
              medianRentalsOrchardAreaLeaseCommencement,
              medianRentalsOrchardAreaContractDate,
              medianRentalsOutsideOrchardAreaLeaseCommencement,
              medianRentalsOutsideOrchardAreaContractDate,
              medianRentalsOutsideCentralAreaLeaseCommencement,
              medianRentalsOutsideCentralAreaContractDate,
            );
            return {
              ...item,
              tooltipLabel: item.label,
              tooltipMedianRentalsOrchardAreaLeaseCommencement:
                medianRentalsOrchardAreaLeaseCommencement,
              tooltipMedianRentalsOrchardAreaContractDate:
              medianRentalsOrchardAreaContractDate,
              tooltipMedianRentalsOutsideOrchardAreaLeaseCommencement:
                medianRentalsOutsideOrchardAreaLeaseCommencement,
              tooltipMedianRentalsOutsideOrchardAreaContractDate:
                medianRentalsOutsideOrchardAreaContractDate,
              tooltipMedianRentalsOutsideCentralAreaLeaseCommencement:
                medianRentalsOutsideCentralAreaLeaseCommencement,
              tooltipMedianRentalsOutsideCentralAreaContractDate:
                medianRentalsOutsideCentralAreaContractDate,
            };
          }).reverse();
        }
        if (error) {
          serverError = error.graphQLErrors[0].message;
        }
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>Median Rentals - Retail Space by Location</Title>
            <Divider className="my-3" />
            {serverError ? (
              <Alert message={serverError} type="error" />
            ) : (
              <DashboardSpinner isLoading={loading}>
                <AppDynamicChart
                  height={570}
                  dataSource={dataSource}
                  xTickInterval={4}
                  yTickLabelFormatter={(value) => truncateDecimals(value)}
                  leftYAxis={{
                    label: 'Median Rentals ($ psf pm)',
                    ticks: mergedTicks.filter((v) => v),
                  }}
                  chartLines={[
                    {
                      key: 'medianRentalsOrchardAreaLeaseCommencement',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      key: 'medianRentalsOrchardAreaContractDate',
                      color: CHART_COLORS.BLUE,
                    },
                    {
                      key: 'medianRentalsOutsideOrchardAreaLeaseCommencement',
                      color: CHART_COLORS.ORANGE,
                    },
                    {
                      key: 'medianRentalsOutsideOrchardAreaContractDate',
                      color: CHART_COLORS.RED,
                    },
                    {
                      key: 'medianRentalsOutsideCentralAreaLeaseCommencement',
                      color: CHART_COLORS.YELLOW,
                    },
                    {
                      key: 'medianRentalsOutsideCentralAreaContractDate',
                      color: CHART_COLORS.CYAN,
                    },
                  ]}
                  legendPayload={[
                    {
                      id: 1,
                      value: 'Orchard Area-Median Rentals (Lease Commencement)',
                      type: 'line',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      id: 2,
                      value: 'Orchard Area-Median Rentals (Contract Date)',
                      type: 'line',
                      color: CHART_COLORS.BLUE,
                    },
                    {
                      id: 3,
                      value: 'Outside Orchard Area-Median Rentals (Lease Commencement)',
                      type: 'line',
                      color: CHART_COLORS.ORANGE,
                    },
                    {
                      id: 4,
                      value: 'Outside Orchard Area-Median Rentals (Contract Date)',
                      type: 'line',
                      color: CHART_COLORS.RED,
                    },
                    {
                      id: 5,
                      value: 'Outside Central Area-Median Rentals (Lease Commencement)',
                      type: 'line',
                      color: CHART_COLORS.YELLOW,
                    },
                    {
                      id: 6,
                      value: 'Outside Central Area-Median Rentals (Contract Date)',
                      type: 'line',
                      color: CHART_COLORS.CYAN,
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

export default MedianRentals;
