import React, { useCallback, useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { GrClose } from 'react-icons/gr';
import { PostComment } from 'interfaces/PostComment';
import { Comment } from 'components/Comment/Comment';
import { SpinnerContainer } from 'pages/PostsPage/styles';
import { Spinner } from 'components/DefaultComponents/Spinner/Spinner';
import { SocialPostsApiRoutes } from 'Services/ApiRoutes';
import { useQuery } from 'hooks/useQuery';
import { PostCommentsContainer } from './styles';

interface AllCommentsModalProps {
  postId: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

export function AllCommentsModal({
  isOpen,
  onRequestClose,
  postId,
}: AllCommentsModalProps): JSX.Element {
  const [comments, setComments] = useState<PostComment[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [totalComments, setTotalComments] = useState<number>(0);
  const postCommentsListsRef = useRef<HTMLDivElement>(null);

  const postCommentsFetchingAmount = 30;

  const { isLoading, refetch } = useQuery<{
    total: number;
    postComments: PostComment[];
  }>({
    path: `${SocialPostsApiRoutes.GET_ALL_POST_COMMENTS}?id=${postId}&skip=0`,
    onComplete: (result) => {
      setTotalComments(result.total);
      setSkip(skip + postCommentsFetchingAmount);
      setComments((previousValue) => [
        ...previousValue,
        ...result.postComments,
      ]);
    },
    enabled: false,
  });
  const postListsRef = useRef<HTMLDivElement>(null);

  const getDivHeight = useCallback(async () => {
    const currentPosition = window.scrollY + window.innerHeight;
    const postsListHeight = postListsRef.current?.offsetHeight;

    const hasPostsYet = skip < totalComments;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!isLoading && currentPosition >= postsListHeight! && hasPostsYet) {
      await refetch(
        `${SocialPostsApiRoutes.GET_ALL_POST_COMMENTS}?id=${postId}&skip=${skip}`
      );
    }
  }, [skip, totalComments, refetch, isLoading, postId]);

  useEffect(() => {
    window.onscroll = getDivHeight;
  }, [getDivHeight]);

  const shouldFetchData = useCallback(() => {
    if (isOpen) {
      refetch(
        `${SocialPostsApiRoutes.GET_ALL_POST_COMMENTS}?id=${postId}&skip=${skip}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, postId, skip]);

  useEffect(() => {
    shouldFetchData();
  }, [isOpen, shouldFetchData]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >
      <button
        className='react-modal-close'
        onClick={() => onRequestClose()}
        type='button'
      >
        <GrClose />
      </button>

      <PostCommentsContainer ref={postCommentsListsRef}>
        {comments.map((comment) => (
          <Comment comment={comment} />
        ))}
      </PostCommentsContainer>
      {isLoading && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
    </Modal>
  );
}
