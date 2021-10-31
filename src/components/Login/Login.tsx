import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { AuthRoutes, PublicRoutes } from '../../Routes/RoutesEnum';
import Input from '../DefaultComponents/Input/Input';
import * as AuthService from '../../Services/AuthServices/AuthServices';
import { ToastContainer, toast } from 'react-toastify';

import { Container, Content } from './styles';
import { useDispatch } from 'react-redux';
import { insertUser } from '../../store/actions/AuthUserAction';

interface LoginFormFields {
  email: string;
  password: string;
}

export function Login() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<LoginFormFields>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const dispatch = useDispatch();
  const history = useHistory();

  async function onSubmit(data: LoginFormFields) {
    const { email, password } = data;
    try {
      const result = await AuthService.authenticate({ email, password });
      console.log(result.data);
      dispatch(insertUser({ ...result.data }));
      localStorage.setItem('token', result.data.token);
      history.push(AuthRoutes.POSTS);
    } catch (error: any) {
      toast.error(
        error?.response.data.message === 'Invalid credentials'
          ? 'Credenciais inválidas'
          : 'Falha ao realizar operação',
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

  return (
    <Container>
      <ToastContainer />

      <Content onSubmit={handleSubmit(onSubmit)}>
        <h1>Social Media</h1>
        <div className="inputs">
          <Input
            label="E-mail ou usuário:"
            placeholder="Login"
            type="text"
            maxWidth="23.75rem"
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
            label="Senha"
            placeholder="Senha"
            type="password"
            maxWidth="23.75rem"
            hasError={!!errors?.password}
            {...register('password', {
              required: 'Este campo é obrigatório',
            })}
            errorMessage={errors?.password?.message}
          />
        </div>
        <button type="submit">Logar</button>
        <div className="link-container">
          <span>
            Ainda não possui conta?{' '}
            <Link
              className="register-link"
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
