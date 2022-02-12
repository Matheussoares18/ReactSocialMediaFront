import { UserRegisterPage } from 'pages/UserRegisterPage/UserRegisterPage';
import React from 'react';
import { useSelector } from 'react-redux';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ApiErrorsListener } from '../components/DefaultComponents/ApiErrorsListener/ApiErrorsListener';
import { AuthUser } from '../interfaces/AuthUser';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import { PostsPage } from '../pages/PostsPage/PostsPage';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';
import { RootState } from '../store/reducers';
import { AuthRoutes, PublicRoutes } from './RoutesEnum';

const Routes: React.FC = () => {
  const authUser: AuthUser | undefined = useSelector(
    (state: RootState) => state.authUser.authUser
  );
  return (
    <BrowserRouter>
      <Switch>
        <ApiErrorsListener>
          <>
            <Route exact path='/' component={HomePage}>
              <Redirect to='/posts' />
            </Route>
            <Route path='/login' component={LoginPage} />
            <Route path={PublicRoutes.REGISTER} component={UserRegisterPage} />
            <Route path={AuthRoutes.POSTS} component={PostsPage}>
              {!authUser && <Redirect to='/login' />}
            </Route>
            <Route
              path={`${PublicRoutes.PROFILE}/:id`}
              component={ProfilePage}
            />
          </>
        </ApiErrorsListener>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
