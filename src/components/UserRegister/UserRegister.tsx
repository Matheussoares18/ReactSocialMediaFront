/* eslint-disable camelcase */
import { ReactComponent as ArrowBack } from 'assets/RegisterPage/arrow_back.svg';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';
import { PublicRoutes } from 'Routes/RoutesEnum';
import { SecondStep } from 'components/UserRegister/SecondStep/SecondStep';
import { ThirdStep } from 'components/UserRegister/ThirdStep/ThirdStep';
import { FirstStep } from 'components/UserRegister/FirstStep/FirstStep';
import { Container, Content } from './styles';

interface UserRegisterProps {
  handleCreateUser: (password: string) => Promise<void>;
  isLoading: boolean;
}
export interface FormsFields {
  name?: string;
  email?: string;
  birth_date?: string;
  gender?: string;
  phone?: string;
  password?: string;
  confirm_password?: string;
}

const UserRegister: React.FC<UserRegisterProps> = ({
  handleCreateUser,
  isLoading,
}) => {
  const history = useHistory();

  const { url } = useRouteMatch();

  return (
    <Container>
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
          />
          Voltar
        </button>
      </header>
      <Content>
        <h1>Cadastre-se</h1>
        <div className='inputs'>
          <Route path={`${url}${PublicRoutes.REGISTER_USER_INFOS}`}>
            <FirstStep />
          </Route>
          <Route path={`${url}${PublicRoutes.REGISTER_BIRTH_DATE}`}>
            <SecondStep />
          </Route>
          <Route path={`${url}${PublicRoutes.REGISTER_PASSWORD}`}>
            <ThirdStep
              isLoading={isLoading}
              handleCreateUser={handleCreateUser}
            />
          </Route>
        </div>
      </Content>
    </Container>
  );
};

export { UserRegister };
