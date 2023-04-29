import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './src/pages/Home';
import { CreateChecklist } from './src/pages/CreateChecklist';
import { RealmProvider } from './src/databases/infra/realm';
import { ChecklistProvider } from './src/contexts/checklistsContext';
import { EditChecklist } from './src/pages/EditChecklist';
import { ViewChecklist } from './src/pages/ViewChecklist';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RealmProvider>
      <ChecklistProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='CreateChecklist' component={CreateChecklist} />
            <Stack.Screen name='EditChecklist' component={EditChecklist} />
            <Stack.Screen name='ViewChecklist' component={ViewChecklist} />
          </Stack.Navigator>
          <StatusBar style='dark' backgroundColor='#fff' />
        </NavigationContainer>
      </ChecklistProvider>
    </RealmProvider>
  );
}
