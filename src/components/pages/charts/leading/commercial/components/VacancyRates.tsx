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
import { LEADING_COMMERCIAL_VACANCY_RATES } from '../../../../../../apollo/queries/chart';

const { Title } = Typography;

const VacancyRates = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  const { token } = useUserContextValue();

  let serverError: string | undefined;
  let dataSource: any[] = [];
  const mergedTicks: any[] = [];

  return (
    <Query<any>
      query={LEADING_COMMERCIAL_VACANCY_RATES}
      variables={{
        token,
        exchange: marketCode,
      }}
    >
      {({ data: { leadingCharts }, loading, error }) => {
        if (!loading) {
          dataSource = mergeObjectArrayValues(leadingCharts).map((item: any) => {
            const { vacancyRatesCategory1, vacancyRatesCategory2 } = item;
            mergedTicks.push(vacancyRatesCategory1, vacancyRatesCategory2);
            return {
              ...item,
              tooltipLabel: item.label,
              tooltipVacancyRatesCategory1: `${truncateDecimals(vacancyRatesCategory1 * 100)}%`,
              tooltipVacancyRatesCategory2: `${truncateDecimals(vacancyRatesCategory2 * 100)}%`,
            };
          }).reverse();
        }
        if (error) {
          serverError = error.graphQLErrors[0].message;
        }
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>Vacancy Rates - Office Space by Location</Title>
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
                    label: 'Vacancy Rates (%)',
                    ticks: mergedTicks,
                  }}
                  chartLines={[
                    {
                      key: 'vacancyRatesCategory1',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      key: 'vacancyRatesCategory2',
                      color: CHART_COLORS.BLUE,
                    },
                  ]}
                  legendPayload={[
                    {
                      id: 1,
                      value: 'Category 1',
                      type: 'line',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      id: 2,
                      value: 'Category 2',
                      type: 'line',
                      color: CHART_COLORS.BLUE,
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

export default VacancyRates;
