import React, { useEffect, useState } from 'react';
import { Container, Header, Main } from './styles';
import { IoArrowBackOutline } from 'react-icons/all'
import { useForm } from 'react-hook-form';
import cep from 'cep-promise'
import api from '../../api';
import { AxiosResponse } from 'axios';

interface FormsInputs {
  name: string
  email: string
  document: string
  birth_date: string
  gender: string
  zip_code: string
  phone: string
  password: string
}
interface CepPromiseType {
  state: string,
  city: string,
  street: string,
  neighborhood: string,
}
const UserRegister: React.FC = () => {
  const { register, errors, handleSubmit } = useForm<FormsInputs>()
  const [foundZipCode, setFoundZipCode] = useState<CepPromiseType>()

  const getCep = async (zip_code: string) => {
    try {
      cep(zip_code).then((response: any) => {
        setFoundZipCode(response)

      })

    } catch (error) {
      console.log('CEP não encontrado')
    }
  }
  useEffect(() => {
    console.log(foundZipCode)
  }, [foundZipCode])
  const onSubmit = async (data: FormsInputs) => {

    api.post('/user-register', {
      name: data.name,
      email: data.email,
      birth_date: data.birth_date,
      document: data.document,
      gender: data.gender,
      image: 'image',
      password: data.password,
      address_title: 'Principal',
      zip_code: data.zip_code,
      country: 'BR',
      state: foundZipCode?.state,
      city: foundZipCode?.city,
      neighborhood: foundZipCode?.neighborhood,
      contact_name: 'Principal',
      phone: data.phone
    }).then((response: AxiosResponse<any>) => {
      alert('criado com sucesso')
      console.log(response)
    }).catch((err: any) => { console.log(err) })
  }
  return (
    <Container>
      <Header>
        <IoArrowBackOutline /> <span>Voltar</span>
      </Header>
      <Main>

        <div className="inputs-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="">Nome</label><input type="text" name="name" ref={register({ required: true })} />
            <label htmlFor="">Email</label><input type="email" name="email" ref={register({ required: true })} />
            <label htmlFor="">Documento</label><input type="text" name="document" ref={register({ required: true })} />
            <label htmlFor="">Senha</label><input type="password" name="password" ref={register({ required: true })} />
            <label htmlFor="">Data de nascimento</label><input type="date" name="birth_date" ref={register({ required: true })} />
            <label htmlFor="">Genero</label> <span>Masculino</span> <input type="radio" name="gender" value="M" ref={register({ required: true })} /> <span>Feminino</span><input type="radio" name="gender" ref={register({ required: true })} />
            <label>Cep</label><input type="text" name="zip_code" ref={register({ required: true })} onChange={(e) => getCep(e.target.value)} />
            <label>Estado</label><input type="text" disabled={true} value={foundZipCode?.state} ref={register({ required: false })} name="state" />
            <label>Cidade</label><input type="text" disabled={true} value={foundZipCode?.city} ref={register({ required: false })} name="city" />
            <label>Rua</label><input type="text" disabled={true} value={foundZipCode?.street} ref={register({ required: false })} name="street" />
            <label>Bairro</label><input type="text" disabled={true} value={foundZipCode?.neighborhood} ref={register({ required: false })} name="neighborhood" />
            <label>Telefone</label><input type="text" name="phone" ref={register({ required: true })} />
            <button type="submit">Cadastrar</button>
          </form>
        </div>


      </Main>
    </Container>
  )
}

export default UserRegister;