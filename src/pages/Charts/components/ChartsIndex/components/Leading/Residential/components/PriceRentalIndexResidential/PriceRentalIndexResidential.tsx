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
import {
  LEADING_RESIDENTIAL_PRIVATE_RESIDENTIAL_PROPERTIES,
} from 'apollo/queries/chart';

const { Title } = Typography;

const PriceRentalIndexResidential = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  const { token } = useUserContextValue();

  let serverError: string | undefined;
  let dataSource: any[] = [];
  const mergedTicks: number[] = [];

  return (
    <Query<any>
      query={LEADING_RESIDENTIAL_PRIVATE_RESIDENTIAL_PROPERTIES}
      variables={{
        token,
        exchange: marketCode,
      }}
    >
      {({ data: { leadingCharts }, loading, error }) => {
        if (!loading) {
          dataSource = mergeObjectArrayValues(leadingCharts).map((item: any) => {
            mergedTicks.push(
              item.priceIndexCCR,
              item.priceIndexOCR,
              item.priceIndexRCR,
              item.rentalIndexCCR,
              item.rentalIndexOCR,
              item.rentalIndexRCR,
            );
            return {
              ...item,
              tooltipLabel: item.label,
              tooltipPriceIndexCCR: truncateDecimals(item.priceIndexCCR),
              tooltipPriceIndexOCR: truncateDecimals(item.priceIndexOCR),
              tooltiPriceIndexRCR: truncateDecimals(item.priceIndexRCR),
              tooltipRentalIndexCCR: truncateDecimals(item.rentalIndexCCR),
              tooltipRentalIndexOCR: truncateDecimals(item.rentalIndexOCR),
              tooltipRentalIndexRCR: truncateDecimals(item.rentalIndexRCR),
            };
          }).reverse();
        }
        if (error) {
          serverError = error.graphQLErrors[0].message;
        }
        return (
          <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <Title level={4}>
              Price vs Rental Index - Private Residential Properties by Location
            </Title>
            <Divider className="my-3" />
            {serverError ? (
              <Alert message={serverError} type="error" />
            ) : (
              <MiniSpinner isLoading={loading}>
                <AppDynamicChart
                  height={570}
                  dataSource={dataSource}
                  xTickInterval={10}
                  yTickLabelFormatter={(value) => truncateDecimals(value)}
                  leftYAxis={{
                    label: 'Prince Index',
                    ticks: mergedTicks.filter((v) => v),
                  }}
                  rightYAxis={{
                    label: 'Rental Index',
                    ticks: mergedTicks.filter((v) => v),
                  }}
                  chartLines={[
                    {
                      key: 'priceIndexCCR',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      key: 'priceIndexOCR',
                      color: CHART_COLORS.YELLOW,
                      yAxisId: 'right',
                    },
                    {
                      key: 'priceIndexRCR',
                      color: CHART_COLORS.ORANGE,
                    },
                    {
                      key: 'rentalIndexCCR',
                      color: CHART_COLORS.BLUE,
                    },
                    {
                      key: 'rentalIndexOCR',
                      color: CHART_COLORS.CYAN,
                      yAxisId: 'right',
                    },
                    {
                      key: 'rentalIndexRCR',
                      color: CHART_COLORS.RED,
                    },
                  ]}
                  legendPayload={[
                    {
                      id: 1,
                      value: 'Price Index-CCR',
                      type: 'line',
                      color: CHART_COLORS.GREEN,
                    },
                    {
                      id: 2,
                      value: 'Rental Index-CCR',
                      type: 'line',
                      color: CHART_COLORS.BLUE,
                    },
                    {
                      id: 3,
                      value: 'Price Index-RCR',
                      type: 'line',
                      color: CHART_COLORS.ORANGE,
                    },
                    {
                      id: 4,
                      value: 'Rental Index-RCR',
                      type: 'line',
                      color: CHART_COLORS.RED,
                    },
                    {
                      id: 5,
                      value: 'Price Index-OCR',
                      type: 'line',
                      color: CHART_COLORS.YELLOW,
                    },
                    {
                      id: 6,
                      value: 'Rental Index-OCR',
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

export default PriceRentalIndexResidential;
