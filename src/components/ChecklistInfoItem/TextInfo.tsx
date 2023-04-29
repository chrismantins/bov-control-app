import { Text, View } from 'react-native';
import styled from 'styled-components/native';

interface TextInfo {
  title: string;
  value: string;
}

export const TextInfo = ({ title, value, ...props }: TextInfo) => {
  return (
    <View {...props}>
      <Title>{title}:</Title>
      <Value>{value}</Value>
    </View>
  );
};

const Title = styled.Text`
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-transform: uppercase;
  color: #41414d;
`;

const Value = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #676767;
  margin-top: 4px;
`;
