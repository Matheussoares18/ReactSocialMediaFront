import { Header } from 'components/DefaultComponents/Header/Header';
import { Messages } from 'components/Messages/Messages';
import { Container } from 'pages/MessagesPage/styles';
import React from 'react';

const MessagesPage: React.FC = () => {
  return (
    <Container>
      <Header />
      <Messages />
    </Container>
  );
};

export { MessagesPage };
