import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';


import Nav from './navs/nav'
import Jogo1nav from './navs/jogo1nav' // dps descomenta na JOGO1NAV n esquece!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!@@#@@@
import Jogo1tutorial from './telas/Jogo1tutorial'
import Login from './telas/Login'
import Cadastro from './telas/Cadastro'
import Jogo1 from './telas/Jogo1'

export default class App extends React.Component {
  render() {
    return(
    <NavigationContainer>
      <Nav/>
    </NavigationContainer>
    );
  }
}
