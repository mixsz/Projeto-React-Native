import { createStackNavigator } from '@react-navigation/stack';
import Jogo1 from '../telas/Jogo1';
import Jogo1tutorial from '../telas/Jogo1tutorial'
import Jogo1play from '../telas/Jogo1play'
const Stack = createStackNavigator();

export default function Jogo1nav({ route }) {
  return (
      <Stack.Navigator initialRouteName="Jogo1">
        <Stack.Screen options={{headerShown: false}} name="Jogo1" component={Jogo1} //initialParams={{ perfil: route.params.perfil }}
        />
        <Stack.Screen options={{headerShown: false}} name="Jogo1tutorial" component={Jogo1tutorial} // initialParams={{ perfil: route.params.perfil }}
        />
         <Stack.Screen options={{headerShown: false}} name="Jogo1play" component={Jogo1play} // initialParams={{ perfil: route.params.perfil }}
        />
      </Stack.Navigator>
  );
}