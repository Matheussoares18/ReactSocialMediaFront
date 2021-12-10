import React, { useCallback, useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { GrClose } from 'react-icons/gr';
import { PostComment } from 'interfaces/PostComment';
import * as PostCommentsServices from 'Services/PostCommentsServices/PostCommentsServices';
import { Comment } from 'components/Comment/Comment';
import { PostCommentsContainer } from './styles';
import { SpinnerContainer } from 'pages/PostsPage/styles';
import { Spinner } from 'components/DefaultComponents/Spinner/Spinner';

interface AllCommentsModalProps {
  postId: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

export function AllCommentsModal({
  isOpen,
  onRequestClose,
  postId,
}: AllCommentsModalProps) {
  const [comments, setComments] = useState<PostComment[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [totalComments, setTotalComments] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const postCommentsListsRef = useRef<HTMLDivElement>(null);

  const getAllComments = useCallback(async () => {
    if (isOpen) {
      const result = await PostCommentsServices.getAllPostComments(postId, 0);

      setTotalComments(result.data.total);
      setComments(result.data.postComments);
    }
  }, [postId, isOpen]);

  useEffect(() => {
    getAllComments();
  }, [getAllComments]);

  const getDivHeight = useCallback(() => {
    const currentPosition = window.scrollY + window.innerHeight;
    const postsListHeight = postCommentsListsRef.current?.offsetHeight;

    const hasPostsYet = skip < totalComments;

    if (currentPosition >= postsListHeight! && hasPostsYet) {
      setLoading(true);
      const updateSkipNumber = skip + 15;

      PostCommentsServices.getAllPostComments(postId, updateSkipNumber).then(
        (res) => {
          setComments([...comments, ...res.data.postComments]);
          setTotalComments(res.data.total);
          setSkip(updateSkipNumber);
        }
      );
      return;
    }
    setLoading(false);
  }, [setLoading, comments, skip, totalComments, postId]);

  useEffect(() => {
    window.onscroll = getDivHeight;
  }, [getDivHeight]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        className="react-modal-close"
        onClick={() => onRequestClose()}
        type="button"
      >
        <GrClose />
      </button>

      <PostCommentsContainer ref={postCommentsListsRef}>
        {comments.map((comment) => (
          <Comment comment={comment} />
        ))}
      </PostCommentsContainer>
      {loading && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
    </Modal>
  );
}
