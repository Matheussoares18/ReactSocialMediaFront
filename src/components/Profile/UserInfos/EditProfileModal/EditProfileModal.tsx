/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button } from 'components/DefaultComponents/Button/Button';
import { useUserInfos } from 'hooks/useUserInfos';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GrClose } from 'react-icons/gr';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { PublicRoutes } from 'Routes/RoutesEnum';
import { isValidFile } from 'utils/isValidFile';
import { RequestHttpType, useMutation } from '../../../../hooks/useMutation';
import { AuthUser } from '../../../../interfaces/AuthUser';
import { Post } from '../../../../interfaces/Posts';
import {
  SocialPostsApiRoutes,
  SocialUsersApiRoutes,
} from '../../../../Services/ApiRoutes';
import { insertUser } from '../../../../store/actions/AuthUserAction';
import { getBase64 } from '../../../../utils/imageToBase54';
import Input from '../../../DefaultComponents/Input/Input';
import { Spinner } from '../../../DefaultComponents/Spinner/Spinner';
import { UserPicture } from '../../../DefaultComponents/UserPicture/UserPicture';
import {
  BiographInputContainer,
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
  const authUser = useUserInfos();
  const dispatch = useDispatch();
  const [fileToUpload, setFileToUpload] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserFormFields>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const history = useHistory();
  const { isLoading, request: updateUser } = useMutation<
    Partial<AuthUser & { userId: string }>,
    UpdateUserRequestReturn
  >({
    path: `${SocialUsersApiRoutes.UPDATE_USER}?id=${authUser?.id}`,
    requestType: RequestHttpType.patch,
    onComplete: async (result) => {
      dispatch(insertUser({ ...authUser, ...result }));
      await refetch(`${SocialUsersApiRoutes.UPDATE_USER}?id=${userInfos.id}`);
      await refetchPosts(
        `${SocialPostsApiRoutes.GET_ALL_POSTS_BY_USER}?external_id=${
          userInfos.id
        }&skip=${0}`
      );
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
      width: '100%',
      minHeight: '33rem',
    },
  };

  async function onSubmit(data: UpdateUserFormFields) {
    if (!authUser || !authUser.id) {
      history.push(`${PublicRoutes.LOGIN}`, {
        state: { from: `${PublicRoutes.PROFILE}` },
      });
    }
    let image;
    if (fileToUpload) {
      const file = fileToUpload;

      // isValidFile(fileToUpload, ['.png', '.jpg', '.jpeg'], 0.5);

      image = await getBase64(file);
    }

    await updateUser({ ...data, image, userId: authUser?.id });
  }
  const showImagePreview = (image: File) => {
    const validFormats = ['image/jpg', 'image/jpeg', 'image/png', 'image/tiff'];
    if (isValidFile(image, validFormats, 40)) {
      setFileToUpload(image);
      setImagePreview(URL.createObjectURL(image));
    }
  };
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
          disabled={isLoading}
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
              <UserPicture
                classname='user-img'
                source={imagePreview ?? userInfos.image}
              />

              <input
                type='file'
                id='user-image-input'
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                onChange={(e) => showImagePreview(e.target.files![0]!)}
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
              disabled={isLoading}
            >
              Cancelar
            </button>
            <Button
              type='submit'
              className='confirm-button'
              loading={isLoading}
            >
              {isLoading ? <Spinner /> : 'Confirmar'}
            </Button>
          </ModalActions>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
}
