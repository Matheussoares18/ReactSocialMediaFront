import { UserPicture } from '../DefaultComponents/UserPicture/UserPicture';
import { Container } from './styles';
import { ReactComponent as More } from '../../assets/Post/more.svg';
import { ReactComponent as Share } from '../../assets/Post/share.svg';
import { ReactComponent as Send } from '../../assets/Post/send.svg';
import { ReactComponent as Favorite } from '../../assets/Post/favorite.svg';
import { ReactComponent as Arrow } from '../../assets/Post/arrow.svg';

import { MakeAComment } from '../MakeAComment/MakeAComment';
import { Comment } from '../Comment/Comment';

import brazil from 'date-fns/locale/pt-BR';
import { formatDistance } from 'date-fns';
import { useState } from 'react';
import { Post } from '../../interfaces/Posts';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [selectedImage, setSelectedImage] = useState(0);

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
  const postLikesAmount = post.post_likes.length - 1;

  return (
    <>
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
          <div className="likes">
            <UserPicture source={post.user?.image} />
            <span>
              Curtido por{' '}
              <label className="user-name">
                {post.post_likes[0]?.user?.name}
              </label>{' '}
              e mais {postLikesAmount}
            </span>
          </div>
          <div className="actions">
            <Share className="icon" />
            <Send className="icon" />
            <Favorite className="icon" />
          </div>
        </div>
        <div className="post-content">
          <h3>{post.user.name}</h3>
          <p>{post.content}</p>
        </div>
        <MakeAComment />
        <Comment />
      </Container>
    </>
  );
}
