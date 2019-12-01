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
import { LEADING_INDUSTRIAL_VACANCY_RATES } from 'apollo/queries/chart';

const { Title } = Typography;

const VacancyRates = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  const { token } = useUserContextValue();

  let serverError: string | undefined;
  let dataSource: any[] = [];
  const mergedTicks: any[] = [];

  return (
    <Query<any>
      query={LEADING_INDUSTRIAL_VACANCY_RATES}
      variables={{
        token,
        exchange: marketCode,
      }}
    >
      {({ data: { leadingCharts }, loading, error }) => {
        if (!loading) {
          dataSource = mergeObjectArrayValues(leadingCharts).map((item: any) => {
            const {
              vacancyRatesAll,
              vacancyRatesMultipleUserFactory,
              vacancyRatesSingleUserFactory,
              vacancyRatesBusinessPark,
              vacancyRatesWarehouse,
            } = item;
            mergedTicks.push(
              vacancyRatesAll,
              vacancyRatesMultipleUserFactory,
              vacancyRatesSingleUserFactory,
              vacancyRatesBusinessPark,
              vacancyRatesWarehouse,
            );
            return {
              ...item,
              tooltipLabel: item.label,
              tooltipVacancyRatesAll:
                `${truncateDecimals(vacancyRatesAll * 100)}%`,
              tooltipVacancyRatesMultipleUserFactory:
                `${truncateDecimals(vacancyRatesMultipleUserFactory * 100)}%`,
              tooltipVacancyRatesSingleUserFactory:
                `${truncateDecimals(vacancyRatesSingleUserFactory * 100)}%`,
              tooltipVacancyRatesBusinessPark:
              `${truncateDecimals(vacancyRatesBusinessPark * 100)}%`,
              tooltipVacancyRatesWarehouse:
              `${truncateDecimals(vacancyRatesWarehouse * 100)}%`,
            };
          }).reverse();
        }
        if (error) {
          serverError = error.graphQLErrors[0].message;
        }
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>Vacancy Rates</Title>
            <Divider className="my-3" />
            {serverError ? (
              <Alert message={serverError} type="error" />
            ) : (
              <MiniSpinner isLoading={loading}>
                <AppDynamicChart
                  height={570}
                  dataSource={dataSource}
                  xTickInterval={4}
                  yTickLabelFormatter={(value) => `${truncateDecimals(value * 100)}%`}
                  leftYAxis={{
                    label: 'Vacancy Rates (%)',
                    ticks: mergedTicks.filter((v) => v),
                  }}
                  chartLines={[
                    {
                      key: 'vacancyRatesAll',
                      color: CHART_COLORS.RED,
                    },
                    {
                      key: 'vacancyRatesMultipleUserFactory',
                      color: CHART_COLORS.ORANGE,
                    },
                    {
                      key: 'vacancyRatesBusinessPark',
                      color: CHART_COLORS.YELLOW,
                    },
                    {
                      key: 'vacancyRatesWarehouse',
                      color: CHART_COLORS.BLUE,
                    },
                    {
                      key: 'vacancyRatesSingleUserFactory',
                      color: CHART_COLORS.GREEN,
                    },
                  ]}
                  legendPayload={[
                    {
                      id: 1,
                      value: 'All Industrial',
                      type: 'line',
                      color: CHART_COLORS.RED,
                    },
                    {
                      id: 2,
                      value: 'Multiple-User Factory Space',
                      type: 'line',
                      color: CHART_COLORS.ORANGE,
                    },
                    {
                      id: 3,
                      value: 'Single-User Factory Space',
                      type: 'line',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      id: 4,
                      value: 'Business Park Space',
                      type: 'line',
                      color: CHART_COLORS.YELLOW,
                    },
                    {
                      id: 5,
                      value: 'Warehouse Space',
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

export default VacancyRates;
