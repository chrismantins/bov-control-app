import styled from 'styled-components/native';

interface ContainerProps {
  fullWidth: boolean;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  width: ${(props) => (props.fullWidth ? '100%' : '142px')};
  height: 35px;

  background: #0094dd;
  border-radius: 8px;
`;

export const ButtonText = styled.Text`
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  color: #f0f0f5;
`;
