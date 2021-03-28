import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import UserRegisterPage from '../pages/UserRegisterPage/UserRegisterPage';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register-page" component={UserRegisterPage} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default Routes;