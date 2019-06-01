import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import routes from './config/routes';
import FourOhFour from './pages/FourOhFour';

import { SidenavProvider } from './contexts/SidenavContext';

const App = () => {
  return (
    <SidenavProvider>
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
    </SidenavProvider>
  );
};

export default App;
