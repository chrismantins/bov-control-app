import styled from 'styled-components/native';
import Ionicons from '@expo/vector-icons/Ionicons';

export const ShowMoreButton = ({ onPress }) => {
  return (
    <Container onPress={onPress}>
      <ShowMoreText>Ver mais detalhes</ShowMoreText>
      <Ionicons name='arrow-forward' size={24} color='#11AFFD' />
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  padding: 20px;

  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ShowMoreText = styled.Text`
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  text-align: center;

  color: #11affd;
`;
