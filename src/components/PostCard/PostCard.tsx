import { UserPicture } from '../DefaultComponents/UserPicture/UserPicture';
import { CommentsList, Container } from './styles';
import { ReactComponent as More } from '../../assets/Post/more.svg';
import { ReactComponent as Share } from '../../assets/Post/share.svg';
import { ReactComponent as Send } from '../../assets/Post/send.svg';
import { ReactComponent as FavoriteFilled } from '../../assets/Post/favoriteFilled.svg';
import { ReactComponent as Arrow } from '../../assets/Post/arrow.svg';

import { MakeAComment } from '../MakeAComment/MakeAComment';
import { Comment } from '../Comment/Comment';

import brazil from 'date-fns/locale/pt-BR';
import { formatDistance } from 'date-fns';
import { useState } from 'react';
import { Post } from '../../interfaces/Posts';
import { AuthUser } from '../../interfaces/AuthUser';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import * as PostServices from '../../Services/PostServices/PostServices';
import {
  deletePostLike,
  insertPostLike,
} from '../../store/actions/PostsActions';
import { LikesList } from './LikesList/LikesList';
import { AllCommentsModal } from '../AllCommentsModal/AllCommentsModal';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const authUser: AuthUser | undefined = useSelector(
    (state: RootState) => state.authUser.authUser
  );
  const [selectedImage, setSelectedImage] = useState(0);

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
  const orderImagesArray = post.post_images.sort(function (a, b) {
    return (
      new Date(a.created_at!).getTime() + new Date(b.created_at!).getTime()
    );
  });

  function verifyLikes() {
    if (post.post_likes.length === 1) {
      return (
        <>
          <UserPicture source={post.post_likes[0].user.image} />
          <span>
            Curtido por
            <label className="user-name">
              {post.post_likes[0]?.user?.name}
            </label>
          </span>
        </>
      );
    } else if (post.post_likes.length === 0) {
      return <span>Nenhuma curtida</span>;
    }
    const likesAmount = post.post_likes.length - 1;
    return (
      <>
        <UserPicture source={post.post_likes[0].user.image} />
        <span>
          Curtido por
          <label className="user-name">{post.post_likes[0]?.user?.name}</label>e
          mais {likesAmount}
        </span>
      </>
    );
  }
  async function handleLikePost(): Promise<void> {
    const likeExists = post.post_likes.find(
      (like) => like.post_id === post.id && like.user_id === authUser!.id
    );

    if (likeExists) {
      try {
        await PostServices.deletePostLike(post.id);

        dispatch(deletePostLike(likeExists.id, post.id));
        setLiked('');
      } catch (error) {
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
  function handleCloseAllCommentsModal(): void {
    setAllCommentsModalOpen(false);
  }

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
        <div className="top">
          <div className="user-and-post-infos">
            <UserPicture source={post.user?.image} />
            <h3 className="name">{post.user.name}</h3>
            <time>
              {formatDistance(new Date(post.created_at), new Date(), {
                locale: brazil,
              })}
            </time>
          </div>
          <More className="more-icon" />
        </div>
        {post.post_images.length > 0 && (
          <div className="image-container">
            {selectedImage > 0 && (
              <div
                className="arrow-background left"
                onClick={() => handlePreviousImage()}
              >
                <Arrow className="arrow-icon" />
              </div>
            )}

            <img
              src={orderImagesArray[selectedImage]?.image}
              alt="postimage"
              className="post-image"
            />
            {selectedImage + 1 < orderImagesArray.length && (
              <div
                className="arrow-background right"
                onClick={() => handleNextImage()}
              >
                <Arrow className="arrow-icon" />
              </div>
            )}
          </div>
        )}
        <div className="likes-and-actions">
          <div className="likes" onClick={() => setLikesModalState(true)}>
            {verifyLikes()}
          </div>
          <div className="actions">
            <Share className="icon" />
            <Send className="icon" style={{ marginRight: '-10px' }} />

            <FavoriteFilled
              className={`icon ${
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
        <div className="post-content">
          <h3>{post.user.name}</h3>
          <p>{post.content}</p>
        </div>
        <MakeAComment postId={post.id} />
        <CommentsList>
          {post.post_comments
            .slice(post.post_comments.length - 3, post.post_comments.length)
            .map((item) => (
              <Comment comment={item} />
            ))}

          {post.post_comments.length > 3 && (
            <button
              className="see-all-coments"
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
