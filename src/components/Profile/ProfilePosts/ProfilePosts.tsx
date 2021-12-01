import { PostCard } from '../../PostCard/PostCard';
import { Container } from './styles';

export function ProfilePosts() {
  const post = {
    id: '1234',
    content: 'content 123',
    image: 'https://www.imagemhost.com.br/images/2021/09/30/images.jpg',
    created_at: String(new Date()),
    updated_at: String(new Date()),
    user_id: '123213-12312-3123-123-123',
    post_images: [
      {
        image: 'https://www.imagemhost.com.br/images/2021/09/30/images.jpg',
        created_at: String(new Date()),
      },
    ],
    post_likes: [],
    post_comments: [],
    user: {
      id: '1231231-231231-2312-31-23-1',
      name: 'awdawdawd',
      email: 'soawakdjawkd@fmaiawdka.com',
      birth_date: '22/11/2001',
      gender: 'F',
      password: '123123',
      image: 'https://www.imagemhost.com.br/images/2021/09/30/images.jpg',
    },
  };

  return (
    <Container>
      <PostCard post={post} />
    </Container>
  );
}
