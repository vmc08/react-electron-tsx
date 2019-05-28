import React from 'react';
import { Switch, Route } from 'react-router-dom';
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
  console.log(process.env);
  return (
    <AppContextProviders>
      <Switch>
        {routes.map(({ component: Component, exact, path, ...rest }) => (
          <Route
            key={path}
            path={path}
            exact={exact}
            render={(props) => <Component {...props} {...rest} />}
          />
        ))}
        <Route component={FourOhFour} />
      </Switch>
    </AppContextProviders>
  );
};

export default App;
