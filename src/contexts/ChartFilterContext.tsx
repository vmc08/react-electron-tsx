import React, { createContext, useContext } from 'react';
import { DEFAULT_MARKET } from './MarketsContext';
import { CHART_INDICATORS, CHART_SECTORS } from '../utils/data/chartDataUtils';

const { marketCode } = DEFAULT_MARKET;

interface IValueType {
  label: string, value: string,
}

export interface IChartFilterContext {
  indicator: IValueType,
  sector: IValueType,
  setChartSector: (sector: IValueType) => void,
  setChartIndicator: (indicator: IValueType) => void,
}

const ChartFilterContext = createContext<IChartFilterContext>({
  sector: CHART_SECTORS[marketCode][0],
  indicator: CHART_INDICATORS[0],
  setChartSector: (sector: IValueType) => sector,
  setChartIndicator: (indicator: IValueType) => indicator,
});

class ChartFilterProvider extends React.Component<
  {}, { indicator: IValueType, sector: IValueType }
> {
  constructor(props: {}) {
    super(props);
    const defaultSector =
      localStorage.getItem('chart_sector') || JSON.stringify(CHART_SECTORS[marketCode][0]);
    const defaultIndicator =
      localStorage.getItem('chart_indicator') || JSON.stringify(CHART_INDICATORS[0]);
    this.state = {
      sector: JSON.parse(defaultSector),
      indicator: JSON.parse(defaultIndicator),
    };
    this.setChartSector = this.setChartSector.bind(this);
    this.setChartIndicator = this.setChartIndicator.bind(this);
  }

  setChartSector(sector: IValueType) {
    this.setState({ sector }, () => {
      localStorage.setItem('chart_sector', JSON.stringify(sector));
    });
  }

  setChartIndicator(indicator: IValueType) {
    this.setState({ indicator }, () => {
      localStorage.setItem('chart_indicator', JSON.stringify(indicator));
    });
  }

  render() {
    const { setChartSector, setChartIndicator, state } = this;
    return (
      <ChartFilterContext.Provider value={{ ...state, setChartSector, setChartIndicator }}>
        {this.props.children}
      </ChartFilterContext.Provider>
    );
  }
}

const ChartFilterConsumer = ChartFilterContext.Consumer;

const useChartFilterContext = () => useContext(ChartFilterContext);

export { ChartFilterProvider, ChartFilterConsumer, useChartFilterContext };

export default ChartFilterContext;
