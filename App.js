import 'react-native-gesture-handler';

import React from 'react';
import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Inicio from './views/inicio';
import DetallesCliente from './views/detallesCliente';
import NuevoCliente from './views/nuevoCliente';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import BarraSuperior from './components/ui/barra';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1774F2',
    accent: '#0655bf',
  },
  // dark: true,
};
const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: theme.colors.surface,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }}
          initialRouteName="Inicio">
          <Stack.Screen
            options={({navigation, route}) => ({
              // headerLeft: (props) => (
              //   <BarraSuperior
              //     {...props}
              //     navigation={navigation}
              //     route={route}
              //   />
              // ),
            })}
            name="Inicio"
            component={Inicio}
          />
          <Stack.Screen
            options={{
              title: 'Nuevo Cliente',
            }}
            name="NuevoCliente"
            component={NuevoCliente}
          />
          <Stack.Screen
            options={{
              title: 'Detalles Cliente',
            }}
            name="DetallesCliente"
            component={DetallesCliente}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
