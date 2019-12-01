import React from 'react';
import { Query } from 'react-apollo';
import moment from 'moment';
import { Card, Typography, Divider, Alert } from 'antd';

import MiniSpinner from 'components/MiniSpinner';
import AppDynamicChart from 'components/AppDynamicChart';

import { useUserContextValue } from 'contexts/UserContext';
import { useMarketsContextValue } from 'contexts/MarketsContext';
import { truncateDecimals } from 'utils/numberUtils';
import { CHART_COLORS } from 'utils/data/chartDataUtils';
import { YIELD_SPREAD } from 'apollo/queries/chart';

const { Title } = Typography;

const YieldSpread = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  const { token } = useUserContextValue();

  let serverError: string | undefined;
  let lineReferenceValues = {
    minusSTDDEV: 0,
    minus2STDDEV: 0,
    plusSTDDEV: 0,
    plus2STDDEV: 0,
  };
  let dataSource: any[] = [];

  return (
    <Query<any>
      query={YIELD_SPREAD}
      variables={{
        token,
        exchange: marketCode,
        timeRange: '1y',
      }}
    >
      {({ data: { yieldSpread }, loading, error }) => {
        if (!loading) {
          const { chart, ...rest } = yieldSpread;
          lineReferenceValues = rest;
          dataSource = chart.map(({ label, value }: { label: string, value: number }) => ({
            label: moment(label).format('MMM YYYY'),
            tooltipLabel: moment(label).format('MMM DD, YYYY'),
            value,
            tooltipValue: <span>{truncateDecimals(value * 100)}%</span>,
          })).reverse();
        }
        if (error) {
          serverError = error.graphQLErrors[0].message;
        }
        const { minusSTDDEV, minus2STDDEV, plusSTDDEV, plus2STDDEV } = lineReferenceValues;
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>Yield Spread (%)</Title>
            <Divider className="my-3" />
            {serverError ? (
              <Alert message={serverError} type="error" />
            ) : (
              <MiniSpinner isLoading={loading}>
                <AppDynamicChart
                  height={570}
                  dataSource={dataSource}
                  yTickLabelFormatter={(value) => `${truncateDecimals(value * 100)}%`}
                  xTickInterval={20}
                  leftYAxis={{
                    label: 'Yield Spread (%)',
                    ticks: dataSource.map((source) => source.value),
                  }}
                  legendPayloadAsReferenceLines
                  legendPayload={[
                    {
                      id: 0,
                      value: 'Yield Spread (%)',
                      type: 'line',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      id: minusSTDDEV,
                      value: `Yield Spread (%)-1StdDev (${truncateDecimals(minusSTDDEV * 100)}%)`,
                      type: 'square',
                      color: CHART_COLORS.ORANGE,
                    },
                    {
                      id: minus2STDDEV,
                      value: `Yield Spread (%)-2StdDev (${truncateDecimals(minus2STDDEV * 100)}%)`,
                      type: 'square',
                      color: CHART_COLORS.RED,
                    },
                    {
                      id: plusSTDDEV,
                      value: `Yield Spread (%)+1StdDev (${truncateDecimals(plusSTDDEV * 100)}%)`,
                      type: 'square',
                      color: CHART_COLORS.LIGHT_GREEN,
                    },
                    {
                      id: plus2STDDEV,
                      value: `Yield Spread (%)+2StdDev (${truncateDecimals(plus2STDDEV * 100)}%)`,
                      type: 'square',
                      color: CHART_COLORS.DARK_GREEN,
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

export default YieldSpread;
