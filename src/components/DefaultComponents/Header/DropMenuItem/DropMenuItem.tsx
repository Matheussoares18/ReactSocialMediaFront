import React from 'react';
import { IconType } from 'react-icons';
import { Container } from './styles';

// import { Container } from './styles';
interface DropMenuItemProps {
  label: string;
  icon?: IconType;
  onClick?: () => void;
}

const DropMenuItem: React.FC<DropMenuItemProps> = ({
  children,
  label,
  icon: Icon,
  onClick,
}) => {
  return (
    <Container onClick={onClick}>
      <div className="content">
        {Icon && <Icon className="icon" />}
        {children}
        <span>{label}</span>
      </div>
    </Container>
  );
};

export default DropMenuItem;
