/* eslint-disable consistent-return */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { config } from 'config';
import { AuthUser } from 'interfaces/AuthUser';
import { PublicRoutes } from 'Routes/RoutesEnum';
import api from 'Services/api';
import { insertUser, logout } from 'store/actions/AuthUserAction';
import { RootState } from 'store/reducers';
import axios from 'axios';

interface ApiErrorsListenerProps {
  children?: React.ReactElement;
}

export function ApiErrorsListener({
  children,
}: ApiErrorsListenerProps): React.ReactElement {
  const authUser: AuthUser | undefined = useSelector(
    (state: RootState) => state.authUser.authUser
  );
  const history = useHistory();
  const dispatch = useDispatch();

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error && error.response) {
        if (error?.response?.status === 401 && !authUser?.refreshToken) {
          dispatch(logout());
          history.push(PublicRoutes.LOGIN);
        } else if (error?.response?.status === 401 && authUser?.token) {
          try {
            const result = await fetch(`${config.host}/auth/refresh-token`, {
              method: 'POST',
              headers: {
                'Access-Control-Allow-Methods':
                  'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                refresh_token: authUser.refreshToken as string,
              },
            });
            const { token: newToken, refreshToken: newRefreshtoken } =
              await result.json();
            dispatch(
              insertUser({
                ...authUser,
                token: newToken,
                refreshToken: newRefreshtoken,
              })
            );

            const { url, data, method, headers } = error.config;

            headers.authorization = newToken;
            try {
              const res = await axios.request({
                baseURL: `${config.host}${url}`,
                method,
                headers,
                data,
              });

              return Promise.resolve(res);
            } catch {
              dispatch(logout());
              history.push(PublicRoutes.LOGIN);
            }

            return await Promise.resolve();
          } catch {
            dispatch(logout());
            history.push(PublicRoutes.LOGIN);
          }
        }
      }

      return Promise.reject(error);
    }
  );
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
