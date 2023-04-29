import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 32px;
`;

export const Logo = styled.Image`
  width: 47px;
  height: 47px;
`;

export const ReturnButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
`;

export const HeaderText = styled.Text`
  /* font-family: 'Roboto'; */
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  color: #737380;
`;
