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
  LEADING_OFFICES_PRICE_INDEX_TERRITORY_WIDE_BY_GRADE,
} from 'apollo/queries/chart';

const { Title } = Typography;

const PriceIndexTerritoryWide = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  const { token } = useUserContextValue();

  let serverError: string | undefined;
  let dataSource: any[] = [];
  const mergedTicks: number[] = [];

  return (
    <Query<any>
      query={LEADING_OFFICES_PRICE_INDEX_TERRITORY_WIDE_BY_GRADE}
      variables={{
        token,
        exchange: marketCode,
      }}
    >
      {({ data: { leadingCharts }, loading, error }) => {
        if (!loading) {
          dataSource = mergeObjectArrayValues(leadingCharts).map((item: any) => {
            const {
              priceIndexGradeA,
              priceIndexGradeB,
              priceIndexGradeC,
              priceIndexOverall,
            } = item;
            mergedTicks.push(
              priceIndexGradeA,
              priceIndexGradeB,
              priceIndexGradeC,
              priceIndexOverall,
            );
            return {
              ...item,
              tooltipLabel: item.label,
              tooltipPriceIndexGradeA: formatCurrency(priceIndexGradeA),
              tooltipPriceIndexGradeB: formatCurrency(priceIndexGradeB),
              tooltipPriceIndexGradeC: formatCurrency(priceIndexGradeC),
              tooltipPriceIndexOverall: formatCurrency(priceIndexOverall),
            };
          }).reverse();
        }
        if (error) {
          serverError = error.graphQLErrors[0].message;
        }
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>Price Index Territory-wide by Grades</Title>
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
                    label: 'Price Index',
                    ticks: mergedTicks.filter((v) => v),
                  }}
                  chartLines={[
                    {
                      key: 'priceIndexGradeA',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      key: 'priceIndexGradeB',
                      color: CHART_COLORS.BLUE,
                    },
                    {
                      key: 'priceIndexGradeC',
                      color: CHART_COLORS.ORANGE,
                    },
                    {
                      key: 'priceIndexOverall',
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
                      value: 'Price Index (Overall)',
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

export default PriceIndexTerritoryWide;
