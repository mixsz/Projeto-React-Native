import React from 'react';
import { Text,View,Button,TextInput,StyleSheet, TouchableOpacity,TouchableHighlight,Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

export default class Jogo2 extends React.Component {
  render() {
    return (
      <View style={estilos.tudo}>
           <Image source={require('../assets/cardduel.png')} style={estilos.logo}/>
           <View style={estilos.botoes}>
               <TouchableOpacity style={estilos.botao} onPress={() =>this.props.navigation.navigate('Jogo2play')} activeOpacity={0.6}>
                <View style={estilos.nomeicons}>
                  <Ionicons name="game-controller" size={24} color="#b3dde6" style={estilos.icon}/>
                  <Text style={estilos.textobotao2}> Jogar </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={estilos.botao} onPress={() =>this.props.navigation.navigate('Jogo2tutorial')} activeOpacity={0.6}>
                  <View style={estilos.nomeicons}>
                    <Entypo name="help-with-circle" size={24} color="#b3dde6" style={estilos.icon2} />
                    <Text style={estilos.textobotao1}> Tutorial </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={estilos.botao} onPress={() =>this.props.navigation.navigate('Home')} activeOpacity={0.7}>
                  <View style={estilos.nomeicons}>
                    <Ionicons name="arrow-back-outline" size={30}color="#b3dde6" style={estilos.icon2} />
                    <Text style={estilos.textobotao3}> Voltar </Text>
                </View>
              </TouchableOpacity>
            </View>
      </View>
    );
  }
}
const estilos = StyleSheet.create({
  tudo:{
    flex: 1,
    backgroundColor: "#d0f6fe"
  },
  botao:{
    borderRadius: 13,
    width: "90%",
    height: 80,
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: "#414040",
    marginLeft: -1,
    marginBottom: 60,
  },
  textobotao2:{
    fontSize: 20,
    fontFamily: "sans-serif",
    color: '#b3dde6',
    fontWeight: "bold",
    right: 8
  },
    textobotao3:{
    fontSize: 20,
    fontFamily: "sans-serif",
    color: '#b3dde6',
    fontWeight: "bold",
    right: 3
  },
  logo:{
    height: 240,
    width: 260,
    marginLeft: "auto",
    marginRight: "auto",
    shadowOffset: { width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 5, 
    elevation: 5, // isso so funciona pra android
    marginTop: 30,
    marginBottom: 30
  },
   botoes:{
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: 10
  },
  nomeicons:{
    flexDirection: "row",
    alignItems: "center"
  },
  icon:{
    right: 13
  },
  icon2:{
    marginRight: 3,
  },
    textobotao1:{
    fontSize: 20,
    fontFamily: "sans-serif",
    color: '#b3dde6',
    fontWeight: "bold",
    left: 1
  },
})