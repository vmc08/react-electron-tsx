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
import { LEADING_HOSPITALITY_SEASONALITY_TRENDS } from 'apollo/queries/chart';

const { Title } = Typography;

const SeasonalVisitorArrivals = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  const { token } = useUserContextValue();

  let serverError: string | undefined;
  let dataSource: any[] = [];
  const mergedTicks: number[] = [];

  return (
    <Query<any>
      query={LEADING_HOSPITALITY_SEASONALITY_TRENDS}
      variables={{
        token,
        exchange: marketCode,
      }}
    >
      {({ data: { leadingCharts }, loading, error }) => {
        if (!loading) {
          dataSource = mergeObjectArrayValues(leadingCharts).map((item: any) => {
            const {
              seasonalityTrends2013,
              seasonalityTrends2014,
              seasonalityTrends2015,
              seasonalityTrends2016,
              seasonalityTrends2017,
              seasonalityTrends2018,
              seasonalityTrends2019,
            } = item;
            mergedTicks.push(
              seasonalityTrends2013,
              seasonalityTrends2014,
              seasonalityTrends2015,
              seasonalityTrends2016,
              seasonalityTrends2017,
              seasonalityTrends2018,
              seasonalityTrends2019,
            );
            return {
              ...item,
              tooltipLabel: item.label,
              tooltipSeasonalityTrends2013: formatCurrency(seasonalityTrends2013),
              tooltipSeasonalityTrends2014: formatCurrency(seasonalityTrends2014),
              tooltipSeasonalityTrends2015: formatCurrency(seasonalityTrends2015),
              tooltipSeasonalityTrends2016: formatCurrency(seasonalityTrends2016),
              tooltipSeasonalityTrends2017: formatCurrency(seasonalityTrends2017),
              tooltipSeasonalityTrends2018: formatCurrency(seasonalityTrends2018),
              tooltipSeasonalityTrends2019:
                seasonalityTrends2019 ? formatCurrency(seasonalityTrends2019) : null,
            };
          }).reverse();
        }
        if (error) {
          serverError = error.graphQLErrors[0].message;
        }
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>
              Seasonality Trends of International Visitor Arrivals into Singapore
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
                  yTickLabelFormatter={(value) => formatCurrency(value)}
                  leftYAxis={{
                    label: 'Total International Visitor Arrivals (\'000)',
                    ticks: mergedTicks.filter((v) => v),
                  }}
                  chartLines={[
                    {
                      key: 'seasonalityTrends2013',
                      color: CHART_COLORS.CYAN,
                    },
                    {
                      key: 'seasonalityTrends2014',
                      color: CHART_COLORS.YELLOW,
                    },
                    {
                      key: 'seasonalityTrends2015',
                      color: CHART_COLORS.RED,
                    },
                    {
                      key: 'seasonalityTrends2016',
                      color: CHART_COLORS.ORANGE,
                    },
                    {
                      key: 'seasonalityTrends2017',
                      color: CHART_COLORS.BLUE,
                    },
                    {
                      key: 'seasonalityTrends2018',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      key: 'seasonalityTrends2019',
                      color: CHART_COLORS.LIGHT_GREEN,
                    },
                  ]}
                  legendPayload={[
                    {
                      id: 1,
                      value: 'F\'2019',
                      type: 'line',
                      color: CHART_COLORS.LIGHT_GREEN,
                    },
                    {
                      id: 1,
                      value: '2018',
                      type: 'line',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      id: 2,
                      value: '2017',
                      type: 'line',
                      color: CHART_COLORS.BLUE,
                    },
                    {
                      id: 3,
                      value: '2016',
                      type: 'line',
                      color: CHART_COLORS.ORANGE,
                    },
                    {
                      id: 4,
                      value: '2015',
                      type: 'line',
                      color: CHART_COLORS.RED,
                    },
                    {
                      id: 5,
                      value: '2014',
                      type: 'line',
                      color: CHART_COLORS.YELLOW,
                    },
                    {
                      id: 6,
                      value: '2013',
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

export default SeasonalVisitorArrivals;
