import { UserPicture } from 'components/DefaultComponents/UserPicture/UserPicture';
import {
  IncomingMessage,
  Container,
  Content,
  OutcommingMessage,
} from 'components/Messages/ConversationMessages/styles';
import React from 'react';

const ConversationMessages: React.FC = () => {
  return (
    <Container>
      <Content>
        <IncomingMessage>
          <UserPicture classname='profile-picture ' />
          <div className='user-infos-and-message'>
            <span className='username'>Agnaldo alberto</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
              similique quod. Tempora deserunt dolor voluptatum nesciunt,
              repudiandae ipsum dolorem laboriosam? Rerum quaerat architecto
              vitae illum, eaque alias debitis? Blanditiis, fugiat.
            </p>
          </div>
        </IncomingMessage>
        <IncomingMessage isSequence>
          <UserPicture classname='profile-picture ' />
          <div className='user-infos-and-message'>
            <span className='username'>Agnaldo alberto</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
            </p>
          </div>
        </IncomingMessage>
        <IncomingMessage isSequence>
          <UserPicture classname='profile-picture ' />
          <div className='user-infos-and-message'>
            <span className='username'>Agnaldo alberto</span>
            <p>Lorem</p>
          </div>
        </IncomingMessage>
        <OutcommingMessage>
          <div className='user-infos-and-message'>
            <span className='username'>Agnaldo alberto</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
              similique quod. Tempora deserunt dolor voluptatum nesciunt,
              repudiandae ipsum dolorem laboriosam? Rerum quaerat architecto
              vitae illum, eaque alias debitis? Blanditiis, fugiat.
            </p>
          </div>
          <UserPicture classname='profile-picture ' />
        </OutcommingMessage>
        <OutcommingMessage isSequence>
          <div className='user-infos-and-message'>
            <span className='username'>Agnaldo alberto</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
              similique quod.
            </p>
          </div>
          <UserPicture classname='profile-picture ' />
        </OutcommingMessage>
      </Content>
    </Container>
  );
};

export { ConversationMessages };
