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
import { LEADING_RETAIL_VACANCY_RATES } from '../../../../../../apollo/queries/chart';

const { Title } = Typography;

const VacancyRates = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  const { token } = useUserContextValue();

  let serverError: string | undefined;
  let dataSource: any[] = [];
  const mergedTicks: number[] = [];

  return (
    <Query<any>
      query={LEADING_RETAIL_VACANCY_RATES}
      variables={{
        token,
        exchange: marketCode,
      }}
    >
      {({ data: { leadingCharts }, loading, error }) => {
        if (!loading) {
          dataSource = mergeObjectArrayValues(leadingCharts).map((item: any) => {
            const {
              vacancyRatesOrchardArea,
              vacancyRatesOutsideCentralArea,
              vacancyRatesOutsideOrchardArea,
            } = item;
            mergedTicks.push(
              vacancyRatesOrchardArea,
              vacancyRatesOutsideCentralArea,
              vacancyRatesOutsideOrchardArea,
            );
            return {
              ...item,
              tooltipLabel: item.label,
              tooltipVacancyRatesOrchardArea: `${truncateDecimals(vacancyRatesOrchardArea * 100)}%`,
              tooltipVacancyRatesOutsideCentralArea:
                `${truncateDecimals(vacancyRatesOutsideCentralArea * 100)}%`,
              tooltipVacancyRatesOutsideOrchardArea:
              `${truncateDecimals(vacancyRatesOutsideOrchardArea * 100)}%`,
            };
          }).reverse();
        }
        if (error) {
          serverError = error.graphQLErrors[0].message;
        }
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>Vacancy Rates - Retail Space by Location</Title>
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
                    ticks: mergedTicks.filter((v) => v),
                  }}
                  chartLines={[
                    {
                      key: 'vacancyRatesOrchardArea',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      key: 'vacancyRatesOutsideCentralArea',
                      color: CHART_COLORS.ORANGE,
                    },
                    {
                      key: 'vacancyRatesOutsideOrchardArea',
                      color: CHART_COLORS.BLUE,
                    },
                  ]}
                  legendPayload={[
                    {
                      id: 1,
                      value: 'Orchard Area',
                      type: 'line',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      id: 2,
                      value: 'Outside Orchard Area',
                      type: 'line',
                      color: CHART_COLORS.BLUE,
                    },
                    {
                      id: 3,
                      value: 'Outside Central Area',
                      type: 'line',
                      color: CHART_COLORS.ORANGE,
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
