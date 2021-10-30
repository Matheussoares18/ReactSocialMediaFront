import { UserPicture } from '../DefaultComponents/UserPicture/UserPicture';
import { Container } from './styles';
import { ReactComponent as CollectionsIcons } from '../../assets/MakeAPost/collectionsIcons.svg';

export function MakeAPostCard() {
  return (
    <>
      <Container>
        <form className="content">
          <div className="top">
            <UserPicture />
            <textarea name="" placeholder="O que está acontecendo?" />
          </div>
          <div className="bottom">
            <label htmlFor="upload-image">
              <CollectionsIcons className="collections-icon" />
              <input
                type="file"
                id="upload-image"
                multiple
                style={{ display: 'none' }}
              />
            </label>

            <button type="submit">Publicar</button>
          </div>
        </form>
      </Container>
    </>
  );
}
