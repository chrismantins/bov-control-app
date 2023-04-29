import { useState, useEffect } from 'react';
import { Text, ScrollView, View, Alert } from 'react-native';
import { DefaultPage } from '../_DefaultPage';
import { WelcomeHeader } from '../../components/WelcomeHeader';
import { FormContainer } from '../CreateChecklist/styles';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import {
  ChecklistData,
  useChecklistData,
} from '../../contexts/checklistsContext';
import { useRealm } from '../../databases/infra/realm';
import Geolocation from '@react-native-community/geolocation';

// import { Container } from './styles';

interface FormData {
  farmerName: string;
  farmName: string;
  city: string;
  supervisorName: string;
  type: string;
  amount_of_milk_produced: string;
  number_of_cows_head: string;
  had_supervision: string;
}

export const EditChecklist = () => {
  const { selectedChecklist } = useChecklistData();

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      farmerName: selectedChecklist.from.name,
      farmName: selectedChecklist.farmer.name,
      city: selectedChecklist.farmer.city,
      supervisorName: selectedChecklist.to.name,
      type: selectedChecklist.type,
      amount_of_milk_produced: String(
        selectedChecklist.amount_of_milk_produced
      ),
      number_of_cows_head: String(selectedChecklist.number_of_cows_head),
      had_supervision: String(selectedChecklist.had_supervision),
    },
  });
  const [errors, setErrors] = useState(false);
  const [location, setLocation] = useState<{
    lat: number;
    long: number;
  } | null>(null);

  const realm = useRealm();
  const checklist = realm.objectForPrimaryKey<ChecklistData>(
    'Checklist',
    selectedChecklist._id
  );

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

  const handleEditChecklist = (data: FormData) => {
    if (checklist) {
      realm.write(() => {
        checklist.amount_of_milk_produced = Number(
          data.amount_of_milk_produced
        );
        checklist.number_of_cows_head = Number(data.number_of_cows_head);
        checklist.had_supervision = Boolean(data.had_supervision);
        checklist.farmer = {
          name: data.farmName,
          city: data.city,
        };
        checklist.from = {
          name: data.farmerName,
        };
        checklist.to = {
          name: data.supervisorName,
        };
        checklist.location = {
          latitude: location ? Number(location.lat.toFixed(1)) : 0,
          longitude: location ? Number(location.long.toFixed(1)) : 0,
        };
        checklist.updated_at = new Date().toISOString();
      });
    }
  };

  return (
    <ScrollView>
      <DefaultPage headerProps={{ hasGoBack: true }}>
        <WelcomeHeader
          title={selectedChecklist.farmer.name}
          subTitle='Altere as informação que achar nescessárias e clique em Atualizar'
        />
        <FormContainer>
          <Controller
            control={control}
            name='farmerName'
            render={({ field: { onChange, value } }) => (
              <Input
                keyboardType='name-phone-pad'
                placeholder='Nome do Fazendeiro...'
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name='farmName'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Nome da Fazenda....'
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name='city'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Localização da Fazenda...'
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name='supervisorName'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Nome do Supervisor...'
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name='type'
            render={({ field: { onChange, value } }) => (
              <Select
                items={[
                  { label: 'BPA', value: 'bpa' },
                  { label: 'Antibiótico', value: 'antibiotic' },
                  { label: 'BPF', value: 'bpf' },
                ]}
                placeholder={{ label: 'Tipo do Checklist...', value: null }}
                onValueChange={onChange}
                value={value}
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
            render={({ field: { onChange, value } }) => (
              <Input
                keyboardType='number-pad'
                placeholder='Leite produzido no mes...'
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name='number_of_cows_head'
            render={({ field: { onChange, value } }) => (
              <Input
                keyboardType='number-pad'
                placeholder='Cabeças de Gado...'
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name='had_supervision'
            render={({ field: { onChange, value } }) => (
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
                value={value}
              />
            )}
          />

          {errors && (
            <Text>Por favor preencha todos os campos corretamente</Text>
          )}

          <View>
            <Button
              text='Atualizar'
              onPress={handleSubmit(handleEditChecklist)}
              fullWidth
            />
          </View>
        </FormContainer>
      </DefaultPage>
    </ScrollView>
  );
};
