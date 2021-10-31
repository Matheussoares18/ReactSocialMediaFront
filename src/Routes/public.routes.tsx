import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import { PostsPage } from '../pages/PostsPage/PostsPage';
import { UserRegisterPage } from '../pages/UserRegisterPage/UserRegisterPage';
import { AuthRoutes, PublicRoutes } from './RoutesEnum';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path={PublicRoutes.REGISTER} component={UserRegisterPage} />
        <Route path={AuthRoutes.POSTS} component={PostsPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
