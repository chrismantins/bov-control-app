import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import styled from 'styled-components/native';

import { TextInfo } from '../../components/ChecklistInfoItem/TextInfo';
import { useChecklistData } from '../../contexts/checklistsContext';
import { DefaultPage } from '../_DefaultPage';
import { WelcomeHeader } from '../../components/WelcomeHeader';
import { Button } from '../../components/Button';

// import { Container } from './styles';

export const ViewChecklist = () => {
  const { selectedChecklist } = useChecklistData();

  const navigation = useNavigation();

  return (
    <DefaultPage headerProps={{ hasGoBack: true }}>
      <WelcomeHeader
        title={selectedChecklist.farmer.name}
        subTitle='Informações completas sobre o checklist selecionado:'
      />
      <Container>
        <Row>
          <TextInfo title='nome' value={selectedChecklist.from.name} />
          <TextInfo
            title='criada em'
            value={`${format(
              new Date(selectedChecklist.created_at),
              'dd/mm/yyyy'
            )}`}
          />
        </Row>
        <Row>
          <TextInfo title='fazenda' value={selectedChecklist.farmer.name} />
        </Row>

        <Row>
          <TextInfo title='localização' value={selectedChecklist.farmer.city} />
        </Row>

        <Row>
          <TextInfo title='Supervisor' value={selectedChecklist.to.name} />
        </Row>

        <Row>
          <TextInfo title='tipo' value={selectedChecklist.type.toUpperCase()} />
          <TextInfo
            title='TEVE Supervisão esse mês?'
            value={selectedChecklist.had_supervision ? 'SIM' : 'NÃO'}
          />
        </Row>

        <Row>
          <TextInfo
            title='quantidade de leite no mês'
            value={`${selectedChecklist.amount_of_milk_produced} ${
              selectedChecklist.amount_of_milk_produced === 1
                ? 'litro'
                : 'litros'
            }`}
          />
        </Row>
        <Row nomargin>
          <TextInfo
            title='quantidade de leite no mês'
            value={`${selectedChecklist.number_of_cows_head} ${
              selectedChecklist.number_of_cows_head === 1 ? 'cabeça' : 'cabeças'
            }`}
          />
        </Row>
      </Container>
      <Button
        text='Editar Checklist'
        onPress={() => navigation.navigate('EditChecklist')}
        fullWidth
      />
    </DefaultPage>
  );
};

const Container = styled.View`
  background: #f7f7f7;
  border-radius: 8px;
  padding: 24px;
  margin-top: 32px;
  margin-bottom: 32px;
`;

interface RowProps {
  nomargin?: boolean;
}

const Row = styled.View<RowProps>`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${(props) => (props.nomargin ? '0' : '16px')};
`;
