import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthRoutes, PublicRoutes } from 'Routes/RoutesEnum';
import Input from 'components/DefaultComponents/Input/Input';

import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { insertUser } from 'store/actions/AuthUserAction';
import { RequestHttpType, useMutation } from 'hooks/useMutation';
import { AuthApiRoutes } from 'Services/ApiRoutes';
import { AuthUser } from 'interfaces/AuthUser';
import { backendErrorTranslate } from 'utils/backendErrorTranslate';
import { Button } from 'components/DefaultComponents/Button/Button';
import { CONSTANTS } from 'utils/constants';
import { Container, Content } from './styles';

interface LoginFormFields {
  email: string;
  password: string;
}

export function Login(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const dispatch = useDispatch();
  const { request, isLoading } = useMutation<LoginFormFields, AuthUser>({
    path: AuthApiRoutes.AUTHENTICATE,
    requestType: RequestHttpType.post,
    onComplete: (result) => {
      dispatch(insertUser({ ...result }));
      localStorage.setItem('token', result?.token as string);
      window.location.href = AuthRoutes.POSTS;
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

  async function onSubmit(data: LoginFormFields) {
    const { email, password } = data;

    await request({ email, password });
  }

  return (
    <Container>
      <Content onSubmit={handleSubmit(onSubmit)}>
        <h1>Social Media</h1>
        <div className='inputs'>
          <Input
            label='E-mail ou usuário:'
            placeholder='Login'
            type='text'
            maxWidth='23.75rem'
            hasError={!!errors?.email}
            errorMessage={errors?.email?.message}
            {...register('email', {
              required: 'Este campo é obrigatório',
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Email inválido',
              },
            })}
          />
          <Input
            label='Senha'
            placeholder='Senha'
            type='password'
            maxWidth='23.75rem'
            hasError={!!errors?.password}
            {...register('password', {
              required: 'Este campo é obrigatório',
            })}
            errorMessage={errors?.password?.message}
          />
        </div>
        <Button
          type='submit'
          className='submit-button'
          loading={isLoading}
          disabled={isLoading}
        >
          Logar
        </Button>
        <div className='link-container'>
          <span>
            Ainda não possui conta?{' '}
            <Link
              className='register-link'
              to={`${PublicRoutes.REGISTER}${PublicRoutes.REGISTER_USER_INFOS}`}
            >
              Cadastre-se
            </Link>{' '}
          </span>
        </div>
      </Content>
    </Container>
  );
}
