import React from 'react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, TooltipProps, Legend, LegendPayload,
  ReferenceLine,
  // LabelList,
} from 'recharts';
import { Card, Typography } from 'antd';
import {
  SANS_SERIF_FONT, CHART_COLORS,
} from '../../utils/data/chartDataUtils';
import { generateTicks } from '../../utils/chartUtils';

const { Paragraph } = Typography;

interface IAppDynamicChart {
  change?: number,
  dataSource: Array<{ label: string, value: number }>,
  height: number,
  hideTooltip?: boolean,
  yLabel?: string | number,
  xLabel?: string | number,
  hideXLabels?: boolean,
  hideYLabels?: boolean,
  legendPayload?: LegendPayload[],
  yTickLabelFormatter?: (value: number) => string,
  xTickInterval?: number,
}

interface ICustomDot {
  cx?: number,
  cy?: number,
  fill: string,
  stroke: string,
}

interface ICustomTooltip extends TooltipProps {
  currency?: string,
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
      fill={fill}
      fillOpacity={0.1}
      cx={cx}
      cy={cy}
      r={11}
      stroke={stroke}
      strokeWidth={1}
      strokeDasharray={2}
    />
  </>
);

const CustomTooltip = ({ payload }: ICustomTooltip) => {
  if ((payload && !payload.length) || !payload) {
    return null;
  }
  const { payload: innerPayload, dataKey, color } = payload[0];
  const { tooltipLabel, tooltipValue } = innerPayload;
  return (
    <Card className="p-3" bodyStyle={{ padding: 0 }}>
      <Paragraph strong>{tooltipLabel}</Paragraph>
      <Paragraph style={{ color }}>{tooltipValue}</Paragraph>
      <Paragraph className="mb-0">{dataKey}</Paragraph>
    </Card>
  );
};

const AppDynamicChart = ({
  height, dataSource, hideTooltip = false,
  xLabel, hideXLabels = false,
  yLabel, hideYLabels = false,
  legendPayload = [],
  yTickLabelFormatter,
  change = 0, // market cap price change
  xTickInterval = 1,
}: IAppDynamicChart) => {

  const allValues = dataSource.map(({ value }) => value);
  if (legendPayload.length) {
    // add legendPayload id which actually contains values
    // to make sure all reference lines can be rendered
    legendPayload.filter(({ id }) => id).forEach(({ id }) => allValues.push(id));
  }

  const pointValues = dataSource.length ? [Math.min(...allValues), Math.max(...allValues)] : [];
  const Yticks = generateTicks(pointValues);

  const defaultAxisLabelStyle = {
    style: {
      textAnchor: 'middle',
    },
  };

  const hasHorizontalText = (xLabel && !hideXLabels);
  const hasVerticalText = (yLabel && !hideYLabels);

  return (
    <ResponsiveContainer width="100%" height={height} className="mr-5">
      <AreaChart
        data={dataSource}
        margin={{
          left: hasVerticalText ? 40 : 0,
          bottom: hasHorizontalText ? 40 : hideXLabels ? 0 : 5,
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
          domain={['dataMin - 100', 'dataMax + 100']}
          hide={hideXLabels}
          interval={xTickInterval}
          label={{
            ...defaultAxisLabelStyle,
            offset: 25,
            value: xLabel,
            position: 'bottom',
          }}
          tick={({ x, y, payload: { value} }) => (
            <text
              x={x}
              y={y + 8}
              dominantBaseline="hanging"
              fontFamily={SANS_SERIF_FONT}
            >
              {value}
            </text>
          )}
        />
        <YAxis
          type="number"
          axisLine={false}
          tickLine={false}
          ticks={Yticks}
          tickCount={Yticks.length}
          domain={['dataMin', 'dataMax']}
          hide={hideYLabels}
          label={{
            ...defaultAxisLabelStyle,
            offset: 20,
            angle: -90,
            value: yLabel,
            position: 'left',
          }}
          tick={({ x, y, payload: { value } }) => {
            const tickLabelValue = yTickLabelFormatter ? yTickLabelFormatter(value) : value;
            return (
              <text
                x={x - 45}
                y={y - 8}
                dominantBaseline="hanging"
                fontFamily={SANS_SERIF_FONT}
              >
                {tickLabelValue}
              </text>
            );
          }}
        />
        {!hideTooltip && (
          <Tooltip
            cursor={false}
            content={<CustomTooltip />}
          />
        )}
        <Area
          type="monotone"
          dataKey="value"
          strokeWidth={2}
          fillOpacity={0.05}
          fill={(change >= 0 ? CHART_COLORS.GREEN : CHART_COLORS.RED)}
          stroke={(change >= 0 ? CHART_COLORS.GREEN : CHART_COLORS.RED)}
          activeDot={(
            <CustomDot
              fill={(change >= 0 ? CHART_COLORS.GREEN : CHART_COLORS.RED)}
              stroke={(change >= 0 ? CHART_COLORS.GREEN : CHART_COLORS.RED)}
            />
          )}
        >
          {/* <LabelList
            dataKey="value"
            position="top"
            offset={20}
          /> */}
        </Area>
        {legendPayload.map(({ value, id, color }, idx) => {
          if (idx === 0) {
            return null;
          }
          return (
            <ReferenceLine
              isFront
              y={id}
              key={idx}
              strokeWidth={2}
              stroke={color}
            />
          );
        })}
        {!!legendPayload.length && (
          <Legend
            wrapperStyle={{ paddingTop: 50, bottom: 20 }}
            payload={legendPayload}
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AppDynamicChart;
