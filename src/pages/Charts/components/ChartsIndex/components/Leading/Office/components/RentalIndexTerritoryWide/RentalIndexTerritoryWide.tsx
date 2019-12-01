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
  LEADING_OFFICES_RENTAL_INDEX_TERRITORY_WIDE_BY_GRADE,
} from 'apollo/queries/chart';

const { Title } = Typography;

const RentalIndexTerritoryWide = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  const { token } = useUserContextValue();

  let serverError: string | undefined;
  let dataSource: any[] = [];
  const mergedTicks: number[] = [];

  return (
    <Query<any>
      query={LEADING_OFFICES_RENTAL_INDEX_TERRITORY_WIDE_BY_GRADE}
      variables={{
        token,
        exchange: marketCode,
      }}
    >
      {({ data: { leadingCharts }, loading, error }) => {
        if (!loading) {
          dataSource = mergeObjectArrayValues(leadingCharts).map((item: any) => {
            const {
              rentalIndexGradeA,
              rentalIndexGradeB,
              rentalIndexGradeC,
              rentalIndex,
            } = item;
            mergedTicks.push(
              rentalIndexGradeA,
              rentalIndexGradeB,
              rentalIndexGradeC,
              rentalIndex,
            );
            return {
              ...item,
              tooltipLabel: item.label,
              tooltipRentalIndexGradeA: formatCurrency(rentalIndexGradeA),
              tooltipRentalIndexGradeB: formatCurrency(rentalIndexGradeB),
              tooltipRentalIndexGradeC: formatCurrency(rentalIndexGradeC),
              tooltipRentalIndex: formatCurrency(rentalIndex),
            };
          }).reverse();
        }
        if (error) {
          serverError = error.graphQLErrors[0].message;
        }
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>Rental Index Territory-wide by Grades</Title>
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
                    label: 'Rental Index',
                    ticks: mergedTicks.filter((v) => v),
                  }}
                  chartLines={[
                    {
                      key: 'rentalIndexGradeA',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      key: 'rentalIndexGradeB',
                      color: CHART_COLORS.BLUE,
                    },
                    {
                      key: 'rentalIndexGradeC',
                      color: CHART_COLORS.ORANGE,
                    },
                    {
                      key: 'rentalIndex',
                      color: CHART_COLORS.RED,
                    },
                  ]}
                  legendPayload={[
                    {
                      id: 1,
                      value: 'Grade A',
                      type: 'line',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      id: 2,
                      value: 'Grade B',
                      type: 'line',
                      color: CHART_COLORS.BLUE,
                    },
                    {
                      id: 3,
                      value: 'Grade C',
                      type: 'line',
                      color: CHART_COLORS.ORANGE,
                    },
                    {
                      id: 4,
                      value: 'Rental Index (Overall)',
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

export default RentalIndexTerritoryWide;
