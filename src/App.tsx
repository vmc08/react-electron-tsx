import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './config/routes';
import FourOhFour from './pages/FourOhFour';

const App = () => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default App;
