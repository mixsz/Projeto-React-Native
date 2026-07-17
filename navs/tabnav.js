import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Homenav from '../navs/homenav';

const Tab = createBottomTabNavigator();

export default class TabNav extends React.Component {

  render() {
    return(
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#d0f6fe", 
            height: 80, 
            borderTopColor: "#a3a3a3",
            borderTopWidth: 1,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          tabBarActiveTintColor: "#0a0886",
          tabBarInactiveTintColor: "#232424",
        }}
      >
        <Tab.Screen name="Homenav" component={Homenav} initialParams={{ perfil: this.props.route.params.perfil }} 
          options={{ headerShown: false, tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name="home" color={color} size={size}/>)
          }}
        />
      </Tab.Navigator>
    )
  }
}
