import { UserPicture } from 'components/DefaultComponents/UserPicture/UserPicture';
import { Container } from 'components/Messages/MessageItem/styles';
import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

interface MessageItemProps {
  chatHubId: string;
  user: {
    name: string;
    lastMessage: string;
    profilePicture?: string;
  };
}

const MessageItem: React.FC<MessageItemProps> = ({ chatHubId, user }) => {
  const { url } = useRouteMatch();
  const history = useHistory();

  return (
    <Container
      to={`${url}/${chatHubId}`}
      isActive={() => history.location.pathname.includes(chatHubId)}
      activeClassName='active'
    >
      <UserPicture source={user.profilePicture} classname='profile-picture' />
      <div className='name-and-last-message'>
        <span>{user.name}</span>
        <p>{user.lastMessage}</p>
      </div>
    </Container>
  );
};

export default MessageItem;
