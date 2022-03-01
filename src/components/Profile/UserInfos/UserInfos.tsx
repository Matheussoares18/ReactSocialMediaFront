import { useState } from 'react';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useUserInfos } from 'hooks/useUserInfos';
import { UserPicture } from '../../DefaultComponents/UserPicture/UserPicture';
import { FollowersInfo } from './FollowersInfo/FollowersInfo';
import { Container, Top, Bottom } from './styles';
import { EditProfileModal } from './EditProfileModal/EditProfileModal';
import { Post } from '../../../interfaces/Posts';

interface UserInfosProps {
  name: string;
  biography?: string;
  image?: string;
  id: string;
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
}

export function UserInfos({
  name,
  biography,
  image,
  id,
  refetch,
  refetchPosts,
}: UserInfosProps): JSX.Element {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const authUser = useUserInfos();

  const handleCloseModal = () => {
    setModalIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  return (
    <Container>
      {authUser?.id === id && (
        <EditProfileModal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          refetch={refetch}
          refetchPosts={refetchPosts}
          userInfos={{ name, biography, image, id }}
        />
      )}
      <Top>
        <UserPicture classname='user-img' source={image} />
        <div className='user-infos'>
          <div className='username'>
            <h2>{name}</h2>{' '}
            {authUser?.id === id && (
              <MdOutlineModeEditOutline
                className='icon'
                onClick={handleOpenModal}
              />
            )}
          </div>
          <p>
            {biography && biography?.length > 0
              ? biography
              : `Sua biografia aqui...`}
          </p>
        </div>
      </Top>

      <Bottom>
        <div className='followers-container'>
          <FollowersInfo value={0} text='Seguidores' />
          <FollowersInfo value={0} text='Seguindo' />
        </div>
      </Bottom>
    </Container>
  );
}
