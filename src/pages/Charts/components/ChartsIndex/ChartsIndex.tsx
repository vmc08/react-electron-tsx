import React from 'react';

import LoadableComponent from 'config/LoadableComponent';

import { useChartFilterContext } from 'contexts/ChartFilterContext';
import { CHART_INDICATORS } from 'utils/data/chartDataUtils';

const Lagging = LoadableComponent({
  componentPathName: 'pages/Charts/components/ChartsIndex/components/Lagging',
});

const Commercial = LoadableComponent({
  componentPathName: 'pages/Charts/components/ChartsIndex/components/Leading/Commercial',
});

const Domestic = LoadableComponent({
  componentPathName: 'pages/Charts/components/ChartsIndex/components/Leading/Domestic',
});

const FlattedFactories = LoadableComponent({
  componentPathName: 'pages/Charts/components/ChartsIndex/components/Leading/FlattedFactories',
});

const Hospitality = LoadableComponent({
  componentPathName: 'pages/Charts/components/ChartsIndex/components/Leading/Hospitality',
});

const Industrial = LoadableComponent({
  componentPathName: 'pages/Charts/components/ChartsIndex/components/Leading/Industrial',
});

const Office = LoadableComponent({
  componentPathName: 'pages/Charts/components/ChartsIndex/components/Leading/Office',
});

const Residential = LoadableComponent({
  componentPathName: 'pages/Charts/components/ChartsIndex/components/Leading/Residential',
});

const Retail = LoadableComponent({
  componentPathName: 'pages/Charts/components/ChartsIndex/components/Leading/Retail',
});

const Charts = () => {
  const { sector: { label }, indicator: { value } } = useChartFilterContext();
  const derivedSectorLabel = label.toLowerCase().split(' ').join('-');
  const chartComponents: {
    [key: string]: any,
  } = {
    lagging: Lagging,
    leading: {
      'commercial': Commercial,
      'domestic': Domestic,
      'flatted-factories': FlattedFactories,
      'hospitality': Hospitality,
      'industrial': Industrial,
      'office': Office,
      'residential': Residential,
      'retail': Retail,
    },
  };

  const ChartComponent = (value !== CHART_INDICATORS[0].value) ?
    chartComponents[value][derivedSectorLabel] :
    chartComponents[value];

  return (
    <ChartComponent />
  );
};

export default Charts;
