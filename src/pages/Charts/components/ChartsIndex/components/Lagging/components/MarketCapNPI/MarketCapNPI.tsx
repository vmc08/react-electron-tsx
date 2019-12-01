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
import { MARKET_CAP_NPI } from 'apollo/queries/chart';

const { Title } = Typography;

const MarketCapNPI = () => {
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
      query={MARKET_CAP_NPI}
      variables={{
        token,
        exchange: marketCode,
        timeRange: '1y',
      }}
    >
      {({ data: { pricePerNAVPerUnitIndex }, loading, error }) => {
        if (!loading) {
          const { chart, ...rest } = pricePerNAVPerUnitIndex;
          lineReferenceValues = rest;
          dataSource = chart.map(({ label, value }: { label: string, value: number }) => ({
            label: moment(label).format('MMM YYYY'),
            tooltipLabel: moment(label).format('MMM DD, YYYY'),
            value,
            tooltipValue: truncateDecimals(value),
          })).reverse();
        }
        if (error) {
          serverError = error.graphQLErrors[0].message;
        }
        const { minusSTDDEV, minus2STDDEV, plusSTDDEV, plus2STDDEV } = lineReferenceValues;
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>Market Cap Weighted Price/NAV per Unit Index of REITs</Title>
            <Divider className="my-3" />
            {serverError ? (
              <Alert message={serverError} type="error" />
            ) : (
              <MiniSpinner isLoading={loading}>
                <AppDynamicChart
                  height={570}
                  dataSource={dataSource}
                  yTickLabelFormatter={(value) => truncateDecimals(value)}
                  xTickInterval={20}
                  leftYAxis={{
                    label: 'Price/NAV per Unit',
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
                      value: `Yield Spread (%)-1StdDev (${truncateDecimals(minusSTDDEV)})`,
                      type: 'square',
                      color: CHART_COLORS.LIGHT_GREEN,
                    },
                    {
                      id: minus2STDDEV,
                      value: `Yield Spread (%)-2StdDev (${truncateDecimals(minus2STDDEV)})`,
                      type: 'square',
                      color: CHART_COLORS.DARK_GREEN,
                    },
                    {
                      id: plusSTDDEV,
                      value: `Yield Spread (%)+1StdDev (${truncateDecimals(plusSTDDEV)})`,
                      type: 'square',
                      color: CHART_COLORS.ORANGE,
                    },
                    {
                      id: plus2STDDEV,
                      value: `Yield Spread (%)+2StdDev (${truncateDecimals(plus2STDDEV)})`,
                      type: 'square',
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

export default MarketCapNPI;
