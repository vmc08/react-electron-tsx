import React from 'react';

import LoadableComponent from '../../../config/LoadableComponent';

import { useChartFilterContext } from '../../../contexts/ChartFilterContext';
import { CHART_INDICATORS } from '../../../utils/data/chartDataUtils';

const Lagging = LoadableComponent({
  componentPathName: 'components/pages/charts/lagging',
});

const Commercial = LoadableComponent({
  componentPathName: 'components/pages/charts/leading/commercial',
});

const Domestic = LoadableComponent({
  componentPathName: 'components/pages/charts/leading/domestic',
});

const FlattedFactories = LoadableComponent({
  componentPathName: 'components/pages/charts/leading/flatted-factories',
});

const Hospitality = LoadableComponent({
  componentPathName: 'components/pages/charts/leading/hospitality',
});

const Industrial = LoadableComponent({
  componentPathName: 'components/pages/charts/leading/industrial',
});

const Office = LoadableComponent({
  componentPathName: 'components/pages/charts/leading/office',
});

const Residential = LoadableComponent({
  componentPathName: 'components/pages/charts/leading/residential',
});

const Retail = LoadableComponent({
  componentPathName: 'components/pages/charts/leading/retail',
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
