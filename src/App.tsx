import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import routes from './config/routes';
import FourOhFour from './pages/FourOhFour';

import { SidenavProvider } from './contexts/SidenavContext';
import { QuizProvider } from './contexts/QuizContext';
import { IntervalProvider } from './contexts/IntervalContext';

const AppProviders = ({ children }: any) => (
  <SidenavProvider>
    <QuizProvider>
      <IntervalProvider>
        {children}
      </IntervalProvider>
    </QuizProvider>
  </SidenavProvider>
);

const App = () => {
  return (
    <AppProviders>
      <Switch>
        {routes.map(({ component: Component, exact, path, ...rest }) => (
          <Route
            key={path}
            path={path}
            exact={exact}
            render={(props: RouteComponentProps & any) => <Component {...props} {...rest} />}
          />
        ))}
        <Route component={FourOhFour} />
      </Switch>
    </AppProviders>
  );
};

export default App;
