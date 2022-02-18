import { useUserInfos } from 'hooks/useUserInfos';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface Props extends RouteProps {
  component: React.FC<unknown>;
}

const ProtectedRoute: React.FC<Props> = ({
  component: Component,
  ...rest
}: Props) => {
  const authUser = useUserInfos();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function validateUser(props: any) {
    if (authUser) {
      return <Component {...props} />;
    }

    return (
      <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    );
  }

  return <Route {...rest} render={(props) => validateUser(props)} />;
};
export default ProtectedRoute;
