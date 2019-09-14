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
  LEADING_DOMESTIC_PRICE_INDEX_TERRITORY_WIDE_BY_CLASSES,
} from '../../../../../../apollo/queries/chart';

const { Title } = Typography;

const PriceIndexTerritoryWide = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  const { token } = useUserContextValue();

  let serverError: string | undefined;
  let dataSource: any[] = [];
  const mergedTicks: number[] = [];

  return (
    <Query<any>
      query={LEADING_DOMESTIC_PRICE_INDEX_TERRITORY_WIDE_BY_CLASSES}
      variables={{
        token,
        exchange: marketCode,
      }}
    >
      {({ data: { leadingCharts }, loading, error }) => {
        if (!loading) {
          dataSource = mergeObjectArrayValues(leadingCharts).map((item: any) => {
            const {
              priceIndexClassA,
              priceIndexClassB,
              priceIndexClassC,
              priceIndexClassD,
              priceIndexClassE,
              priceIndexAllClasses,
            } = item;
            mergedTicks.push(
              priceIndexClassA,
              priceIndexClassB,
              priceIndexClassC,
              priceIndexClassD,
              priceIndexClassE,
              priceIndexAllClasses,
            );
            return {
              ...item,
              tooltipLabel: item.label,
              tooltipPriceIndexClassA: formatCurrency(priceIndexClassA),
              tooltipPriceIndexClassB: formatCurrency(priceIndexClassB),
              tooltipPriceIndexClassC: formatCurrency(priceIndexClassC),
              tooltipPriceIndexClassD: formatCurrency(priceIndexClassD),
              tooltipPriceIndexClassE: formatCurrency(priceIndexClassE),
              tooltipPriceIndexAllClasses: formatCurrency(priceIndexAllClasses),
            };
          }).reverse();
        }
        if (error) {
          serverError = error.graphQLErrors[0].message;
        }
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>Price Index Territory-wide by Classes</Title>
            <Divider className="my-3" />
            {serverError ? (
              <Alert message={serverError} type="error" />
            ) : (
              <DashboardSpinner isLoading={loading}>
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
                      key: 'priceIndexClassA',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      key: 'priceIndexClassB',
                      color: CHART_COLORS.BLUE,
                    },
                    {
                      key: 'priceIndexClassC',
                      color: CHART_COLORS.ORANGE,
                    },
                    {
                      key: 'priceIndexClassD',
                      color: CHART_COLORS.RED,
                    },
                    {
                      key: 'priceIndexClassE',
                      color: CHART_COLORS.YELLOW,
                    },
                    {
                      key: 'priceIndexAllClasses',
                      color: CHART_COLORS.CYAN,
                    },
                  ]}
                  legendPayload={[
                    {
                      id: 1,
                      value: 'Class A',
                      type: 'line',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      id: 2,
                      value: 'Class B',
                      type: 'line',
                      color: CHART_COLORS.BLUE,
                    },
                    {
                      id: 3,
                      value: 'Class C',
                      type: 'line',
                      color: CHART_COLORS.ORANGE,
                    },
                    {
                      id: 4,
                      value: 'Class D',
                      type: 'line',
                      color: CHART_COLORS.RED,
                    },
                    {
                      id: 5,
                      value: 'Class E',
                      type: 'line',
                      color: CHART_COLORS.YELLOW,
                    },
                    {
                      id: 6,
                      value: 'Price Index (All Classes)',
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

export default PriceIndexTerritoryWide;
