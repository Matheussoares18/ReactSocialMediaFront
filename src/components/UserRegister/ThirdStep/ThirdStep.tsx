/* eslint-disable camelcase */
import { Button } from 'components/DefaultComponents/Button/Button';
import { useRegisterInfos } from 'hooks/useRegisterInfos';
import { Form, SubmitButtonContainer } from 'components/UserRegister/styles';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateUserValues } from 'store/actions/UserRegisterActions';
import Input from '../../DefaultComponents/Input/Input';

interface ThirdStepProps {
  handleCreateUser: () => Promise<void>;
  isLoading: boolean;
}
interface FormFields {
  password: string;
  // eslint-disable-next-line camelcase
  confirm_password: string;
}

const ThirdStep: React.FC<ThirdStepProps> = ({
  handleCreateUser,
  isLoading,
}) => {
  const userRegisterValues = useRegisterInfos();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormFields>({ mode: 'onSubmit', reValidateMode: 'onChange' });

  const handleOnSubmit = async (data: FormFields) => {
    dispatch(
      updateUserValues({
        ...userRegisterValues,
        ...data,
        password: data.password as string,
      })
    );
    await handleCreateUser();
  };
  return (
    <Form onSubmit={handleSubmit(handleOnSubmit)}>
      <Input
        label='Senha:'
        placeholder='Senha'
        type='password'
        hasError={!!errors?.password}
        {...register('password', {
          required: 'Este campo é obrigatório',
        })}
        errorMessage={errors?.password?.message}
      />
      <Input
        label='Confirme a senha'
        placeholder='Confirme a senha'
        type='password'
        hasError={!!errors?.confirm_password}
        errorMessage={errors?.confirm_password?.message}
        {...register('confirm_password', {
          required: 'Campo obrigatório',
          validate: {
            matchPasswords: (confirmPass) => {
              if (getValues('password') === confirmPass) {
                return true;
              }
              return 'As senhas não coincidem. Tente novamente!';
            },
          },
        })}
      />
      <SubmitButtonContainer>
        <Button
          loading={false}
          className='back-button'
          disabled={isLoading}
          type='button'
          onClick={() => history.goBack()}
        >
          Voltar
        </Button>

        <Button
          loading={isLoading}
          disabled={isLoading}
          type='submit'
          className='button'
        >
          Concluir(3/3)
        </Button>
      </SubmitButtonContainer>
    </Form>
  );
};

export default ThirdStep;
