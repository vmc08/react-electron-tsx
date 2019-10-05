import React, { createContext, useContext } from 'react';

interface IReitsContext {
  dataSource: any[],
}

const ReitsContext = createContext<IReitsContext>({
  dataSource: [],
});

class ReitsProvider extends React.Component<{ dataSource: any[] }> {
  render() {
    const { dataSource } = this.props;
    return (
      <ReitsContext.Provider value={{ dataSource }}>
        {this.props.children}
      </ReitsContext.Provider>
    );
  }
}

const ReitsConsumer = ReitsContext.Consumer;

const useReitsContextValue = () => useContext(ReitsContext);

export { ReitsProvider, ReitsConsumer, useReitsContextValue };

export default ReitsContext;
