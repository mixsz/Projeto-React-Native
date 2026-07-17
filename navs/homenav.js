import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Jogo1nav from '../navs/jogo1nav'
import Jogo2nav from '../navs/jogo2nav'

const Stack = createStackNavigator();

export default function Homenav({ route }) {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{headerShown: false}} name="Home" component={Home} initialParams={{ perfil: route.params.perfil }}/>
        <Stack.Screen options={{headerShown: false}} name="Jogo1nav" component={Jogo1nav} initialParams={{ perfil: route.params.perfil }}
        />
        <Stack.Screen options={{headerShown: false}} name="Jogo2nav" component={Jogo2nav} initialParams={{ perfil: route.params.perfil }}
        />
      </Stack.Navigator>
  );
}