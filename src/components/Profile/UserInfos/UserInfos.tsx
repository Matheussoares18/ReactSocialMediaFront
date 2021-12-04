import { UserPicture } from '../../DefaultComponents/UserPicture/UserPicture';
import { FollowersInfo } from './FollowersInfo/FollowersInfo';
import { Container, LeftSide, RightSide } from './styles';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { AuthUser } from '../../../interfaces/AuthUser';
import { RootState } from '../../../store/reducers';
import { EditProfileModal } from './EditProfileModal/EditProfileModal';
import { useState } from 'react';
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
}: UserInfosProps) {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const authUser: AuthUser | undefined = useSelector(
    (state: RootState) => state.authUser.authUser
  );

  function handleCloseModal() {
    setModalIsOpen(false);
  }

  function handleOpenModal() {
    setModalIsOpen(true);
  }

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
      <LeftSide>
        <UserPicture classname="user-img" source={image} />
        <div className="followers-container">
          <FollowersInfo value={0} text="Posts" />
          <FollowersInfo value={0} text="Seguidores" />
          <FollowersInfo value={0} text="Seguindo" />
        </div>
      </LeftSide>
      <RightSide>
        <div className="username">
          <h2>{name}</h2>{' '}
          {authUser?.id === id && (
            <MdOutlineModeEditOutline
              className="icon"
              onClick={handleOpenModal}
            />
          )}
        </div>
        <p>
          {biography && biography?.length > 0
            ? biography
            : `Sua biografia aqui...`}
        </p>
      </RightSide>
    </Container>
  );
}
