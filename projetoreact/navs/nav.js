import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../telas/Login';
import Cadastro from '../telas/Cadastro';

const Stack = createStackNavigator();

export default function Nav() {
  return (
      <Stack.Navigator initialRouteName="Cadastro">
        <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
        <Stack.Screen options={{headerShown: false}} name="Cadastro" component={Cadastro}/>
      </Stack.Navigator>
  );
}
