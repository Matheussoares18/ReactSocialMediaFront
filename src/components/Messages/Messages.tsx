import Conversation from 'components/Messages/Conversation/Conversation';
import MessageItem from 'components/Messages/MessageItem/MessageItem';
import { Container, MessagesList } from 'components/Messages/styles';
import { useUserInfos } from 'hooks/useUserInfos';
import React from 'react';

const Messages: React.FC = () => {
  const user = useUserInfos();
  return (
    <Container>
      <MessagesList>
        <MessageItem
          chatHubId='13'
          user={{
            name: 'Matheus Soares',
            lastMessage: 'Que rede daora',
            profilePicture: user?.image,
          }}
        />
        <MessageItem
          chatHubId='14'
          user={{ name: 'Adenor Alberto', lastMessage: 'Bora ae caraio' }}
        />
      </MessagesList>
      <Conversation />
    </Container>
  );
};

export { Messages };
