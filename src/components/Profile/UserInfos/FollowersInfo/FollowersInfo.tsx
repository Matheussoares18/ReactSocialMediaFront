import { Container } from './styles';

interface FollowersInfoProps {
  value: number;
  text: string;
}

export function FollowersInfo({
  value,
  text,
}: FollowersInfoProps): JSX.Element {
  return (
    <Container>
      <strong className='value'>{value}</strong>
      <span className='label'>{text}</span>
    </Container>
  );
}
