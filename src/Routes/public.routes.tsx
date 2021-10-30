import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import { UserRegisterPage } from '../pages/UserRegisterPage/UserRegisterPage';
import { PublicRoutes } from './RoutesEnum';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path={PublicRoutes.REGISTER} component={UserRegisterPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
