/* eslint-disable camelcase */
import { useState } from 'react';
import { UserPicture } from 'components/DefaultComponents/UserPicture/UserPicture';
import { useUserInfos } from 'hooks/useUserInfos';
import { RequestHttpType, useMutation } from 'hooks/useMutation';
import { SocialPostsApiRoutes } from 'Services/ApiRoutes';
import { useDispatch } from 'react-redux';
import { insertPostComment } from 'store/actions/PostsActions';
import { PostComment } from 'interfaces/PostComment';
import { Container } from './styles';

interface MakeACommentProps {
  postId: string;
}

interface CreatePostCommentRequest {
  comment: string;
  post_id: string;
  external_id: string;
}

const MakeAComment: React.FC<MakeACommentProps> = ({ postId }) => {
  const authUser = useUserInfos();
  const dispatch = useDispatch();
  const [comment, setComment] = useState<string>('');
  const { request } = useMutation<CreatePostCommentRequest, PostComment>({
    path: `${SocialPostsApiRoutes.CREATE_POST_COMMENT}`,
    requestType: RequestHttpType.post,
    onComplete: (result) => {
      dispatch(insertPostComment(result, postId));
      setComment('');
    },
  });

  async function handleCreateComment() {
    if (!authUser) {
      return;
    }
    await request({
      post_id: postId,
      comment,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      external_id: authUser!.id!,
    });
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
          comment.length === 0 || comment.length > 240 || !authUser?.token
        }
        onClick={() => handleCreateComment()}
      >
        {`(${comment.length}/240)`}Comentar
      </button>
    </Container>
  );
};

export { MakeAComment };
