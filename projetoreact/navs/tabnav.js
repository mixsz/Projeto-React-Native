import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Home from '../telas/Home';
import Tela4 from '../telas/Tela4';


const Tab = createBottomTabNavigator();

export default class TabNav extends React.Component {

  render() {
    return(
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#d0f6fe", 
            height: 60, 
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
        <Tab.Screen name="Home" component={Home} //initialParams={{ perfil: this.props.route.params.perfil }} 
          options={{ headerShown: false,
            tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name="home" color={color} size={size}/>)
          }}
        />
        <Tab.Screen name="Tela4" component={Tela4} //initialParams={{ perfil: this.props.route.params.perfil}}
          options={{headerShown: false,
            tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name="account-details" color={color} size={size}/>)
          }}
        />
      </Tab.Navigator>
    )
  }
}


