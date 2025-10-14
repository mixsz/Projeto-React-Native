import { createStackNavigator } from '@react-navigation/stack';
import Jogo1 from '../telas/Jogo1';
import Tela5 from '../telas/Tela5'
const Stack = createStackNavigator();

export default function Jogo1nav({ route }) {
  return (
      <Stack.Navigator initialRouteName="Jogo1">
        <Stack.Screen options={{headerShown: false}} name="Jogo1" component={Jogo1} initialParams={{ perfil: route.params.perfil }}
        />
        <Stack.Screen options={{headerShown: false}} name="Tela5" component={Tela5}initialParams={{ perfil: route.params.perfil }}
        />
      </Stack.Navigator>
  );
}