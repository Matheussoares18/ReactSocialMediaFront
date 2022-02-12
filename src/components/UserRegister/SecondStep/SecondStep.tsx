/* eslint-disable camelcase */
import { Button } from 'components/DefaultComponents/Button/Button';
import { useRegisterInfos } from 'hooks/useRegisterInfos';
import { Form, SubmitButtonContainer } from 'components/UserRegister/styles';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PublicRoutes } from 'Routes/RoutesEnum';
import { updateUserValues } from '../../../store/actions/UserRegisterActions';
import { phoneNumber } from '../../../utils/masks';
import Input from '../../DefaultComponents/Input/Input';
import Select from '../../DefaultComponents/Select/Select';

interface FormFields {
  phone: string;
  birth_date: string;
  gender: string;
}

const SecondStep: React.FC = () => {
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
    history.push(`${PublicRoutes.REGISTER}${PublicRoutes.REGISTER_PASSWORD}`);
  };

  return (
    <Form onSubmit={handleSubmit(handleOnSubmit)}>
      <Input
        label='Celular:'
        placeholder='(DD) 99999-9999'
        hasError={!!errors?.phone}
        value={userRegisterValues.phone}
        onInput={(e) =>
          dispatch(
            updateUserValues({
              ...userRegisterValues,
              phone: phoneNumber(e.currentTarget.value),
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
      <div className='input-row'>
        <Input
          label='Data de nascimento:'
          placeholder='DD/MM/AAAA'
          type='date'
          hasError={!!errors?.birth_date}
          defaultValue={userRegisterValues.birth_date}
          {...register('birth_date', {
            required: 'Este campo é obrigatório',
          })}
          errorMessage={errors?.birth_date?.message}
        />
        <Select
          label='Gênero'
          errorMessage={errors?.gender?.message}
          hasError={!!errors?.gender}
          options={[
            { label: 'M', value: 'M' },
            { label: 'F', value: 'F' },
          ]}
          {...register('gender', {
            required: 'Este campo é obrigatório',
          })}
          placeholder='Selecione'
          maxWidth='100px'
        />
      </div>
      <SubmitButtonContainer>
        <Button
          loading={false}
          className='back-button'
          type='button'
          onClick={() => history.goBack()}
        >
          Voltar
        </Button>

        <Button loading={false} type='submit' className='button'>
          Próxima etapa(2/3)
        </Button>
      </SubmitButtonContainer>
    </Form>
  );
};

export { SecondStep };
