import React from 'react';
import Modal from 'react-modal';
import { GrClose } from 'react-icons/gr';
import { RiErrorWarningLine } from 'react-icons/ri';
import { ModalContainer } from './styles';

interface ConfirmModalProps {
  isOpen: boolean;
  confirmationModalText: string;
  onRequestClose: () => void;
  next: () => void;
}

export function ConfirmModal({
  isOpen,
  onRequestClose,
  confirmationModalText,
  next,
}: ConfirmModalProps): JSX.Element {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >
      <button
        className='react-modal-close'
        onClick={onRequestClose}
        type='button'
      >
        <GrClose />
      </button>
      <ModalContainer>
        <RiErrorWarningLine className='warning-icon' />
        <h2>{confirmationModalText}</h2>
        <div className='modal-actions'>
          <button
            type='button'
            className='cancel-button'
            onClick={onRequestClose}
          >
            Cancelar
          </button>
          <button type='button' className='confirm-button' onClick={next}>
            Confirmar
          </button>
        </div>
      </ModalContainer>
    </Modal>
  );
}
