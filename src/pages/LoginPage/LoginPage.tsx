import { Login } from 'components/Login/Login';
import { RequestHttpType, useMutation } from 'hooks/useMutation';
import { AuthUser } from 'interfaces/AuthUser';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthRoutes } from 'Routes/RoutesEnum';
import { AuthApiRoutes, SocialUsersApiRoutes } from 'Services/ApiRoutes';
import { insertUser } from 'store/actions/AuthUserAction';
import { backendErrorTranslate } from 'utils/backendErrorTranslate';
import { CONSTANTS } from 'utils/constants';

interface LoginFormFields {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);

  const location = useLocation<{ from: { pathname: string } }>();
  const handleError = (errorMessage?: string) => {
    toast.error(backendErrorTranslate(errorMessage).translatedError, {
      position: 'top-right',
      autoClose: CONSTANTS.alertDefaultTime,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const handleCreateUser = async (data: LoginFormFields): Promise<void> => {
    setIsloading(true);
    request(data);
  };
  const { request: getMe } = useMutation<unknown, AuthUser>({
    path: SocialUsersApiRoutes.GET_ME,
    requestType: RequestHttpType.get,

    onComplete: (result) => {
      const token = localStorage.getItem('token') ?? '';
      setIsloading(false);
      dispatch(insertUser({ ...result, token }));

      let redirectTo: string = AuthRoutes.POSTS;
      if (location.state?.from.pathname) {
        redirectTo = location.state?.from.pathname;
      }
      window.location.href = redirectTo;
    },
    onError: (error) => {
      setIsloading(false);
      localStorage.removeItem('token');
      handleError(error.response?.data?.message);
    },
  });
  const { request } = useMutation<
    LoginFormFields,
    { email: string; token: string }
  >({
    path: AuthApiRoutes.AUTHENTICATE,
    requestType: RequestHttpType.post,
    onComplete: (result) => {
      localStorage.setItem('token', result.token);
      getMe(
        {
          params: {
            email: result.email,
          },
        },
        {
          headers: {
            authorization: result.token,
          },
        }
      );
    },
    onError: (error) => {
      setIsloading(false);
      handleError(error.response?.data?.message);
    },
  });

  return <Login handleLogin={handleCreateUser} isLoading={isLoading} />;
};

export default LoginPage;
