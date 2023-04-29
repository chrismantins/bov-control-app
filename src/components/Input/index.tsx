import { View, TextInput, TextInputProps } from 'react-native';
import styled from 'styled-components/native';

// import { Container } from './styles';

export const Input = (props: TextInputProps) => {
  return <InputContainer {...props} />;
};

const InputContainer = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  height: 50px;
  background: #f4f4f4;
  border-radius: 10px;

  padding: 12px 16px;
  margin-bottom: 16px;

  color: #13131a;
`;
