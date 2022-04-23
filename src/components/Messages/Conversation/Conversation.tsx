import React from 'react';
import { ReactComponent as More } from 'assets/Post/more.svg';
import { UserPicture } from 'components/DefaultComponents/UserPicture/UserPicture';
import {
  Container,
  ConversationBottom,
  ConversationHeader,
} from 'components/Messages/Conversation/styles';
import { AiOutlinePaperClip, AiOutlineSend } from 'react-icons/ai';
import { ConversationMessages } from 'components/Messages/ConversationMessages/ConversationMessages';

const Conversation: React.FC = () => {
  return (
    <Container>
      <ConversationHeader>
        <div className='top-container'>
          <div className='user-infos'>
            <UserPicture />
            <p>Matheus Soares</p>
          </div>
          <More className='more-icon' />
        </div>
      </ConversationHeader>
      <ConversationMessages />
      <ConversationBottom>
        <div className='conversation-container'>
          <textarea
            className='message'
            placeholder='Escreva sua mensagem...'
            style={{ outline: 'none' }}
          />
          <button type='button' className='clip-button'>
            <AiOutlinePaperClip className='icon' />
          </button>
          <button type='button' className='send-button'>
            <AiOutlineSend className='icon' />
          </button>
        </div>
      </ConversationBottom>
    </Container>
  );
};

export default Conversation;
