import {
  DeepMap,
  FieldError,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';
import Input from '../../DefaultComponents/Input/Input';
import { FormsFields } from '../UserRegister';

interface ThirdStepProps {
  register: UseFormRegister<FormsFields>;
  errors?: DeepMap<FormsFields, FieldError>;
  getValues: UseFormGetValues<FormsFields>;
}

export function ThirdStep({ register, errors, getValues }: ThirdStepProps) {
  return (
    <>
      <Input
        label="Senha:"
        placeholder="Senha"
        type="password"
        hasError={!!errors?.password}
        {...register('password', {
          required: 'Este campo é obrigatório',
        })}
        errorMessage={errors?.password?.message}
      />
      <Input
        label="Confirme a senha"
        placeholder="Confirme a senha"
        type="password"
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
    </>
  );
}
