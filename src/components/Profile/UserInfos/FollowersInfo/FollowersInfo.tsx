import { Container } from './styles';

interface FollowersInfoProps {
  value: number;
  text: string;
}

export function FollowersInfo({ value, text }: FollowersInfoProps) {
  return (
    <Container>
      <strong className="value">{value}</strong>
      {text}
    </Container>
  );
}
