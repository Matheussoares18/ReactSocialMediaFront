import { UserPicture } from '../DefaultComponents/UserPicture/UserPicture';
import { Container } from './styles';

export function MakeAComment() {
  return (
    <>
      <Container>
        <div className="user-and-input">
          <UserPicture />
          <input placeholder="Escreva um comentário..."></input>
        </div>
        <button>Comentar</button>
      </Container>
    </>
  );
}
