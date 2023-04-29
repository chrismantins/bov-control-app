import { useState, useEffect } from 'react';
import { Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import { WelcomeHeader } from '../../components/WelcomeHeader';
import { Button } from '../../components/Button';

import { DefaultPage } from '../_DefaultPage';
import { useNavigation } from '@react-navigation/native';

import { ChecklistsContainer, ButtonContainer } from './styles';
import { useQuery } from '../../databases/infra/realm';
import { ChecklistInfoItem } from '../../components/ChecklistInfoItem';
import { useChecklistData } from '../../contexts/checklistsContext';
const API_URI = 'http://challenge-front-end.bovcontrol.com';

export const Home = () => {
  const [hasConnection, setHasConnection] = useState(false);
  const { checklists, setChecklists, setSelectedChecklist } =
    useChecklistData();
  const data = useQuery('Checklist');
  const navigation = useNavigation();

  const getRealmData = () => {
    if (data) setChecklists(data);
  };

  useEffect(() => {
    getRealmData();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log(state);
      setHasConnection(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (hasConnection) sendDataToAPI();
  }, [hasConnection]);

  const sendDataToAPI = async () => {
    if (!checklists) return;
    const payload = {
      checklists: [...checklists],
    };
    if (hasConnection) {
      try {
        const response = await fetch(`${API_URI}/v1/checkList`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          return console.log('Error on Send Data to API');
        }
        return console.log('Data sent to API');
      } catch (error) {
        return console.error(error);
      }
    } else {
      console.log('No internet connection, cannot send data to API');
    }
  };

  return (
    <DefaultPage
      headerProps={{
        headerText: `Total de ${checklists.length} ${
          checklists.length === 1 ? 'checklist' : 'checklists'
        }`,
      }}
    >
      <WelcomeHeader
        title='Bem-vindo!'
        subTitle='Veja suas checklists abaixo ou crie uma nova!'
      />
      <ButtonContainer>
        <Button
          text='Novo checklist'
          onPress={() => navigation.navigate('CreateChecklist')}
        />
      </ButtonContainer>

      <ChecklistsContainer>
        {checklists.length > 0 ? (
          checklists.map((checklist) => {
            return (
              <ChecklistInfoItem
                key={checklist._id}
                data={checklist}
                onPress={() => {
                  setSelectedChecklist(checklist);
                  return navigation.navigate('ViewChecklist');
                }}
              />
            );
          })
        ) : (
          <Text>Sem checklists</Text>
        )}
      </ChecklistsContainer>
    </DefaultPage>
  );
};
