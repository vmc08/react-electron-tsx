import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import routes from './config/routes';
import FourOhFour from './pages/FourOhFour';

import { UserProvider } from './contexts/UserContext';
import { SidenavProvider } from './contexts/SidenavContext';

const AppContextProviders = ({ children }: any) => (
  <UserProvider>
    <SidenavProvider>
      {children}
    </SidenavProvider>
  </UserProvider>
);

const App = () => {
  return (
    <AppContextProviders>
      <Switch>
        {routes.map(({ component: Component, exact, path, ...rest }) => (
          <Route
            key={path}
            path={path}
            exact={exact}
            render={(props: RouteComponentProps) => <Component {...props} {...rest} />}
          />
        ))}
        <Route component={FourOhFour} />
      </Switch>
    </AppContextProviders>
  );
};

export default App;
