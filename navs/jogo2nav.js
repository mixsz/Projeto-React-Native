import { createStackNavigator } from "@react-navigation/stack";
import Jogo2 from "../screens/Jogo2";
import Jogo2tutorial from "../screens/Jogo2tutorial";
import Jogo2play from "../screens/Jogo2play";

const Stack = createStackNavigator();

export default function Jogo2nav({ route }) {
  return (
    <Stack.Navigator initialRouteName="Jogo2">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Jogo2"
        component={Jogo2}
        initialParams={{ perfil: route.params.perfil }}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Jogo2tutorial"
        component={Jogo2tutorial}
        initialParams={{ perfil: route.params.perfil }}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Jogo2play"
        component={Jogo2play}
        initialParams={{ perfil: route.params.perfil }}
      />
    </Stack.Navigator>
  );
}
