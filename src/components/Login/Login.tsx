import React from 'react';
import { Link } from 'react-router-dom';
import { PublicRoutes } from '../../Routes/RoutesEnum';
import Input from '../DefaultComponents/Input/Input';

import { Container, Content } from './styles';

export function Login() {
  return (
    <Container>
      <Content>
        <h1>Social Media</h1>
        <div className="inputs">
          <Input
            label="E-mail ou usuário:"
            placeholder="Login"
            type="text"
            hasError={false}
            maxWidth="23.75rem"
            errorMessage="Campo obrigatório"
          />
          <Input
            label="Senha"
            placeholder="Senha"
            type="text"
            hasError={false}
            maxWidth="23.75rem"
            errorMessage="Campo obrigatório"
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
