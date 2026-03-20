import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';


import Nav from './navs/nav'

export default class App extends React.Component {
  render() {
    return(
    <NavigationContainer>
      <Nav/>
    </NavigationContainer>
    );
  }
}

/**
 * sites:
 * 
 * https://icons.expo.fyi/Index
 * https://www.remove.bg/pt-br/upload
 * https://pixabay.com/sound-effects/search/
 * 
 * 
 */
