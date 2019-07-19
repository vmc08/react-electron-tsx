import React, { createContext, useContext } from 'react';

const DEFAULT_INTERVAL = 'W';

export interface IMarketsContext {
  setDashboardInterval: (interval: string) => void,
  interval: string,
}

const IntervalContext = createContext<IMarketsContext>({
  setDashboardInterval: (interval: string) => interval,
  interval: DEFAULT_INTERVAL,
});

class IntervalProvider extends React.Component<{}, { interval: string }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      interval: sessionStorage.getItem('dashboard_interval') || DEFAULT_INTERVAL,
    };
    this.setDashboardInterval = this.setDashboardInterval.bind(this);
  }

  setDashboardInterval(interval: string) {
    this.setState({ interval }, () => {
      sessionStorage.setItem('dashboard_interval', interval);
    });
  }

  render() {
    const { setDashboardInterval, state } = this;
    const { interval } = state;
    return (
      <IntervalContext.Provider value={{ interval, setDashboardInterval }}>
        {this.props.children}
      </IntervalContext.Provider>
    );
  }
}

const IntervalConsumer = IntervalContext.Consumer;

const useIntervalContext = () => useContext(IntervalContext);

export { IntervalProvider, IntervalConsumer, useIntervalContext };

export default IntervalContext;
