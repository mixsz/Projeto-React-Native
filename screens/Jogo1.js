import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { cores, fontes, sombraPadrao } from '../styles/tema';

export default class Jogo1 extends React.Component {
  render() {
    return (
      <View style={estilos.tudo}>
        <Image source={require('../assets/logojogo1.png')} style={estilos.logo} />
        <Text style={estilos.linha}> </Text>
        <View style={estilos.botoes}>
          <TouchableOpacity style={estilos.botao} onPress={() => this.props.navigation.navigate('Jogo1play')} activeOpacity={0.6}>
            <View style={estilos.nomeicons}>
              <Ionicons name="game-controller" size={24} color={cores.branco} style={estilos.icon} />
              <Text style={[estilos.textobotao, { right: 8 }]}> Jogar </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.botao} onPress={() => this.props.navigation.navigate('Jogo1tutorial')} activeOpacity={0.6}>
            <View style={estilos.nomeicons}>
              <Entypo name="help-with-circle" size={24} color={cores.branco} style={estilos.icon2} />
              <Text style={[estilos.textobotao, { left: 1 }]}> Tutorial </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.botao} onPress={() => this.props.navigation.navigate('Home')} activeOpacity={0.7}>
            <View style={estilos.nomeicons}>
              <Ionicons name="arrow-back-outline" size={30} color={cores.branco} style={estilos.icon2} />
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
    backgroundColor: cores.azulClaro,
    marginLeft: -1,
    marginBottom: 60,
    shadowColor: '#000',
    ...sombraPadrao,
  },
  textobotao: {
    fontSize: 20,
    fontFamily: fontes.padrao,
    color: cores.branco,
    fontWeight: 'bold',
  },
  logo: {
    height: 250,
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 10,
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
  linha: {
    borderTopWidth: 1,
    borderColor: '#0e1f8b',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});