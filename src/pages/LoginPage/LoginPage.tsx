import { Login } from 'components/Login/Login';
import { RequestHttpType, useMutation } from 'hooks/useMutation';
import { AuthUser } from 'interfaces/AuthUser';
import { useDispatch } from 'react-redux';
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
  const { request: getMe, isLoading: getMeLoading } = useMutation<
    unknown,
    AuthUser
  >({
    path: SocialUsersApiRoutes.GET_ME,
    requestType: RequestHttpType.get,

    onComplete: (result) => {
      dispatch(insertUser({ ...result }));
      window.location.href = AuthRoutes.POSTS;
    },
    onError: (error) => {
      localStorage.removeItem('token');
      toast.error(
        backendErrorTranslate(error.response?.data?.message).translatedError,
        {
          position: 'top-right',
          autoClose: CONSTANTS.alertDefaultTime,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    },
  });
  const { request, isLoading } = useMutation<
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
      toast.error(
        backendErrorTranslate(error.response?.data?.message).translatedError,
        {
          position: 'top-right',
          autoClose: CONSTANTS.alertDefaultTime,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    },
  });

  return <Login handleLogin={request} isLoading={isLoading || getMeLoading} />;
};

export default LoginPage;
