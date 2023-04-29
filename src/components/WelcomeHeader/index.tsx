import { Container, SubTitle, Title } from './styles';

interface WelcomeHeaderProps {
  title: string;
  subTitle: string;
}

export const WelcomeHeader = ({ title, subTitle }: WelcomeHeaderProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
    </Container>
  );
};
