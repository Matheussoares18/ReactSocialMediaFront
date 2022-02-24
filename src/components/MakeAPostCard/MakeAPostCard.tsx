/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from 'react';
import { UserPicture } from 'components/DefaultComponents/UserPicture/UserPicture';
import { useDispatch } from 'react-redux';
import { ReactComponent as CollectionsIcons } from 'assets/MakeAPost/collectionsIcons.svg';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { SocialPostsApiRoutes } from 'Services/ApiRoutes';
import api from 'Services/api';
import { useUserInfos } from 'hooks/useUserInfos';
import { insertPost } from 'store/actions/PostsActions';
import { CONSTANTS } from 'utils/constants';
import { Container, ProgressButton } from './styles';

enum UploadStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export function MakeAPostCard(): JSX.Element {
  const authUser = useUserInfos();
  const [content, setContent] = useState('');
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [videosPreview, setVideosPreview] = useState<string[]>([]);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [uploadStatusAndProgress, setUploadStatusAndProgress] = useState<{
    status: UploadStatus;
    progress: number;
  }>({
    status: UploadStatus.IDLE,
    progress: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  function validatePhoto(file: File) {
    const validFormats = [
      'image/jpg',
      'image/jpeg',
      'image/png',
      'video/mp4',
      'image/tiff',
    ];
    if (
      validFormats.includes(file.type.toLocaleLowerCase()) &&
      file.size / 1024 / 1024 <= 1000
    ) {
      if (file.type.toLowerCase() !== 'video/mp4') {
        setImagesPreview([...imagesPreview, URL.createObjectURL(file)]);
      } else {
        setVideosPreview([...videosPreview, URL.createObjectURL(file)]);
      }
      setFilesToUpload([...filesToUpload, file]);
    } else if (file.size / 1024 / 1024 > 1000) {
      toast.warning('Tamanho máximo 300mb', {
        position: 'top-right',
        autoClose: CONSTANTS.alertDefaultTime,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error('Formato inválido', {
        position: 'top-right',
        autoClose: CONSTANTS.alertDefaultTime,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  async function handleSubmit() {
    // eslint-disable-next-line prefer-const
    let formData = new FormData();
    if (filesToUpload.length > 0) {
      filesToUpload.forEach((file) => {
        formData.append('images', file);
      });
    }
    formData.append('content', content);
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    formData.append('external_id', authUser?.id!);

    try {
      setIsLoading(true);
      setUploadStatusAndProgress({
        ...uploadStatusAndProgress,
        status: UploadStatus.LOADING,
      });
      const result = await api.post(`${SocialPostsApiRoutes.POSTS}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (event) => {
          const progress: number = Math.round(
            (event.loaded * 100) / event.total
          );

          setUploadStatusAndProgress({
            status: UploadStatus.LOADING,
            progress,
          });
        },
      });
      dispatch(insertPost(result.data));

      setImagesPreview([]);
      setVideosPreview([]);
      setFilesToUpload([]);
      setContent('');
      setIsLoading(false);
      setUploadStatusAndProgress({
        ...uploadStatusAndProgress,
        status: UploadStatus.SUCCESS,
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Network Error') {
        toast.error('Falha ao realizar operação, serviço indisponível', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if (axios.isAxiosError(error)) {
        toast.error('Falha ao criar post, tente novamente', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setUploadStatusAndProgress({
        ...uploadStatusAndProgress,
        status: UploadStatus.ERROR,
      });
    }
  }

  return (
    <>
      <ToastContainer />
      <Container>
        <div className='content'>
          <div className='top'>
            <UserPicture source={authUser?.image} />

            <textarea
              placeholder='O que está acontecendo?'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className='bottom'>
            <label htmlFor='upload-image'>
              <CollectionsIcons className='collections-icon' />
              <input
                type='file'
                id='upload-image'
                multiple
                style={{ display: 'none' }}
                onChange={(e) => validatePhoto(e.target.files![0]!)}
              />
            </label>

            <ProgressButton
              status={uploadStatusAndProgress.status}
              progress={uploadStatusAndProgress.progress}
              type='button'
              onClick={() => handleSubmit()}
              disabled={content.length === 0 || isLoading}
            >
              <span>
                {uploadStatusAndProgress.status === UploadStatus.LOADING
                  ? `Processando...(${uploadStatusAndProgress.progress}%)`
                  : 'Publicar'}
              </span>
              <div className='progress-bar-container'>
                <div className='progress-bar' />
              </div>
            </ProgressButton>
          </div>
        </div>
        {imagesPreview.length > 0 && (
          <div className='preview-image-container'>
            {imagesPreview.map((image) => (
              <img className='preview-image' src={image} alt='' key={image} />
            ))}
          </div>
        )}

        {videosPreview.length > 0 && (
          <div className='preview-image-container'>
            {videosPreview.map((video) => (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video controls>
                <source src={video} />
              </video>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
