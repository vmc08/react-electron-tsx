import React from 'react';
import classnames from 'classnames';
import {
  ResponsiveContainer, AreaChart, Area,
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid,
  Tooltip, TooltipProps,
  Legend, LegendPayload,
  ReferenceLine, LabelList,
} from 'recharts';
import { Card, Typography } from 'antd';
import { generateTicks } from '../utils/chartUtils';
import { SANS_SERIF_FONT, CHART_COLORS } from '../utils/data/chartDataUtils';

const { Paragraph } = Typography;

interface IAppDynamicChart {
  chartType?: string,
  hideXLabels?: boolean,
  hideYLabels?: boolean,
  hideTooltip?: boolean,
  change?: number,
  dataSource: Array<{ [key: string]: number | string }>,
  height: number,
  yTickLabelFormatter?: (value: number) => string,
  xTickInterval?: number,
  leftYAxis?: { label?: string, ticks: number[], hideTicks?: boolean },
  rightYAxis?: { label?: string, ticks: number[], hideTicks?: boolean },
  topXAxis?: { label?: string, ticks: number[], hideTicks?: boolean },
  bottomXAxis?: { label?: string, ticks: number[], hideTicks?: boolean },
  legendPayload?: LegendPayload[],
  legendPayloadAsReferenceLines?: boolean,
  chartLines?: Array<{ key: string, color: string, yAxisId?: string }>,
  chartLinesFillOpacity?: boolean,
}

interface ICustomDot {
  cx?: number,
  cy?: number,
  fill: string,
  stroke: string,
}

const CustomDot = ({ cx = 0, cy = 0, fill, stroke }: ICustomDot) => {
  if (!cx || !cy) {
    return null;
  }
  return (
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
};

const CustomTooltip = ({ payload }: TooltipProps) => {
  if ((payload && !payload.length) || !payload) {
    return null;
  }
  const { payload: innerPayload } = payload[0];
  return (
    <Card className="p-3" bodyStyle={{ padding: 0 }}>
      <Paragraph strong>{innerPayload.tooltipLabel}</Paragraph>
      {payload.map(({ payload: singlePayload, dataKey, color }, idx) => {
        const capitalizedKey = (typeof dataKey === 'string') ?
          (dataKey.charAt(0).toUpperCase()).concat(dataKey.substring(1)) : dataKey;
        const valueKey = `tooltip${capitalizedKey}`;
        const lastParagraphClass = classnames({ 'mb-0': payload.length === (idx + 1) });
        return (
          <React.Fragment key={valueKey}>
            <Paragraph className="mb-0" style={{ color }}>{singlePayload[valueKey]}</Paragraph>
            <Paragraph className={lastParagraphClass}>{dataKey}</Paragraph>
          </React.Fragment>
        );
      })}
    </Card>
  );
};

const AppDynamicChart = ({
  chartType = 'area',
  height, dataSource, hideTooltip = false,
  legendPayload = [],
  legendPayloadAsReferenceLines = false,
  yTickLabelFormatter,
  change = 0, // market cap price change
  xTickInterval = 1,
  chartLines = [{ key: 'value', color: CHART_COLORS.GREEN }],
  hideXLabels = false, hideYLabels = false,
  leftYAxis, rightYAxis,
  topXAxis, bottomXAxis,
  chartLinesFillOpacity = false,
}: IAppDynamicChart) => {

  const deriveTickValues = (tickSource: number[]) => {
    const cloneTickSource = [...tickSource];
    if (legendPayload.length && legendPayloadAsReferenceLines) {
      // add legendPayload id which actually contains values
      // to make sure all reference lines can be rendered
      legendPayload.filter(({ id }) => id).forEach(({ id }) => cloneTickSource.push(id));
    }
    const pointValues = dataSource.length ?
      [Math.min(...cloneTickSource), Math.max(...cloneTickSource)] : [];
    return generateTicks(pointValues, (chartType !== 'area'));
  };

  const defaultAxisLabelStyle = {
    style: {
      textAnchor: 'middle',
    },
  };
  const hideXTickLabels = (bottomXAxis && bottomXAxis.hideTicks);
  const ParentChart = (chartType === 'area') ? AreaChart : BarChart;

  return (
    <ResponsiveContainer width="100%" height={height} className="mr-5">
      <ParentChart
        data={dataSource}
        margin={{
          left: (leftYAxis && leftYAxis.label) && !hideYLabels ? 40 : 5,
          right: (rightYAxis && rightYAxis.label) && !hideYLabels ? 40 : 5,
          top: (topXAxis && topXAxis.label) && !hideXLabels ? 40 : hideXLabels ? 0 : 10,
          bottom: (bottomXAxis && bottomXAxis.label) && !hideXLabels ? 40 : hideXLabels ? 0 : 5,
        }}
      >
        <CartesianGrid vertical={false} stroke="#e8e8e8" />
        <XAxis
          dataKey="label"
          orientation="bottom"
          tickLine={false}
          axisLine={false}
          domain={['dataMin - 100', 'dataMax + 100']}
          hide={hideXLabels}
          interval={xTickInterval}
          label={{
            ...defaultAxisLabelStyle,
            offset: hideXTickLabels ? 0 : 25,
            value: bottomXAxis && bottomXAxis.label,
            position: 'bottom',
          }}
          tick={hideXTickLabels ? false : ({ x, y, payload: { value } }) => (
            <text
              x={x}
              y={y + 8}
              style={{ textAnchor: (chartType === 'area') ? 'start' : 'middle' }}
              dominantBaseline="hanging"
              fontFamily={SANS_SERIF_FONT}
            >
              {value}
            </text>
          )}
        />
        {leftYAxis && (
          <YAxis
            type="number"
            yAxisId="left"
            orientation="left"
            axisLine={false}
            tickLine={false}
            ticks={deriveTickValues(leftYAxis.ticks)}
            domain={['dataMin', 'dataMax']}
            hide={hideYLabels}
            label={{
              ...defaultAxisLabelStyle,
              offset: 20,
              angle: -90,
              value: leftYAxis.label,
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
        )}
        {rightYAxis && (
          <YAxis
            type="number"
            yAxisId="right"
            orientation="right"
            axisLine={false}
            tickLine={false}
            ticks={deriveTickValues(rightYAxis.ticks)}
            domain={['dataMin', 'dataMax']}
            hide={hideYLabels}
            label={{
              ...defaultAxisLabelStyle,
              offset: 20,
              angle: -90,
              value: rightYAxis.label,
              position: 'right',
            }}
            tick={({ x, y, payload: { value } }) => {
              const tickLabelValue = yTickLabelFormatter ? yTickLabelFormatter(value) : value;
              return (
                <text
                  x={x}
                  y={y - 8}
                  dominantBaseline="hanging"
                  fontFamily={SANS_SERIF_FONT}
                >
                  {tickLabelValue}
                </text>
              );
            }}
          />
        )}
        {!hideTooltip && (
          <Tooltip cursor={false} content={<CustomTooltip />} />
        )}
        {chartLines.map(({ key, color, yAxisId = 'left' }, idx) => {
          const defaultProps = {
            key: idx,
            yAxisId,
            dataKey: key,
            fill: (change >= 0 ? color : CHART_COLORS.RED),
            stroke: (change >= 0 ? color : CHART_COLORS.RED),
          };
          return (chartType === 'area') ? (
            <Area
              {...defaultProps}
              type="monotone"
              connectNulls={false}
              fillOpacity={chartLinesFillOpacity ? 0.05 : 0}
              strokeWidth={2}
              activeDot={(
                <CustomDot
                  fill={(change >= 0 ? color : CHART_COLORS.RED)}
                  stroke={(change >= 0 ? color : CHART_COLORS.RED)}
                />
              )}
            />
          ) : (
            <Bar
              {...defaultProps}
              fillOpacity={0.75}
              strokeWidth={1}
            >
              <LabelList
                dataKey={key}
                position="top"
                offset={10}
              />
            </Bar>
          );
        })}
        {legendPayloadAsReferenceLines && legendPayload.map(({ id, color }, idx) => {
          if (idx === 0) {
            return null;
          }
          return (
            <ReferenceLine
              yAxisId="left"
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
            wrapperStyle={{
              paddingTop: hideXTickLabels ? 20 : 50,
              bottom: 20,
            }}
            payload={legendPayload}
          />
        )}
      </ParentChart>
    </ResponsiveContainer>
  );
};

export default AppDynamicChart;
