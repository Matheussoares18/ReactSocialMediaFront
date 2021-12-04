import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthUser } from '../../interfaces/AuthUser';
import { PostComment } from '../../interfaces/PostComment';

import { RootState } from '../../store/reducers';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';

import { UserPicture } from '../DefaultComponents/UserPicture/UserPicture';
import { Container } from './styles';
import * as PostCommentServices from '../../Services/PostCommentsServices/PostCommentsServices';
import { deletePostComment } from '../../store/actions/PostsActions';

interface CommentProps {
  comment: PostComment;
}

export function Comment({ comment }: CommentProps) {
  const authUser: AuthUser | undefined = useSelector(
    (state: RootState) => state.authUser.authUser
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  function openModal(): void {
    setIsOpen(true);
  }
  function closeModal(): void {
    setIsOpen(false);
  }
  async function handleDeleteComment() {
    await deleteCommentRequest(comment.id, comment.post_id);
  }
  const deleteCommentRequest = useCallback(
    async (postCommentId: string, postId: string) => {
      try {
        await PostCommentServices.deletePostComment(postCommentId);
        dispatch(deletePostComment(postId, postCommentId));
        closeModal();
      } catch (error) {
        console.log('Falha ao deletar commentario');
      }
    },
    [dispatch]
  );

  return (
    <Container>
      <ConfirmModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        confirmationModalText="Deseja excluir o comentário?"
        next={handleDeleteComment}
      />
      <UserPicture source={comment.user?.image} />
      <div className="name-and-comment">
        <h3>
          {comment.user?.name.length > 10
            ? `${comment.user?.name.substring(0, 10)}`
            : comment.user?.name}
        </h3>
        <div className="comment-container">
          <p>{comment.comment}</p>
        </div>
        {comment.user_id === authUser?.id && (
          <div className="comment-actions">
            <button type="button" className="edit-button" disabled>
              Editar
            </button>
            <button type="button" className="delete-button" onClick={openModal}>
              Excluir
            </button>
          </div>
        )}
      </div>
    </Container>
  );
}
