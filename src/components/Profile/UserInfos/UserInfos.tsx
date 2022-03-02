import { useCallback, useEffect, useState } from 'react';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useUserInfos } from 'hooks/useUserInfos';
import FollowButton from 'components/DefaultComponents/FollowButton/FollowButton';
import { UserFollower } from 'interfaces/AuthUser';
import { HiOutlineMail } from 'react-icons/hi';
import { useQuery } from 'hooks/useQuery';
import { SocialUsersApiRoutes } from 'Services/ApiRoutes';
import { RequestHttpType, useMutation } from 'hooks/useMutation';
import { UserPicture } from '../../DefaultComponents/UserPicture/UserPicture';
import { FollowersInfo } from './FollowersInfo/FollowersInfo';
import { Container, Top, Bottom, Actions } from './styles';
import { EditProfileModal } from './EditProfileModal/EditProfileModal';
import { Post } from '../../../interfaces/Posts';

enum States {
  DEFAULT = 'default',
  LOADING = 'loading',
  ERROR = 'error',
}
interface UserInfosProps {
  name: string;
  biography?: string;
  image?: string;
  id: string;
  userFollowers: UserFollower[];
  followersAmount: number;
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

const UserInfos: React.FC<UserInfosProps> = ({
  name,
  biography,
  image,
  id,
  refetch,
  refetchPosts,
  followersAmount,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const authUser = useUserInfos();
  const [follow, setFollow] = useState<boolean>(false);
  const [followButtonState, setFollowButtonState] = useState<States>(
    States.LOADING
  );
  const [followersAmountState, setFollowersAmountState] =
    useState<number>(followersAmount);

  const { refetch: refetchGetFollow } = useQuery<UserFollower>({
    enabled: false,
    path: `${SocialUsersApiRoutes.GET_FOLLOW}?id=${id}&follower_id=${authUser?.id}`,
    onComplete: () => {
      setFollow(true);
      setFollowButtonState(States.DEFAULT);
    },
    onError: (error) => {
      if (error.response?.status === 404) {
        setFollowButtonState(States.DEFAULT);
      } else {
        setFollow(false);
        setFollowButtonState(States.ERROR);
      }
    },
  });
  const { request: unfollowUser } = useMutation({
    path: `${SocialUsersApiRoutes.UNFOLLOW_USER}?id=${id}&follower_id=${authUser?.id}`,
    requestType: RequestHttpType.delete,
    onComplete: () => {
      setFollowersAmountState((previousValue) => previousValue - 1);
      setFollowButtonState(States.DEFAULT);
      setFollow(false);
    },
  });
  const { request: followUser } = useMutation({
    path: `${SocialUsersApiRoutes.FOLLOW_USER}?id=${id}&follower_id=${authUser?.id}`,
    requestType: RequestHttpType.post,
    onComplete: () => {
      setFollowersAmountState((previousValue) => previousValue + 1);
      setFollowButtonState(States.DEFAULT);
      setFollow(true);
    },
  });

  const handleCloseModal = () => {
    setModalIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const handleFollowClick = async () => {
    if (follow) {
      setFollowButtonState(States.LOADING);
      await unfollowUser();
      return;
    }
    setFollowButtonState(States.LOADING);
    await followUser();
  };

  const getFollow = useCallback(async () => {
    if (!authUser || id === undefined) {
      return;
    }
    if (authUser.id !== id) {
      setFollowButtonState(States.LOADING);
      await refetchGetFollow(
        `${SocialUsersApiRoutes.GET_FOLLOW}?id=${id}&follower_id=${authUser?.id}`
      );
    }
  }, [authUser, id, refetchGetFollow]);

  useEffect(() => {
    getFollow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <FollowersInfo value={followersAmountState} text='Seguidores' />
          <FollowersInfo value={0} text='Seguindo' />
        </div>
        {authUser?.id !== id && (
          <Actions>
            <FollowButton
              className='follow'
              alreadyFollowing={follow}
              state={followButtonState}
              onClick={handleFollowClick}
            />
            <button type='button' className='message-button'>
              <HiOutlineMail className='icon' />
            </button>
          </Actions>
        )}
      </Bottom>
    </Container>
  );
};

export { UserInfos };
