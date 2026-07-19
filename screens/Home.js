import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { cores, fontes, sombraPadrao } from '../styles/tema';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perfil: this.props.route.params.perfil,
    };
  }

  render() {
    return (
      <View style={estilos.tudo}>
        <View style={estilos.cima}>
          <FontAwesome5 style={estilos.icone1} name="user-circle" size={70} color={cores.textoPreto} />
          <Text style={estilos.titulo}> {this.state.perfil.usuario} </Text>
        </View>
        <View style={estilos.botoes}>
          <TouchableOpacity
            style={estilos.botao}
            onPress={() => this.props.navigation.navigate('Jogo1nav')}
            activeOpacity={0.6}
          >
            <View style={estilos.nomeicon}>
              <MaterialCommunityIcons
                name="calculator-variant-outline"
                size={30}
                color={cores.fundo}
                style={estilos.iconz}
              />
              <Text style={estilos.textobotao}> Operação Misteriosa </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={estilos.botao}
            onPress={() => this.props.navigation.navigate('Jogo2nav')}
            activeOpacity={0.6}
          >
            <View style={estilos.nomeicon}>
              <MaterialCommunityIcons name="cards" size={30} color={cores.fundo} />
              <Text style={estilos.textobotao}> Card Duel </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={estilos.botao}
            onPress={() => this.props.navigation.navigate('Login')}
            activeOpacity={0.6}
          >
            <View style={estilos.nomeicon}>
              <MaterialCommunityIcons name="exit-run" size={24} color={cores.erroForte} style={estilos.iconz2} />
              <Text style={estilos.textobotaoSair}> Sair </Text>
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
  botoes: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 60,
  },
  botao: {
    borderRadius: 25,
    width: '90%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.textoPreto,
    marginLeft: -1,
    marginBottom: 60,
    shadowColor: '#000',
    ...sombraPadrao,
  },
  textobotao: {
    fontSize: 20,
    fontFamily: fontes.padrao,
    color: cores.fundo,
    fontWeight: 'bold',
  },
  textobotaoSair: {
    fontSize: 20,
    fontFamily: fontes.padrao,
    color: cores.erroForte,
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 25,
    fontFamily: fontes.padrao,
    textAlign: 'center',
    color: cores.textoPreto,
    fontWeight: 'bolder',
  },
  icone1: {
    fontFamily: fontes.padrao,
    textAlign: 'center',
    fontWeight: 'bolder',
    marginBottom: 10,
  },
  cima: {
    backgroundColor: cores.branco,
    height: 260,
    borderRadius: 60,
    marginTop: -50,
    paddingTop: 100,
    flexDirection: 'column',
    ...sombraPadrao,
  },
  nomeicon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconz: {
    marginRight: 4,
  },
  iconz2: {
    marginRight: 2,
  },
});