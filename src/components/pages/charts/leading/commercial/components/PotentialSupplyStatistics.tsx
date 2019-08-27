import React from 'react';
import { Query } from 'react-apollo';
import { Card, Typography, Divider, Alert } from 'antd';

import DashboardSpinner from '../../../../../spinners/DashboardSpinner';
import AppDynamicChart from '../../../../../AppDynamicChart';

import { useUserContextValue } from '../../../../../../contexts/UserContext';
import { useMarketsContextValue } from '../../../../../../contexts/MarketsContext';
import { CHART_COLORS } from '../../../../../../utils/data/chartDataUtils';
import { LEADING_COMMERCIAL_POTENTIAL_SUPPLY } from '../../../../../../apollo/queries/chart';

const { Title } = Typography;

const PotentialSupplyStatistics = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  const { token } = useUserContextValue();

  let serverError: string | undefined;
  let dataSource: { [key: string]: any } = {};
  const mergedTicks: number[] = [];

  return (
    <Query<any>
      query={LEADING_COMMERCIAL_POTENTIAL_SUPPLY}
      variables={{
        token,
        exchange: marketCode,
      }}
    >
      {({ data: { leadingCharts }, loading, error }) => {
        if (!loading) {
          const { potentialSupply } = leadingCharts;
          dataSource = potentialSupply
            .reverse()
            .reduce((obj: {}, currentItem: { label: string, value: number}) => {
              mergedTicks.push(currentItem.value);
              return Object.assign(obj, { [currentItem.label]: currentItem.value });
            }, { tooltipLabel: 'Office Space (\'000 sqm)' });
        }
        if (error) {
          serverError = error.graphQLErrors[0].message;
        }
        Object.keys(dataSource).forEach((key) => {
          dataSource[`tooltip${key}`] = dataSource[key];
        });
        const filteredKeys = Object.keys(dataSource).filter((key) => !key.includes('tooltip'));
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>Potential Supply Statistics - Office Space</Title>
            <Divider className="my-3" />
            {serverError ? (
              <Alert message={serverError} type="error" />
            ) : (
              <DashboardSpinner isLoading={loading}>
                <AppDynamicChart
                  chartType="bar"
                  height={570}
                  dataSource={[dataSource]}
                  bottomXAxis={{
                    label: 'Office Space (\'000 sqm)',
                    ticks: [],
                    hideTicks: true,
                  }}
                  leftYAxis={{
                    label: 'Potential Supply Statistics (\'000 sqm)',
                    ticks: mergedTicks,
                  }}
                  chartLines={filteredKeys.map((key, idx) => {
                    const chartColors = Object.keys(CHART_COLORS);
                    return {
                      key,
                      color: CHART_COLORS[chartColors[idx]],
                    };
                  })}
                  legendPayload={filteredKeys.map((key, idx) => {
                    const chartColors = Object.keys(CHART_COLORS);
                    return {
                      id: idx + 1,
                      type: 'square',
                      value: key,
                      color: CHART_COLORS[chartColors[idx]],
                    };
                  })}
                />
              </DashboardSpinner>
            )}
          </Card>
        );
      }}
    </Query>
  );
};

export default PotentialSupplyStatistics;
