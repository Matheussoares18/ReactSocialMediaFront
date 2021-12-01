import { UserPicture } from '../../DefaultComponents/UserPicture/UserPicture';
import { FollowersInfo } from './FollowersInfo/FollowersInfo';
import { Container, LeftSide, RightSide } from './styles';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { AuthUser } from '../../../interfaces/AuthUser';
import { RootState } from '../../../store/reducers';

interface UserInfosProps {
  username: string;
}

export function UserInfos({ username }: UserInfosProps) {
  const authUser: AuthUser | undefined = useSelector(
    (state: RootState) => state.authUser.authUser
  );
  return (
    <Container>
      <LeftSide>
        <UserPicture classname="user-img" source={authUser?.image} />
        <div className="followers-container">
          <FollowersInfo value={0} text="Posts" />
          <FollowersInfo value={0} text="Seguidores" />
          <FollowersInfo value={0} text="Seguindo" />
        </div>
      </LeftSide>
      <RightSide>
        <div className="username">
          <h2>{username}</h2> <MdOutlineModeEditOutline className="icon" />
        </div>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen{' '}
        </p>
      </RightSide>
    </Container>
  );
}
