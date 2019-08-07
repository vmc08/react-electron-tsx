import React from 'react';
import { Switch, Route, RouteComponentProps, Redirect } from 'react-router-dom';
import routes from './config/routes';
import FourOhFour from './pages/FourOhFour';

import { SidenavProvider } from './contexts/SidenavContext';
import { QuizProvider } from './contexts/QuizContext';
import { IntervalProvider } from './contexts/IntervalContext';
import { MarketsProvider } from './contexts/MarketsContext';

const AppProviders = ({ children }: { children: any }) => (
  <SidenavProvider>
    <QuizProvider>
      <IntervalProvider>
        <MarketsProvider>
          {children}
        </MarketsProvider>
      </IntervalProvider>
    </QuizProvider>
  </SidenavProvider>
);

const App = () => {
  return (
    <AppProviders>
      <Switch>
        {routes.map(({ component: Component, path, ...rest }) => (
          <Route
            key={path}
            path={path}
            render={(props: RouteComponentProps & any) => <Component {...props} {...rest} />}
          />
        ))}
        <Redirect exact from="/" to="/dashboard"/>
        <Route component={FourOhFour} />
      </Switch>
    </AppProviders>
  );
};

export default App;
