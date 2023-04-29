import { Container, ButtonText } from './styles';

interface ButtonProps {
  text: string;
  onPress: () => void;
  fullWidth?: boolean;
}

export const Button = ({
  text,
  onPress,
  fullWidth = false,
  ...props
}: ButtonProps) => {
  return (
    <Container onPress={onPress} fullWidth={fullWidth} {...props}>
      <ButtonText>{text}</ButtonText>
    </Container>
  );
};
