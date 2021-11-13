import { Link } from 'react-router-dom';
import { Container, Content, Links, Logo, SearchContainer } from './styles';
import { ReactComponent as Search } from '../../../assets/Menu/search.svg';
import { ReactComponent as NotificationIcon } from '../../../assets/Menu/notificationIcon.svg';
import { ReactComponent as Messages } from '../../../assets/Menu/messages.svg';
import { ReactComponent as ExpandIcon } from '../../../assets/Menu/expandIcon.svg';
import { UserPicture } from '../UserPicture/UserPicture';
import { AuthUser } from '../../../interfaces/AuthUser';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';
import * as UserServices from '../../../Services/UserServices/UserServices';
import { useCallback, useEffect, useState } from 'react';
import { insertUser, logout } from '../../../store/actions/AuthUserAction';

export function Header() {
  const authUser: AuthUser | undefined = useSelector(
    (state: RootState) => state.authUser.authUser
  );
  const [image, setImage] = useState('');
  const dispatch = useDispatch();

  function getBase64(file: File) {
    let url = '';

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      url = reader.result as string;
      setImage(url);
    };
  }
  async function handleUpdateUserImage(e?: File) {
    if (!e) {
      return;
    }
    getBase64(e);
  }
  const updateImage = useCallback(
    async (url: string) => {
      if (image.length > 0) {
        try {
          await UserServices.updateUserImage(url);
          dispatch(insertUser({ ...authUser!, image: image }));
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      }
    },
    [dispatch, authUser, image]
  );
  useEffect(() => {
    if (image.length > 0) {
      updateImage(image);
    }
  }, [image]);

  return (
    <Container>
      <Content>
        <SearchContainer>
          <div className="content">
            <Search className="search-icon" />
            <input type="text" placeholder="Pesquisar na SocialMedia" />
          </div>
        </SearchContainer>
        <Logo>Social Media</Logo>
        <Links>
          <label className="profile" htmlFor="user-image-input">
            {/*  <Link  to="#"> */}
            <div className="profile-icon">
              <UserPicture source={authUser?.image} />
              <input
                type="file"
                style={{ display: 'none' }}
                id="user-image-input"
                onChange={(e) => {
                  console.log(e);
                  handleUpdateUserImage(e.target!.files![0]!);
                }}
              />
              <span>
                {authUser!.name.length > 6
                  ? authUser!.name.substring(0, 7)
                  : authUser!.name}
              </span>
            </div>
            {/* </Link> */}
          </label>
          <div className="container">
            <Link className="commom-icons" to="/notifications">
              <NotificationIcon className="icon" />
            </Link>
            <Link className="commom-icons" to="#">
              <Messages className="icon" />
            </Link>
            {/* <Link  to="#"> */}
            <div
              className="commom-icons"
              style={{ cursor: 'pointer' }}
              onClick={() => dispatch(logout())}
            >
              <ExpandIcon className="icon" />
            </div>

            {/* </Link> */}
          </div>
        </Links>
      </Content>
    </Container>
  );
}
