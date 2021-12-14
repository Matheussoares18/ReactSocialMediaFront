/* eslint-disable camelcase */
import { ReactComponent as ArrowBack } from 'assets/RegisterPage/arrow_back.svg';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';
import { PublicRoutes } from 'Routes/RoutesEnum';
import { FirstStep } from 'components/UserRegister/FirstStep/FirstStep';
import { SecondStep } from 'components/UserRegister/SecondStep/SecondStep';
import { ThirdStep } from 'components/UserRegister/ThirdStep/ThirdStep';
import { updateUserValues } from 'store/actions/UserRegisterActions';
import { RootState } from 'store/reducers';
import { UserRegisterValues } from 'interfaces/UserRegister';
import { Button } from 'components/DefaultComponents/Button/Button';
import { RequestHttpType, useMutation } from 'hooks/useMutation';
import { ApiRoutes } from 'Services/ApiRoutes';
import { AuthUser } from 'interfaces/AuthUser';
import {
  BackendErrors,
  backendErrorTranslate,
} from 'utils/backendErrorTranslate';
import { CONSTANTS } from 'utils/constants';
import { Container, Content, SubmitButtonContainer } from './styles';

export interface FormsFields {
  name?: string;
  email?: string;
  birth_date?: string;
  gender?: string;
  phone?: string;
  password?: string;
  confirm_password?: string;
}

export function UserRegister(): JSX.Element {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormsFields>({ mode: 'onSubmit', reValidateMode: 'onChange' });
  const history = useHistory();
  const userRegisterValues: UserRegisterValues = useSelector(
    (state: RootState) => state.userRegisterValues.userRegisterValues
  );
  const { request, isLoading } = useMutation<UserRegisterValues, AuthUser>({
    path: `${ApiRoutes.USERS}`,
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
      history.push('/login');
    },
    onError: (error) => {
      const errorType = backendErrorTranslate(error.response?.data.message);
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
  const { url } = useRouteMatch();
  const dispatch = useDispatch();

  async function handleCreateUser(data: FormsFields) {
    await request({
      birth_date: userRegisterValues.birth_date,
      email: userRegisterValues.email,
      gender: userRegisterValues.gender,
      name: userRegisterValues.name,
      password: data.password as string,
      phone: userRegisterValues.phone,
    });
  }

  const routesGuideTranslate = {
    [`${PublicRoutes.REGISTER}${PublicRoutes.REGISTER_USER_INFOS}`]: {
      forward: (data: FormsFields) => {
        dispatch(updateUserValues({ ...userRegisterValues, ...data }));
        history.push(
          `${PublicRoutes.REGISTER}${PublicRoutes.REGISTER_BIRTH_DATE}`
        );
      },
    },
    [`${PublicRoutes.REGISTER}${PublicRoutes.REGISTER_BIRTH_DATE}`]: {
      forward: (data: FormsFields) => {
        dispatch(updateUserValues({ ...userRegisterValues, ...data }));
        history.push(
          `${PublicRoutes.REGISTER}${PublicRoutes.REGISTER_PASSWORD}`
        );
      },
    },
    [`${PublicRoutes.REGISTER}${PublicRoutes.REGISTER_PASSWORD}`]: {
      forward: (data: FormsFields) => {
        dispatch(
          updateUserValues({
            ...userRegisterValues,
            ...data,
            password: data.password as string,
          })
        );

        handleCreateUser(data);
      },
    },
  };

  function handleBack() {
    history.goBack();
  }
  function handleSubmitCustom(data: FormsFields) {
    routesGuideTranslate[window.location.pathname].forward(data);
  }

  return (
    <>
      <ToastContainer />
      <Container onSubmit={handleSubmit(handleSubmitCustom)}>
        <header>
          <button
            style={{
              visibility: window.location.pathname.includes(
                PublicRoutes.REGISTER_USER_INFOS
              )
                ? 'visible'
                : 'hidden',
            }}
            type='button'
            onClick={() => history.push(PublicRoutes.LOGIN)}
          >
            <ArrowBack
              className='arrow-back'
              style={{
                visibility: window.location.pathname.includes(
                  PublicRoutes.REGISTER_USER_INFOS
                )
                  ? 'visible'
                  : 'hidden',
              }}
            />{' '}
            Voltar
          </button>
        </header>
        <Content>
          <h1>Cadastre-se</h1>

          <div className='inputs'>
            <Route path={`${url}${PublicRoutes.REGISTER_USER_INFOS}`}>
              <FirstStep register={register} errors={errors} />
            </Route>
            <Route path={`${url}${PublicRoutes.REGISTER_BIRTH_DATE}`}>
              <SecondStep register={register} errors={errors} />
            </Route>
            <Route path={`${url}${PublicRoutes.REGISTER_PASSWORD}`}>
              <ThirdStep
                getValues={getValues}
                register={register}
                errors={errors}
              />
            </Route>
          </div>
        </Content>
        <SubmitButtonContainer>
          {!window.location.pathname.includes(
            PublicRoutes.REGISTER_USER_INFOS
          ) && (
            <button
              className='back-button'
              disabled={isLoading}
              type='button'
              onClick={handleBack}
            >
              Voltar
            </button>
          )}
          <Button
            loading={isLoading}
            disabled={isLoading}
            type='submit'
            className='button'
          >
            {url.includes(PublicRoutes.REGISTER_PASSWORD)
              ? 'Finalizar'
              : 'Próxima etapa'}
          </Button>
        </SubmitButtonContainer>
      </Container>
    </>
  );
}
