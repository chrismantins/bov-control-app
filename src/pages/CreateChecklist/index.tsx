import { Alert, Text, ScrollView } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import uuid from 'react-native-uuid';
import Geolocation from '@react-native-community/geolocation';

import { DefaultPage } from '../_DefaultPage';

import { Input } from '../../components/Input';
import { WelcomeHeader } from '../../components/WelcomeHeader';
import { Button } from '../../components/Button';
import { Select } from '../../components/Select';

import { ButtonContainer, FormContainer, Container } from './styles';
import { useEffect, useState } from 'react';
import { formIsValid } from './validation';
import { useRealm } from '../../databases/infra/realm';
import { useNavigation } from '@react-navigation/native';

// import { Container } from './styles';

interface FormData {
  farmerName: string;
  farmName: string;
  city: string;
  supervisorName: string;
  type: 'BPA' | 'Antibiótico' | 'BPF';
  amount_of_milk_produced: number;
  number_of_cows_head: number;
  had_supervision: boolean;
}

export const CreateChecklist = () => {
  const realm = useRealm();
  const { control, handleSubmit } = useForm<FormData>();
  const [location, setLocation] = useState<{
    lat: number;
    long: number;
  } | null>(null);
  const [errors, setErrors] = useState(false);
  const navigation = useNavigation();

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, long: pos.coords.longitude });
      },
      (error) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 1000 }
    );
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  const handleCreateChecklist: SubmitHandler<FormData> = async (data) => {
    const fieldsWithErros = formIsValid(data);
    console.log('dataisValid', fieldsWithErros);
    if ([...fieldsWithErros].length > 0) {
      return setErrors(true);
    }
    setErrors(false);
    const checklist = {
      _id: uuid.v4(),
      type: data.type,
      amount_of_milk_produced: Number(data.amount_of_milk_produced),
      number_of_cows_head: Number(data.number_of_cows_head),
      had_supervision: Boolean(data.had_supervision),
      farmer: {
        name: data.farmName,
        city: data.city,
      },
      from: {
        name: data.farmerName,
      },
      to: {
        name: data.supervisorName,
      },
      location: {
        latitude: location && Number(location.lat.toFixed(1)),
        longitude: location && Number(location.long.toFixed(1)),
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    console.log(checklist);
    realm.write(() => {
      realm.create('Checklist', checklist);
    });
    Alert.alert('Checklist criado!', 'O checklist foi criado com sucesso!', [
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate('Home');
        },
      },
    ]);
  };

  return (
    <Container>
      <ScrollView>
        <DefaultPage headerProps={{ hasGoBack: true }}>
          <WelcomeHeader
            title='Nova Checklist'
            subTitle='Preencha os campos abaixo para cadastrar uma checklist:'
          />
          <FormContainer>
            <Controller
              control={control}
              name='farmerName'
              render={({ field: { onChange } }) => (
                <Input
                  keyboardType='name-phone-pad'
                  placeholder='Nome do Fazendeiro...'
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name='farmName'
              render={({ field: { onChange } }) => (
                <Input
                  placeholder='Nome da Fazenda....'
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name='city'
              render={({ field: { onChange } }) => (
                <Input
                  placeholder='Localização da Fazenda...'
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name='supervisorName'
              render={({ field: { onChange } }) => (
                <Input
                  placeholder='Nome do Supervisor...'
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name='type'
              render={({ field: { onChange } }) => (
                <Select
                  items={[
                    { label: 'BPA', value: 'bpa' },
                    { label: 'Antibiótico', value: 'antibiotic' },
                    { label: 'BPF', value: 'bpf' },
                  ]}
                  placeholder={{ label: 'Tipo do Checklist...', value: null }}
                  onValueChange={onChange}
                />
                // <Input
                //   placeholder='Tipo do Checklist...'
                //   onChangeText={onChange}
                // />
              )}
            />

            <Controller
              control={control}
              name='amount_of_milk_produced'
              render={({ field: { onChange } }) => (
                <Input
                  keyboardType='number-pad'
                  placeholder='Leite produzido no mes...'
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name='number_of_cows_head'
              render={({ field: { onChange } }) => (
                <Input
                  keyboardType='number-pad'
                  placeholder='Cabeças de Gado...'
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name='had_supervision'
              render={({ field: { onChange } }) => (
                <Select
                  items={[
                    { label: 'Sim', value: 'true' },
                    { label: 'Não', value: 'false' },
                  ]}
                  placeholder={{
                    label: 'Teve supervisão esse mês?',
                    value: null,
                  }}
                  onValueChange={onChange}
                />
              )}
            />

            {errors && (
              <Text>Por favor preencha todos os campos corretamente</Text>
            )}

            <ButtonContainer>
              <Button
                text='Criar Checklist'
                onPress={handleSubmit(handleCreateChecklist)}
                fullWidth
              />
            </ButtonContainer>
          </FormContainer>
        </DefaultPage>
      </ScrollView>
    </Container>
  );
};
