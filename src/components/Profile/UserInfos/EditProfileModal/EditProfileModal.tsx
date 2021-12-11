/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import { GrClose } from 'react-icons/gr';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { RequestHttpType, useMutation } from '../../../../hooks/useMutation';
import { AuthUser } from '../../../../interfaces/AuthUser';
import { Post } from '../../../../interfaces/Posts';
import { ApiRoutes } from '../../../../Services/ApiRoutes';
import { insertUser } from '../../../../store/actions/AuthUserAction';
import { RootState } from '../../../../store/reducers';
import { getBase64 } from '../../../../utils/imageToBase54';
import Input from '../../../DefaultComponents/Input/Input';
import { Spinner } from '../../../DefaultComponents/Spinner/Spinner';
import { UserPicture } from '../../../DefaultComponents/UserPicture/UserPicture';
import {
  BiographInputContainer,
  InputFile,
  ModalActions,
  ModalContainer,
  ModalContent,
  ModalHeader,
} from './styles';

interface UpdateUserFormFields {
  name: string;
  image: FileList;
  biography: string;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  refetch: (
    newPath: string,
    newParams?: Array<{ name: string; value: unknown }>
  ) => Promise<{
    name: string;
    description?: string;
    image?: string;
  } | null>;
  refetchPosts: (
    newPath: string,
    newParams?: Array<{ name: string; value: unknown }> | undefined
  ) => Promise<{
    total: number;
    posts: Post[];
  } | null>;
  userInfos: {
    id: string;
    name: string;
    biography?: string;
    image?: string;
  };
}
type UpdateUserRequestReturn = Omit<
  AuthUser,
  'password' | 'token' | 'refreshToken'
>;

export function EditProfileModal({
  isOpen,
  onRequestClose,
  userInfos,
  refetch,
  refetchPosts,
}: EditProfileModalProps): JSX.Element {
  const authUser: AuthUser | undefined = useSelector(
    (state: RootState) => state.authUser.authUser
  );
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserFormFields>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const { isLoading, request: updateUser } = useMutation<
    Partial<AuthUser>,
    UpdateUserRequestReturn
  >({
    path: `${ApiRoutes.USERS}`,
    requestType: RequestHttpType.patch,
    onComplete: (result) => {
      dispatch(insertUser({ ...authUser, ...result }));
      refetch(`${ApiRoutes.USERS}/${userInfos.id}`);
      refetchPosts(`${ApiRoutes.GET_POSTS_BY_USER}/${userInfos.id}/${0}`);
      onRequestClose();
    },
    onError: () => {
      toast.error('Falha ao atualizar dados', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  const customStyles: Modal.Styles = {
    content: {
      padding: '0px',
      maxWidth: '1200px',
      maxHeight: '1000px',
      width: '60%',
      height: '55%',
    },
  };

  async function onSubmit(data: UpdateUserFormFields) {
    let image;
    if (data.image[0]) {
      const file = data.image[0];

      image = await getBase64(file);
    }

    await updateUser({ ...data, image });
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
      style={customStyles}
    >
      <ToastContainer />
      <ModalContainer>
        <button
          className='react-modal-close'
          onClick={() => onRequestClose()}
          type='button'
        >
          <GrClose />
        </button>
        <ModalHeader>
          <h1>Editar dados</h1>
        </ModalHeader>
        <ModalContent onSubmit={handleSubmit(onSubmit)}>
          <div className='content'>
            <label
              htmlFor='user-image-input'
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <UserPicture classname='user-img' source={userInfos.image} />

              <InputFile
                type='file'
                id='user-image-input'
                {...register('image')}
                /*  style={{ display: 'none' }} */
              />
            </label>

            <div className='inputs'>
              <Input
                label='Nome:'
                placeholder='Seu Nome'
                type='text'
                hasError={!!errors.name}
                defaultValue={userInfos.name}
                errorMessage={errors?.name?.message}
                {...register('name', {
                  required: 'Este campo é obrigatório',
                  maxLength: {
                    value: 80,
                    message: 'Máximo de 80 caracteres',
                  },
                })}
              />
              <BiographInputContainer hasError={!!errors?.biography}>
                <label htmlFor=''>Biografia</label>
                <textarea
                  className='biography'
                  id=''
                  placeholder='Sua biografia aqui...'
                  defaultValue={userInfos.biography}
                  {...register('biography', {
                    maxLength: {
                      value: 240,
                      message: 'Máximo de 240 caracteres',
                    },
                  })}
                />
              </BiographInputContainer>
              {errors?.biography && (
                <div className='error-message-container'>
                  <span>{errors?.biography?.message}</span>
                </div>
              )}
            </div>
          </div>
          <ModalActions>
            <button
              type='button'
              className='cancel-button'
              onClick={onRequestClose}
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='confirm-button'
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : 'Confirmar'}
            </button>
          </ModalActions>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
}
