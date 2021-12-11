/* eslint-disable no-console */
import { UserPicture } from 'components/DefaultComponents/UserPicture/UserPicture';

import * as PostServices from 'Services/PostServices/PostServices';
import { useState } from 'react';
import { AuthUser } from 'interfaces/AuthUser';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import { insertPostComment } from 'store/actions/PostsActions';
import { Container } from './styles';

interface MakeACommentProps {
  postId: string;
}

export function MakeAComment({ postId }: MakeACommentProps): JSX.Element {
  const authUser: AuthUser | undefined = useSelector(
    (state: RootState) => state.authUser.authUser
  );
  const [comment, setComment] = useState<string>('');
  const dispatch = useDispatch();

  async function handleCreateComment() {
    try {
      const result = await PostServices.createPostComment(postId, comment);

      dispatch(insertPostComment(result.data, postId));
      setComment('');
    } catch (error) {
      console.log('Failed');
    }
  }
  return (
    <Container
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          handleCreateComment();
        }
      }}
    >
      <div className='user-and-input'>
        <UserPicture source={authUser?.image} />
        <input
          value={comment}
          placeholder='Escreva um comentário...'
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button
        type='button'
        disabled={
          comment.length === 0 || comment.length > 300 || !authUser?.token
        }
        onClick={() => handleCreateComment()}
      >
        {`(${comment.length}/300)`}Comentar
      </button>
    </Container>
  );
}
