import * as React from 'react';
import { TextInput, Text, View, Button,StyleSheet,FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { Card, Paragraph, Title } from 'react-native-paper';

import Nav from './navs/nav'


export default class App extends React.Component {
  render() {
    return(
    <NavigationContainer>
      <Nav />
    </NavigationContainer>
    );
  }
}
