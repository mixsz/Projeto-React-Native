import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { cores, fontes, sombraPadrao } from '../styles/tema';

export default class Jogo1tutorial extends React.Component {
  render() {
    return (
      <View style={estilos.tudo}>
        <View style={estilos.box}>
          <Image source={require('../assets/logojogo1.png')} style={estilos.logo} />
          <Text style={estilos.linha}> </Text>
          <View style={estilos.texto}>
            <Text style={estilos.titulo}>Como jogar?</Text>
            <Text style={estilos.palavra}>Neste jogo, seu objetivo é descobrir qual operador utilizar:</Text>
            <Text style={estilos.palavra}>• Soma (+)</Text>
            <Text style={estilos.palavra}>• Subtração (-)</Text>
            <Text style={estilos.palavra}>• Multiplicação (×)</Text>
            <Text style={estilos.palavra}>• Divisão (÷)</Text>
            <Text> </Text>
            <Text style={estilos.palavra}>
              Dentro de 10 rodadas, os números serão exibidos na tela, e você deverá completar o sinal que falta
              corretamente para realizar a operação, adivinhe o máximo de sinais que conseguir!
            </Text>
            <Text> </Text>
            <Text style={estilos.palavra}>Cada acerto vale 1 ponto, e a média necessária para passar é 6.</Text>
            <Text> </Text>
            <Text style={estilos.palavra}>Obs: O jogo fica mais difícil conforme as rodadas avançam.</Text>
          </View>
          <TouchableOpacity style={estilos.botao} onPress={() => this.props.navigation.navigate('Jogo1')} activeOpacity={0.6}>
            <Text style={estilos.textobotao2}>Entendido</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={estilos.setaBack} onPress={() => this.props.navigation.navigate('Jogo1')}>
          <Text style={{ fontSize: 46, color: cores.azulEscuro }}>←</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const estilos = StyleSheet.create({
  tudo: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  box: {
    backgroundColor: cores.fundo,
    height: 680,
    width: 330,
    margin: 'auto',
    borderRadius: 10,
    bottom: -10,
    paddingTop: 4,
  },
  logo: {
    height: 140,
    width: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 5, // isso so funciona pra android
    marginTop: 10,
  },
  linha: {
    borderTopWidth: 1,
    borderColor: '#0e1f8b',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  palavra: {
    fontFamily: fontes.padrao,
    fontSize: 16,
    color: cores.azulEscuro,
    fontWeight: 'bold',
    padding: 3,
  },
  titulo: {
    fontWeight: 'bold',
    fontFamily: fontes.padrao,
    fontSize: 22,
    color: cores.azulEscuro,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: -12,
    right: 5,
    marginBottom: 10,
  },
  texto: {
    paddingLeft: 5,
  },
  botao: {
    borderRadius: 20,
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.azulClaro,
    marginLeft: 'auto',
    marginRight: 'auto',
    ...sombraPadrao,
    marginTop: 10,
  },
  textobotao2: {
    fontWeight: 'bold',
    fontFamily: fontes.padrao,
    fontSize: 18,
    color: cores.branco,
  },
  setaBack: {
    position: 'absolute',
    left: 18,
    top: 24,
    zIndex: 1,
  },
});