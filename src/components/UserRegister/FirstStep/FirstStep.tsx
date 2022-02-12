import React from 'react';
import { useRegisterInfos } from 'hooks/useRegisterInfos';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { PublicRoutes } from 'Routes/RoutesEnum';
import { Button } from 'components/DefaultComponents/Button/Button';
import { updateUserValues } from 'store/actions/UserRegisterActions';
import { useHistory } from 'react-router-dom';
import Input from 'components/DefaultComponents/Input/Input';
import { Form, SubmitButtonContainer } from 'components/UserRegister/styles';

interface FormFields {
  name: string;
  email: string;
}

const FirstStep: React.FC = () => {
  const userRegisterValues = useRegisterInfos();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ mode: 'onSubmit', reValidateMode: 'onChange' });

  const handleOnSubmit = (data: FormFields) => {
    dispatch(updateUserValues({ ...userRegisterValues, ...data }));
    history.push(`${PublicRoutes.REGISTER}${PublicRoutes.REGISTER_BIRTH_DATE}`);
  };
  return (
    <Form onSubmit={handleSubmit(handleOnSubmit)}>
      <Input
        label='Nome:'
        placeholder='Seu nome'
        defaultValue={userRegisterValues.name}
        hasError={!!errors?.name}
        {...register('name', {
          required: 'Este campo é obrigatório',
        })}
        errorMessage={errors?.name?.message}
      />
      <Input
        label='E-mail:'
        placeholder='Seu email'
        defaultValue={userRegisterValues.email}
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
      <SubmitButtonContainer>
        <Button
          loading={false}
          disabled={false}
          type='submit'
          className='button'
        >
          Próxima etapa(1/3)
        </Button>
      </SubmitButtonContainer>
    </Form>
  );
};

export { FirstStep };
