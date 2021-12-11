/* eslint-disable camelcase */
import React from 'react';
import { ReactComponent as ArrowBack } from 'assets/RegisterPage/arrow_back.svg';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';
import * as UserServices from 'Services/UserServices/UserServices';
import { PublicRoutes } from 'Routes/RoutesEnum';
import { FirstStep } from 'components/UserRegister/FirstStep/FirstStep';
import { SecondStep } from 'components/UserRegister/SecondStep/SecondStep';
import { ThirdStep } from 'components/UserRegister/ThirdStep/ThirdStep';
import { updateUserValues } from 'store/actions/UserRegisterActions';
import { RootState } from 'store/reducers';
import { UserRegisterValues } from 'interfaces/UserRegister';
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
  const { url } = useRouteMatch();
  const dispatch = useDispatch();

  async function handleCreateUser() {
    try {
      await UserServices.createUser(userRegisterValues);

      history.push('/login');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error?.response.data.error === 'User with that email already exists'
          ? 'Email já cadastrado'
          : 'Falha ao realizar o cadastro',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
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
        dispatch(updateUserValues({ ...userRegisterValues, ...data }));
        handleCreateUser();
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
              type='button'
              onClick={() => handleBack()}
            >
              {' '}
              Voltar
            </button>
          )}
          <button type='submit' className='button'>
            {' '}
            {url.includes(PublicRoutes.REGISTER_PASSWORD)
              ? 'Finalizar'
              : 'Próxima etapa'}{' '}
          </button>
        </SubmitButtonContainer>
      </Container>
    </>
  );
}
