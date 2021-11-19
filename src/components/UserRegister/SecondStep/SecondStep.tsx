import React from 'react';
import { DeepMap, FieldError, UseFormRegister } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { UserRegisterValues } from '../../../interfaces/UserRegister';
import { updateUserValues } from '../../../store/actions/UserRegisterActions';
import { RootState } from '../../../store/reducers';
import { phoneNumber } from '../../../utils/masks';
import Input from '../../DefaultComponents/Input/Input';
import Select from '../../DefaultComponents/Select/Select';
import { FormsFields } from '../UserRegister';

interface SecondStepProps {
  register: UseFormRegister<FormsFields>;
  errors?: DeepMap<FormsFields, FieldError>;
}

export function SecondStep({ register, errors }: SecondStepProps) {
  const userRegisterValues: UserRegisterValues = useSelector(
    (state: RootState) => state.userRegisterValues.userRegisterValues
  );
  const dispatch = useDispatch();

  return (
    <>
      <Input
        label="Celular:"
        placeholder="(DD) 99999-9999"
        hasError={!!errors?.phone}
        value={
          userRegisterValues.phone.length > 0
            ? phoneNumber(userRegisterValues.phone)
            : ''
        }
        onInput={(e) =>
          dispatch(
            updateUserValues({
              ...userRegisterValues,
              phone: e.currentTarget.value,
            })
          )
        }
        {...register('phone', {
          required: 'Este campo é obrigatório',
          minLength: {
            value: 15,
            message: 'Telefone inválido ex: (00) 0000-0000',
          },
        })}
        errorMessage={errors?.phone?.message}
      />
      <div className="input-row">
        <Input
          label="Data de nascimento:"
          placeholder="DD/MM/AAAA"
          type="date"
          hasError={!!errors?.birth_date}
          defaultValue={userRegisterValues.birthDate}
          {...register('birth_date', {
            required: 'Este campo é obrigatório',
          })}
          errorMessage={errors?.birth_date?.message}
        />
        <Select
          label="Gênero"
          errorMessage={errors?.gender?.message}
          hasError={!!errors?.gender}
          options={[
            { label: 'M', value: 'M' },
            { label: 'F', value: 'F' },
          ]}
          {...register('gender', {
            required: 'Este campo é obrigatório',
          })}
          placeholder="Selecione"
          maxWidth="100px"
        />
      </div>
    </>
  );
}
