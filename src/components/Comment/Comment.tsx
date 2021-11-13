import { useSelector } from 'react-redux';
import { AuthUser } from '../../interfaces/AuthUser';
import { PostComment } from '../../interfaces/Posts';
import { RootState } from '../../store/reducers';
import { UserPicture } from '../DefaultComponents/UserPicture/UserPicture';
import { Container } from './styles';

interface CommentProps {
  comment: PostComment;
}

export function Comment({ comment }: CommentProps) {
  const authUser: AuthUser | undefined = useSelector(
    (state: RootState) => state.authUser.authUser
  );
  return (
    <Container>
      <UserPicture source={authUser?.image} />
      <div className="name-and-comment">
        <h3>
          {comment.user?.name.length > 10
            ? `${comment.user?.name.substring(0, 10)}`
            : comment.user?.name}
        </h3>
        <div className="comment-container">
          <p>{comment.comment}</p>
        </div>
      </div>
    </Container>
  );
}
