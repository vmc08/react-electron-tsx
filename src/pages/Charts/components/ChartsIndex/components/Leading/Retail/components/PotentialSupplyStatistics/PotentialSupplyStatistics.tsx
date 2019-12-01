import React from 'react';
import { Query } from 'react-apollo';
import { Card, Typography, Divider, Alert } from 'antd';

import MiniSpinner from 'components/MiniSpinner';
import AppDynamicChart from 'components/AppDynamicChart';

import { useUserContextValue } from 'contexts/UserContext';
import { useMarketsContextValue } from 'contexts/MarketsContext';
import { truncateDecimals } from 'utils/numberUtils';
import { CHART_COLORS } from 'utils/data/chartDataUtils';
import { LEADING_RETAIL_POTENTIAL_SUPPLY } from 'apollo/queries/chart';

const { Title } = Typography;

const PotentialSupplyStatistics = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  const { token } = useUserContextValue();

  let serverError: string | undefined;
  const dataSource: Array<{ [key: string]: any }> = [];
  const mergedTicks: number[] = [];

  return (
    <Query<any>
      query={LEADING_RETAIL_POTENTIAL_SUPPLY}
      variables={{
        token,
        exchange: marketCode,
      }}
    >
      {({ data: { leadingCharts }, loading, error }) => {
        if (!loading) {
          [
            { tooltipLabel: 'Retail Space (\'000 sqm)', key: 'potentialSupply' },
          ].forEach(({ tooltipLabel, key }) => {
            const reMappedObj = leadingCharts[key].reverse()
              .reduce((obj: {}, currentItem: { label: string, value: number}) => {
                mergedTicks.push(currentItem.value);
                return Object.assign(obj, {
                  [currentItem.label]: currentItem.value,
                  [`tooltip${currentItem.label}`]: currentItem.value,
                });
              }, { tooltipLabel, label: tooltipLabel });
            dataSource.push(reMappedObj);
          });
        }
        if (error) {
          serverError = error.graphQLErrors[0].message;
        }
        const filteredKeys = dataSource.length ?
          Object.keys(dataSource[0]).filter((key) => {
            // filter out tooltip texts out of the actual key values
            return !key.includes('tooltip') && !key.includes('label') && !key.includes('name');
          }) : [];
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>Potential Supply Statistics - Retail Space</Title>
            <Divider className="my-3" />
            {serverError ? (
              <Alert message={serverError} type="error" />
            ) : (
              <MiniSpinner isLoading={loading}>
                <AppDynamicChart
                  chartType="bar"
                  height={570}
                  dataSource={[...dataSource]}
                  yTickLabelFormatter={(value) => truncateDecimals(value)}
                  leftYAxis={{
                    label: 'Potential Supply Statistics (\'000 sqm)',
                    ticks: mergedTicks.filter((v) => v),
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
              </MiniSpinner>
            )}
          </Card>
        );
      }}
    </Query>
  );
};

export default PotentialSupplyStatistics;
