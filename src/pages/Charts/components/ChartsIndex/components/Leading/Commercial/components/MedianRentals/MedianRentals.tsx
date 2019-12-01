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
import { LEADING_COMMERCIAL_MEDIAN_RENTALS } from 'apollo/queries/chart';

const { Title } = Typography;

const MedianRentals = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  const { token } = useUserContextValue();

  let serverError: string | undefined;
  let dataSource: any[] = [];
  const mergedTicks: number[] = [];

  return (
    <Query<any>
      query={LEADING_COMMERCIAL_MEDIAN_RENTALS}
      variables={{
        token,
        exchange: marketCode,
      }}
    >
      {({ data: { leadingCharts }, loading, error }) => {
        if (!loading) {
          dataSource = mergeObjectArrayValues(leadingCharts).map((item: any) => {
            const {
              medianRentalsCategory1ContractDate,
              medianRentalsCategory1LeaseCommencement,
              medianRentalsCategory2ContractDate,
              medianRentalsCategory2LeaseCommencement,
            } = item;
            mergedTicks.push(
              medianRentalsCategory1ContractDate,
              medianRentalsCategory1LeaseCommencement,
              medianRentalsCategory2ContractDate,
              medianRentalsCategory2LeaseCommencement,
            );
            return {
              ...item,
              tooltipLabel: item.label,
              tooltipMedianRentalsCategory1ContractDate: medianRentalsCategory1ContractDate,
              tooltipMedianRentalsCategory1LeaseCommencement:
                medianRentalsCategory1LeaseCommencement,
              tooltipMedianRentalsCategory2ContractDate: medianRentalsCategory2ContractDate,
              tooltipMedianRentalsCategory2LeaseCommencement:
                medianRentalsCategory2LeaseCommencement,
            };
          }).reverse();
        }
        if (error) {
          serverError = error.graphQLErrors[0].message;
        }
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>Median Rentals - Office Space by Location</Title>
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
                    label: 'Median Rentals ($ psf pm)',
                    ticks: mergedTicks.filter((v) => v),
                  }}
                  chartLines={[
                    {
                      key: 'medianRentalsCategory1ContractDate',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      key: 'medianRentalsCategory1LeaseCommencement',
                      color: CHART_COLORS.BLUE,
                    },
                    {
                      key: 'medianRentalsCategory2LeaseCommencement',
                      color: CHART_COLORS.ORANGE,
                    },
                    {
                      key: 'medianRentalsCategory2ContractDate',
                      color: CHART_COLORS.RED,
                    },
                  ]}
                  legendPayload={[
                    {
                      id: 1,
                      value: 'Category 1-Median Rentals (Lease Commencement)',
                      type: 'line',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      id: 2,
                      value: 'Category 1-Median Rentals (Contract Date)',
                      type: 'line',
                      color: CHART_COLORS.BLUE,
                    },
                    {
                      id: 3,
                      value: 'Category 2-Median Rentals (Lease Commencement)',
                      type: 'line',
                      color: CHART_COLORS.ORANGE,
                    },
                    {
                      id: 4,
                      value: 'Category 2-Median Rentals (Contract Date)',
                      type: 'line',
                      color: CHART_COLORS.RED,
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

export default MedianRentals;
