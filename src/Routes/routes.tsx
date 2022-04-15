import { IndividualPostPage } from 'pages/IndividualPostPage/IndividualPostPage';
import { UserRegisterPage } from 'pages/UserRegisterPage/UserRegisterPage';
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from 'Routes/ProtectedRoute';
import { ApiErrorsListener } from '../components/DefaultComponents/ApiErrorsListener/ApiErrorsListener';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import { PostsPage } from '../pages/PostsPage/PostsPage';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';
import { AuthRoutes, PublicRoutes } from './RoutesEnum';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <ApiErrorsListener>
          <>
            <Route exact path='/' component={HomePage}>
              <Redirect to='/posts' />
            </Route>
            <Route path={PublicRoutes.LOGIN} component={LoginPage} />
            <Route path={PublicRoutes.REGISTER} component={UserRegisterPage} />
            <ProtectedRoute
              path={`${AuthRoutes.POST}/:postId`}
              component={IndividualPostPage}
            />
            <ProtectedRoute path={AuthRoutes.POSTS} component={PostsPage} />
            <ProtectedRoute
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
