import { createStackNavigator } from '@react-navigation/stack';
import Tela7 from '../telas/Tela7';

const Stack = createStackNavigator();

export default function Jogo2nav({ route }) {
  return (
      <Stack.Navigator initialRouteName="Tela7">
        <Stack.Screen options={{headerShown: false}} name="Tela7" component={Tela7} //initialParams={{ perfil: route.params.perfil }}
        />
      </Stack.Navigator>
  );
}