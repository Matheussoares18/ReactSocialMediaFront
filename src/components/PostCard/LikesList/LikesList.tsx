import React from 'react';
import Modal from 'react-modal';
import { PostLikes } from '../../../interfaces/Posts';
import { UserPicture } from '../../DefaultComponents/UserPicture/UserPicture';
import { ItemsList, ModalContainer, ModalHeader } from './styles';

interface LikesListProps {
  modalIsOpen: boolean;
  handleCloseModal: () => void;
  likesList: PostLikes[];
}

export function LikesList({
  modalIsOpen,
  handleCloseModal,
  likesList,
}: LikesListProps) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '30%',
      height: '60%',
      maxWidth: '700px',
      padding: '0px',
      minWidth: '300px',
      margin: '0px',
      border: 'none',
      borderRadius: '8px',
      zIndex: 13,
      overflow: 'hidden',
      maxHeight: '510px',
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0, 0.8)',
    },
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      style={customStyles}
      onRequestClose={() => handleCloseModal()}
    >
      <ModalContainer>
        <ModalHeader>
          {' '}
          <h1>Curtidas</h1>
        </ModalHeader>

        <ItemsList>
          {likesList.length > 0 ? (
            likesList.map((like) => (
              <div className="item" key={like.id}>
                <div className="pic-and-name">
                  <UserPicture source={like.user.image} />
                  <span className="name">{like.user?.name}</span>
                </div>
                <button disabled>Seguir</button>
              </div>
            ))
          ) : (
            <h1>Nenhuma curtida</h1>
          )}
        </ItemsList>
      </ModalContainer>
    </Modal>
  );
}
