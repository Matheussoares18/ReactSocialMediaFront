import { UserPicture } from '../DefaultComponents/UserPicture/UserPicture';
import { Container } from './styles';

export function Comment() {
  return (
    <Container>
      <UserPicture />
      <div className="name-and-comment">
        <h3>Matheus Soares</h3>
        <div className="comment-container">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen{' '}
          </p>
        </div>
      </div>
    </Container>
  );
}
