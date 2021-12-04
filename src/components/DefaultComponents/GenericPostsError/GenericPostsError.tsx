import { LoadingPostsError } from './styles';
import { ReactComponent as PostErrorEmote } from '../../../assets/postErrorEmote.svg';

export function GenericPostsError() {
  return (
    <LoadingPostsError>
      <div className="text-and-emote">
        <PostErrorEmote className="emote" />
        <p>
          Estamos com dificuldades em exibir esse conteúdo, alguém derrubou o
          servidor, porém não se preocupe! estamos em processo de levantamento.
        </p>
      </div>
    </LoadingPostsError>
  );
}
