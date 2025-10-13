import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../telas/Login';
import Cadastro from '../telas/Cadastro';
import Home from '../telas/Home'
const Stack = createStackNavigator();

export default function Nav() {
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
        <Stack.Screen options={{headerShown: false}} name="Cadastro" component={Cadastro}/>
        <Stack.Screen options={{headerShown: false}} name="Home" component={Home}/>
      </Stack.Navigator>
  );
}


// import AsyncStorage from '@react-native-async-storage/async-storage';

// async function deletar() {
//   try {
//     await AsyncStorage.clear();
//     alert('APAGADOS.');
//   } catch (err) {
//     console.log(err);
//     alert('ERRO AO APAGAR');
//   }
//}

// CASO EU PRECISE EXCLUIR TODAS AS CONTAS!!!!
