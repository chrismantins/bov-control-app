import { Text, TouchableOpacity, View } from 'react-native';
import { format } from 'date-fns';

import { Container, InfoContainer } from './styles';
import { TextInfo } from './TextInfo';
import styled from 'styled-components/native';
import { ShowMoreButton } from './ShowMoreButton';

export const ChecklistInfoItem = ({ data, onPress }) => {
  return (
    <Container>
      <InfoContainer>
        <View>
          <TextInfoMargin title='Fazendeiro' value={data?.from?.name} />
          <TextInfo title='Fazenda' value={data?.farmer?.name} />
        </View>
        <View>
          <View>
            <TextInfo
              title='Criada em'
              value={`${
                data?.created_at &&
                format(new Date(data?.created_at), 'dd/mm/yyyy')
              }`}
            />
          </View>
        </View>
      </InfoContainer>
      <ShowMoreButton onPress={onPress} />
    </Container>
  );
};

const TextInfoMargin = styled(TextInfo)`
  margin-bottom: 16px;
`;
