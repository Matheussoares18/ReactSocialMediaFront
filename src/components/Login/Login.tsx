import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { PublicRoutes } from 'Routes/RoutesEnum';
import Input from 'components/DefaultComponents/Input/Input';
import { Button } from 'components/DefaultComponents/Button/Button';
import { Container, Content } from './styles';

interface LoginProps {
  handleLogin: (data: { email: string; password: string }) => Promise<void>;
  isLoading: boolean;
}

interface LoginFormFields {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ handleLogin, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const handleOnSubmit = (data: LoginFormFields) => {
    handleLogin(data);
  };
  return (
    <Container>
      <Content onSubmit={handleSubmit(handleOnSubmit)}>
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
};

export { Login };
