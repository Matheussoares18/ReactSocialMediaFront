import { UserPicture } from '../DefaultComponents/UserPicture/UserPicture';
import { Container } from './styles';
import { ReactComponent as CollectionsIcons } from '../../assets/MakeAPost/collectionsIcons.svg';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import * as PostsServices from '../../Services/PostServices/PostServices';

import { useDispatch, useSelector } from 'react-redux';
import { insertPost } from '../../store/actions/PostsActions';
import { AuthUser } from '../../interfaces/AuthUser';
import { RootState } from '../../store/reducers';

export function MakeAPostCard() {
  const authUser: AuthUser | undefined = useSelector(
    (state: RootState) => state.authUser.authUser
  );
  const [images, setImages] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  function getBase64(file: File) {
    let url = '';

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      url = reader.result as string;
      setImages([...images, url]);
    };
  }
  function validatePhoto(file: File) {
    if (
      (file.type.toLowerCase() === 'image/jpg' ||
        file.type.toLowerCase() === 'image/jpeg' ||
        file.type.toLowerCase() === 'image/png' ||
        file.type.toLowerCase() === 'image/tiff') &&
      file.size / 1024 / 1024 <= 2
    ) {
      setImagesPreview([...imagesPreview, URL.createObjectURL(file)]);
      getBase64(file);
    } else if (file.size / 1024 / 1024 > 10) {
      toast.warning('Tamanho máximo 10mb', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error('Formato inválido', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      const result = await PostsServices.createPost({
        content: content,
        post_images: [
          ...images.map((item) => {
            return {
              image: item,
            };
          }),
        ],
      });

      dispatch(insertPost(result.data.post));
      setImages([]);
      setContent('');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Falha ao criar post', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <>
      <ToastContainer />
      <Container>
        <div className="content">
          <div className="top">
            <UserPicture source={authUser?.image} />

            <textarea
              placeholder="O que está acontecendo?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="bottom">
            <label htmlFor="upload-image">
              <CollectionsIcons className="collections-icon" />
              <input
                type="file"
                id="upload-image"
                multiple
                style={{ display: 'none' }}
                onChange={(e) => validatePhoto(e.target.files![0]!)}
              />
            </label>

            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={content.length === 0 || loading}
            >
              Publicar
            </button>
          </div>
        </div>
        {images.length > 0 && (
          <div className="preview-image-container">
            {images.map((image) => (
              <img className="preview-image" src={image} alt="" />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
