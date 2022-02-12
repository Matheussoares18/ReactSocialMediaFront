import UserRegister from 'components/UserRegister/UserRegister';
import { RequestHttpType, useMutation } from 'hooks/useMutation';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateUserValues } from 'store/actions/UserRegisterActions';
import { AuthApiRoutes, SocialUsersApiRoutes } from 'Services/ApiRoutes';
import { UserRegisterValues } from 'interfaces/UserRegister';
import { AuthUser } from 'interfaces/AuthUser';
import {
  BackendErrors,
  backendErrorTranslate,
} from 'utils/backendErrorTranslate';
import { toast } from 'react-toastify';
import { CONSTANTS } from 'utils/constants';
import { PublicRoutes } from 'Routes/RoutesEnum';
import { useRegisterInfos } from 'hooks/useRegisterInfos';

const UserRegisterPage: React.FC = () => {
  const userRegisterValues = useRegisterInfos();

  const dispatch = useDispatch();
  const history = useHistory();

  const handleCreateUser = async () => {
    request(userRegisterValues);
  };

  const { request, isLoading } = useMutation<UserRegisterValues, AuthUser>({
    path: `${SocialUsersApiRoutes.USERS}`,
    requestType: RequestHttpType.post,
    onComplete: () => {
      dispatch(
        updateUserValues({
          birth_date: '',
          email: '',
          gender: '',
          name: '',
          phone: '',
          password: '',
        })
      );
      toast.success('Cadastro realizado com sucesso!', {
        position: 'top-right',
        autoClose: CONSTANTS.alertDefaultTime,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      history.push('/login');
    },
    onError: (error) => {
      const errorType = backendErrorTranslate(error.response?.data.error);
      toast.error(errorType.translatedError, {
        position: 'top-right',
        autoClose: CONSTANTS.alertDefaultTime,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      if (errorType.errorType === BackendErrors.EMAIL_ALREADY_EXISTS) {
        history.push(
          `${PublicRoutes.REGISTER}${PublicRoutes.REGISTER_USER_INFOS}`
        );
      }
    },
  });
  return (
    <UserRegister handleCreateUser={handleCreateUser} isLoading={isLoading} />
  );
};

export { UserRegisterPage };
