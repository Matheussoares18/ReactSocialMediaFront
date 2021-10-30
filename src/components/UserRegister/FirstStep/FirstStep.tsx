import Input from '../../DefaultComponents/Input/Input';
import { DeepMap, FieldError, UseFormRegister } from 'react-hook-form';
import { FormsFields } from '../UserRegister';
import { UserRegisterValues } from '../../../interfaces/UserRegister';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';

interface FirstStepProps {
  register: UseFormRegister<Pick<FormsFields, 'name' | 'email'>>;
  errors: DeepMap<FormsFields, FieldError>;
}

export function FirstStep({ register, errors }: FirstStepProps) {
  const userRegisterValues: UserRegisterValues = useSelector(
    (state: RootState) => state.userRegisterValues.userRegisterValues
  );
  return (
    <>
      <Input
        label="Nome:"
        placeholder="Seu nome"
        defaultValue={userRegisterValues.name}
        hasError={!!errors?.name}
        {...register('name', {
          required: 'Este campo é obrigatório',
        })}
        errorMessage={errors?.name?.message}
      />
      <Input
        label="E-mail:"
        placeholder="Seu email"
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
    </>
  );
}
