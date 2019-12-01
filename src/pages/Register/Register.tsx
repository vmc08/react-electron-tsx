import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RequireAuth from '../../HOC/RequireAuth';
import LoadableComponent from '../../config/LoadableComponent';

const FreeAndTrial = LoadableComponent({
  componentPathName: 'pages/Register/pages/FreeAndTrial',
});

const Verification = LoadableComponent({
  componentPathName: 'pages/Register/pages/Verification',
});

const Quiz = LoadableComponent({
  componentPathName: 'pages/Register/pages/Quiz',
});

const Welcome = LoadableComponent({
  componentPathName: 'pages/Register/pages/Welcome',
});

const FourOhFour = LoadableComponent({
  componentPathName: 'pages/FourOhFour',
});

FreeAndTrial.preload();

const Register = () => {
  return (
    <Switch>
      <Route exact path="/register/user" component={RequireAuth(FreeAndTrial, false)} />
      <Route path="/register/trial/:affiliateId" component={RequireAuth(FreeAndTrial, false)} />
      <Route path="/register/verify-email" component={RequireAuth(Verification)} />
      <Route path="/register/quiz" component={RequireAuth(Quiz)} />
      <Route path="/register/welcome" component={RequireAuth(Welcome)} />
      <Route component={FourOhFour} />
    </Switch>
  );
};

export default Register;
