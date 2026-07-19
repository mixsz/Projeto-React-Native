import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { cores, fontes } from '../styles/tema';

export default class Jogo2 extends React.Component {
  render() {
    return (
      <View style={estilos.tudo}>
        <Image source={require('../assets/cardduel.png')} style={estilos.logo} />
        <View style={estilos.botoes}>
          <TouchableOpacity style={estilos.botao} onPress={() => this.props.navigation.navigate('Jogo2play')} activeOpacity={0.6}>
            <View style={estilos.nomeicons}>
              <Ionicons name="game-controller" size={24} color={cores.azulAccent} style={estilos.icon} />
              <Text style={[estilos.textobotao, { right: 8 }]}> Jogar </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.botao} onPress={() => this.props.navigation.navigate('Jogo2tutorial')} activeOpacity={0.6}>
            <View style={estilos.nomeicons}>
              <Entypo name="help-with-circle" size={24} color={cores.azulAccent} style={estilos.icon2} />
              <Text style={[estilos.textobotao, { left: 1 }]}> Tutorial </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.botao} onPress={() => this.props.navigation.navigate('Home')} activeOpacity={0.7}>
            <View style={estilos.nomeicons}>
              <Ionicons name="arrow-back-outline" size={30} color={cores.azulAccent} style={estilos.icon2} />
              <Text style={[estilos.textobotao, { right: 3 }]}> Voltar </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const estilos = StyleSheet.create({
  tudo: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  botao: {
    borderRadius: 13,
    width: '90%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.textoCinza,
    marginLeft: -1,
    marginBottom: 60,
  },
  textobotao: {
    fontSize: 20,
    fontFamily: fontes.padrao,
    color: cores.azulAccent,
    fontWeight: 'bold',
  },
  logo: {
    height: 240,
    width: 260,
    marginLeft: 'auto',
    marginRight: 'auto',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 30,
    marginBottom: 30,
  },
  botoes: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 10,
  },
  nomeicons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    right: 13,
  },
  icon2: {
    marginRight: 3,
  },
});