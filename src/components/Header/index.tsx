import { Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Container, Logo, HeaderText } from './styles';
import { useNavigation } from '@react-navigation/native';

const LogoImg = require('../../../assets/bov-control-logo.png');

interface HeaderProps {
  hasGoBack?: boolean;
  headerText?: string;
}

export const Header = ({ hasGoBack = false, headerText = '' }: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <Container>
      <Logo source={LogoImg} />
      {hasGoBack && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name='arrow-back' size={24} color='#11AFFD' />
        </TouchableOpacity>
      )}
      {headerText && headerText !== '' && <HeaderText>{headerText}</HeaderText>}
    </Container>
  );
};
