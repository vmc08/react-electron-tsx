import React from 'react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, TooltipProps,
} from 'recharts';
import { Card, Typography } from 'antd';
import {
  CHART_COLORS,
  SANS_SERIF_FONT,
} from '../../utils/data/chartDataUtils';
import { formatCurrency } from '../../utils/numberUtils';
import { useMarketsContextValue } from '../../contexts/MarketsContext';
import { generateTicks } from '../../utils/chartUtils';

const { Paragraph } = Typography;

interface IAppAreaChart {
  change: number,
  dataSource: Array<{ label: string, value: number }>,
  height: number,
  hideXLabels?: boolean,
  hideYLabels?: boolean,
  hideTooltip?: boolean,
}

interface ICustomDot {
  cx?: number,
  cy?: number,
  fill: string,
  stroke: string,
}

interface ITooltip extends TooltipProps {
  currency: string
}

const CustomDot = ({ cx = 0, cy = 0, fill, stroke }: ICustomDot) => (
  <>
    <circle
      strokeWidth={1}
      fill={stroke}
      cx={cx}
      cy={cy}
      r={6}
      stroke="transparent"
    />
    <circle
      strokeWidth={1}
      fill={fill}
      cx={cx}
      cy={cy}
      r={11}
      stroke={stroke}
      strokeDasharray={2}
    />
  </>
);

const CustomTooltip = ({ payload, currency }: ITooltip) => {
  if ((payload && !payload.length) || !payload) {
    return null;
  }
  const { payload: innerPayload, dataKey, color } = payload[0];
  const { label, value } = innerPayload;
  return (
    <Card className="p-3" bodyStyle={{ padding: 0 }}>
      <Paragraph strong>{label}</Paragraph>
      <Paragraph style={{ color }}>{currency} {formatCurrency(value)}</Paragraph>
      <Paragraph className="mb-0">{dataKey}</Paragraph>
    </Card>
  );
};

const AppAreaChart = ({
  change, dataSource, height, hideYLabels = false, hideXLabels = false, hideTooltip = false,
}: IAppAreaChart) => {
  const { market: { currency } } = useMarketsContextValue();
  const allValues = dataSource.map(({ value }) => value);

  const pointValues = dataSource.length ? [Math.min(...allValues), Math.max(...allValues)] : [];
  const ticks = generateTicks(pointValues);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart
        data={dataSource}
        margin={{
          left: hideYLabels ? 0 : 20,
          right: 0,
        }}
      >
        <CartesianGrid
          vertical={false}
          stroke="#e8e8e8"
        />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          hide={hideXLabels}
          domain={['dataMin - 100', 'dataMax + 100']}
        />
        <YAxis
          type="number"
          axisLine={false}
          tickLine={false}
          hide={hideYLabels}
          ticks={ticks}
          tickCount={ticks.length}
          domain={['dataMin', 'dataMax']}
          tick={({ y, payload: { value } }) => {
            return (
              <text
                y={y - 8}
                dominantBaseline="hanging"
                fill="rgb(102, 102, 102)"
                fontSize="14px"
                fontFamily={SANS_SERIF_FONT}
              >
                {currency} {formatCurrency(value)}
              </text>
            );
          }}
        />
        {!hideTooltip && (
          <Tooltip
            cursor={false}
            content={<CustomTooltip currency={currency} />}
          />
        )}
        <Area
          type="monotone"
          dataKey="value"
          strokeWidth={2}
          fillOpacity={0.05}
          stroke={change >= 0 ? CHART_COLORS.GREEN : CHART_COLORS.RED}
          fill={change >= 0 ? CHART_COLORS.GREEN : CHART_COLORS.RED}
          activeDot={(
            <CustomDot
              fill="rgba(42,213,135,0.1)"
              stroke={(change >= 0 ? CHART_COLORS.GREEN : CHART_COLORS.RED)}
            />
          )}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AppAreaChart;
