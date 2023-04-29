import { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';

import { DefaultContainer } from './styles';
import { Header } from '../../components/Header';

interface DefaultPageProps {
  children: ReactNode;
  headerProps?: {
    hasGoBack?: boolean;
    headerText?: string;
  };
}

export const DefaultPage = (props: DefaultPageProps) => {
  return (
    <DefaultContainer>
      <Header {...props?.headerProps} />
      {props.children}
    </DefaultContainer>
  );
};
