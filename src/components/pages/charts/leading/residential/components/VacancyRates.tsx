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
import { LEADING_RESIDENTIAL_VACANCY_RATES } from '../../../../../../apollo/queries/chart';

const { Title } = Typography;

const VacancyRates = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  const { token } = useUserContextValue();

  let serverError: string | undefined;
  let dataSource: any[] = [];
  const mergedTicks: any[] = [];

  return (
    <Query<any>
      query={LEADING_RESIDENTIAL_VACANCY_RATES}
      variables={{
        token,
        exchange: marketCode,
      }}
    >
      {({ data: { leadingCharts }, loading, error }) => {
        if (!loading) {
          dataSource = mergeObjectArrayValues(leadingCharts).map((item: any) => {
            const {
              vacancyRatesCCR,
              vacancyRatesOCR,
              vacancyRatesRCR,
            } = item;
            mergedTicks.push(
              vacancyRatesCCR,
              vacancyRatesOCR,
              vacancyRatesRCR,
            );
            return {
              ...item,
              tooltipLabel: item.label,
              tooltipVacancyRatesCCR: `${truncateDecimals(vacancyRatesCCR * 100)}%`,
              tooltipVacancyRatesOCR: `${truncateDecimals(vacancyRatesOCR * 100)}%`,
              tooltipVacancyRatesRCR: `${truncateDecimals(vacancyRatesRCR * 100)}%`,
            };
          }).reverse();
        }
        if (error) {
          serverError = error.graphQLErrors[0].message;
        }
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>Vacancy Rates - Private Residential Properties by Location</Title>
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
                      key: 'vacancyRatesCCR',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      key: 'vacancyRatesOCR',
                      color: CHART_COLORS.ORANGE,
                    },
                    {
                      key: 'vacancyRatesRCR',
                      color: CHART_COLORS.BLUE,
                    },
                  ]}
                  legendPayload={[
                    {
                      id: 1,
                      value: 'CCR',
                      type: 'line',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      id: 2,
                      value: 'RCR',
                      type: 'line',
                      color: CHART_COLORS.BLUE,
                    },
                    {
                      id: 3,
                      value: 'OCR',
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
