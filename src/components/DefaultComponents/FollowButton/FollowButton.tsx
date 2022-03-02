import { Spinner } from 'components/DefaultComponents/Spinner/Spinner';
import React, { HTMLAttributes } from 'react';
import { HiOutlineUserAdd, HiOutlineEmojiSad } from 'react-icons/hi';

import { Button } from './styles';

enum States {
  DEFAULT = 'default',
  LOADING = 'loading',
  ERROR = 'error',
}

interface FollowButtonProps extends HTMLAttributes<HTMLButtonElement> {
  alreadyFollowing?: boolean;
  disabled?: boolean;
  state: States;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  alreadyFollowing = false,
  state,
  disabled = false,
  ...rest
}) => {
  return (
    <Button
      type='button'
      {...rest}
      alreadyFollowing={alreadyFollowing}
      disabled={state === States.LOADING || state === States.ERROR || disabled}
    >
      {
        {
          [States.DEFAULT]: (
            <>
              <HiOutlineUserAdd className='icon' />
              {alreadyFollowing ? 'Seguindo' : 'Seguir'}
            </>
          ),
          [States.LOADING]: <Spinner />,
          [States.ERROR]: <HiOutlineEmojiSad />,
        }[state]
      }
    </Button>
  );
};

export default FollowButton;
