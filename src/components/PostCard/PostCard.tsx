/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ReactComponent as More } from 'assets/Post/more.svg';
import { ReactComponent as Share } from 'assets/Post/share.svg';
import { ReactComponent as Send } from 'assets/Post/send.svg';
import { ReactComponent as FavoriteFilled } from 'assets/Post/favoriteFilled.svg';
import { ReactComponent as Arrow } from 'assets/Post/arrow.svg';

import { MakeAComment } from 'components/MakeAComment/MakeAComment';
import { Comment } from 'components/Comment/Comment';

import brazil from 'date-fns/locale/pt-BR';
import { formatDistance } from 'date-fns';
import { useState } from 'react';
import { Post } from 'interfaces/Posts';
import { AuthUser } from 'interfaces/AuthUser';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import * as PostServices from 'Services/PostServices/PostServices';
import { deletePostLike, insertPostLike } from 'store/actions/PostsActions';
import { LikesList } from 'components/PostCard/LikesList/LikesList';
import { AllCommentsModal } from 'components/AllCommentsModal/AllCommentsModal';
import { UserPicture } from 'components/DefaultComponents/UserPicture/UserPicture';
import { config } from 'config';
import { CommentsList, Container } from './styles';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps): JSX.Element {
  const authUser: AuthUser | undefined = useSelector(
    (state: RootState) => state.authUser.authUser
  );
  const [selectedImage, setSelectedImage] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [liked, setLiked] = useState('');
  const [likesModalIsOpen, setLikesModalState] = useState(false);
  const [allCommentsModalOpen, setAllCommentsModalOpen] =
    useState<boolean>(false);
  const dispatch = useDispatch();

  function handleNextImage() {
    if (selectedImage < post.post_images.length) {
      setSelectedImage(selectedImage + 1);
    }
  }
  function handlePreviousImage() {
    if (selectedImage >= 1) {
      setSelectedImage(selectedImage - 1);
    }
  }
  const orderImagesArray = post.post_images.sort(function order(a, b) {
    return (
      new Date(a.created_at!).getTime() + new Date(b.created_at!).getTime()
    );
  });

  function verifyLikes() {
    if (post.post_likes.length === 1) {
      return (
        <>
          <UserPicture source={post.post_likes[0].users.image} />
          <span>
            Curtido por
            <span className='user-name'>{post.post_likes[0]?.users?.name}</span>
          </span>
        </>
      );
    }
    if (post.post_likes.length === 0) {
      return <span>Nenhuma curtida</span>;
    }
    const likesAmount = post.post_likes.length - 1;
    return (
      <>
        <UserPicture source={post.post_likes[0].users.image} />
        <span>
          Curtido por
          <span className='user-name'>{post.post_likes[0]?.users?.name}</span>e
          mais {likesAmount}
        </span>
      </>
    );
  }
  async function handleLikePost(): Promise<void> {
    if (!authUser?.token) {
      return;
    }
    const likeExists = post.post_likes.find(
      (like) => like.post_id === post.id && like.user_id === authUser!.id
    );

    if (likeExists) {
      try {
        await PostServices.deletePostLike(post.id);

        dispatch(deletePostLike(likeExists.id, post.id));
        setLiked('');
      } catch {
        console.log('Failed');
      }
      return;
    }
    try {
      const result = await PostServices.createPostLike(post.id);
      setLiked('favorite-filled-animation');
      dispatch(insertPostLike(result.data, post.id));
    } catch (error) {
      console.log('Failed');
    }
  }
  function handleOpenAllCommentsModal(): void {
    setAllCommentsModalOpen(true);
  }

  const handleCloseAllCommentsModal = () => {
    setAllCommentsModalOpen(false);
  };
  const verifyFileFormat = (
    imageNameParam?: string
  ): JSX.Element | undefined => {
    if (imageNameParam) {
      const imagesFormat = ['.jpg', '.jpeg', '.png', '.tiff'];

      const imageName = imageNameParam.substring(
        imageNameParam.length,
        imageNameParam.lastIndexOf('.')
      );

      if (imagesFormat.find((format) => format === imageName)) {
        return (
          <img
            src={`${config.postImagesPath}/${imageNameParam}`}
            alt='postimage'
            className='post-image'
          />
        );
      }

      return (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video controls className='post-image'>
          <source
            src={`${config.postImagesPath}/${imageNameParam}`}
            type='video/mp4'
          />
        </video>
      );
    }
    return undefined;
  };

  return (
    <>
      <LikesList
        handleCloseModal={() => setLikesModalState(false)}
        modalIsOpen={likesModalIsOpen}
        likesList={post.post_likes}
      />
      <AllCommentsModal
        postId={post.id}
        isOpen={allCommentsModalOpen}
        onRequestClose={handleCloseAllCommentsModal}
      />

      <Container>
        <div className='top'>
          <div className='user-and-post-infos'>
            <UserPicture source={post.users?.image} />
            <h3 className='name'>{post.users.name}</h3>
            <time>
              {formatDistance(new Date(post.createdAt), new Date(), {
                locale: brazil,
              })}
            </time>
          </div>
          <More className='more-icon' />
        </div>
        {post.post_images.length > 0 && (
          <div className='image-container'>
            {selectedImage > 0 && (
              <button
                type='button'
                className='arrow-background left'
                onClick={() => handlePreviousImage()}
              >
                <Arrow className='arrow-icon' />
              </button>
            )}

            {verifyFileFormat(orderImagesArray[selectedImage]?.image)}

            {selectedImage + 1 < orderImagesArray.length && (
              <button
                type='button'
                className='arrow-background right'
                onClick={() => handleNextImage()}
              >
                <Arrow className='arrow-icon' />
              </button>
            )}
          </div>
        )}
        <div className='likes-and-actions'>
          <button
            type='button'
            className='likes'
            onClick={() => setLikesModalState(true)}
          >
            {verifyLikes()}
          </button>
          <div className='actions'>
            <Share className='icon' />
            <Send className='icon' style={{ marginRight: '-10px' }} />

            <FavoriteFilled
              className={`icon ${
                authUser &&
                authUser?.token &&
                post.post_likes.find(
                  (like) =>
                    like.post_id === post.id && like.user_id === authUser!.id
                )
                  ? 'favorite-filled-animation'
                  : ''
              }`}
              onClick={() => handleLikePost()}
            />
          </div>
        </div>
        <div className='post-content'>
          <h3>{post.users.name}</h3>
          <p>{post.content}</p>
        </div>
        <MakeAComment postId={post.id} />
        <CommentsList>
          {post?.post_comments?.length > 0 &&
            post.post_comments
              .slice(post.post_comments.length - 3, post.post_comments?.length)
              .map((item) => <Comment comment={item} />)}

          {post?.post_comments?.length > 3 && (
            <button
              type='button'
              className='see-all-coments'
              onClick={handleOpenAllCommentsModal}
            >
              Ver todos os comentários
            </button>
          )}
        </CommentsList>
      </Container>
    </>
  );
}
