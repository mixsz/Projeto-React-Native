import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';


import Nav from './navs/nav'
import Jogo1nav from './navs/jogo1nav' // dps descomenta nas NAVS n esquece!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!@@#@@@
import Jogo1tutorial from './telas/Jogo1tutorial'
import Login from './telas/Login'
import Cadastro from './telas/Cadastro'
import Jogo1 from './telas/Jogo1'
import Jogo1play from './telas/Jogo1play'
import Jogo2nav from './navs/jogo2nav'
import Jogo2 from './telas/Jogo2'
import Jogo2tutorial from './telas/Jogo2tutorial'
import Jogo2play from './telas/Jogo2play'

export default class App extends React.Component {
  render() {
    return(
    <NavigationContainer>
      <Jogo2play/>
    </NavigationContainer>
    );
  }
}
