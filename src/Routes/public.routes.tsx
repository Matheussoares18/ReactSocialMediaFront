import React from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';

const Routes: React.FC = () => {
  return (
      <BrowserRouter>
        <div className="app-container">
            <Switch>
                <Route path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
            </Switch>
        </div>
      </BrowserRouter>
  )
}

export default Routes;