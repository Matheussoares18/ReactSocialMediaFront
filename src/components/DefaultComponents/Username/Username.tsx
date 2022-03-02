import React from 'react';
import { Link } from 'react-router-dom';
import { PublicRoutes } from 'Routes/RoutesEnum';

interface UsernameProps {
  id: string;
  className: string;
}

const Username: React.FC<UsernameProps> = ({ id, children, className }) => {
  return (
    <Link to={`${PublicRoutes.PROFILE}/${id}`} className={className}>
      {children}
    </Link>
  );
};

export default Username;
