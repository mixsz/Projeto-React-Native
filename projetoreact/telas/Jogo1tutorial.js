import React from 'react';
import { Text,View,Button,TextInput,StyleSheet, TouchableOpacity,TouchableHighlight,Image } from 'react-native';

export default class Jogo1tutorial extends React.Component {
    render() {
    return (
      <View style={estilos.tudo}>
         <View style={estilos.box}>
            <Image source={require('../assets/logojogo1.png')} style={estilos.logo}/>
            <Text style= {estilos.linha}> </Text>
            <View style={estilos.texto}>
              <Text style={estilos.titulo}>Como jogar?</Text>
              <Text style={estilos.palavra}>Neste jogo, seu objetivo é descobrir qual operador utilizar:</Text>
              <Text style={estilos.palavra}>• Soma (+)</Text>
              <Text style={estilos.palavra}>• Subtração (-)</Text>
              <Text style={estilos.palavra}>• Multiplicação (×)</Text>
              <Text style={estilos.palavra}>• Divisão (÷)</Text>
              <Text> </Text>
              <Text style={estilos.palavra}>Dentro de 10 rodadas, os números serão exibidos na tela, e você deverá completar o sinal correto para realizar a operação, adivinhe o máximo de sinais que conseguir!</Text>
              <Text> </Text>
              <Text style={estilos.palavra}>Cada acerto vale 1 ponto, e a média necessária para passar é 6.</Text>
              <Text> </Text>
              <Text style={estilos.palavra}>Obs: O jogo fica mais difícil conforme as rodadas avançam.</Text>
            </View>
             <TouchableOpacity style={estilos.botao} onPress={() =>this.props.navigation.navigate('Jogo1')}>
                  <Text style={estilos.textobotao2}>Entendido</Text>
            </TouchableOpacity>
         </View>
        <TouchableOpacity 
            style={estilos.setaBack} 
            onPress={() => this.props.navigation.navigate('Jogo1')}>
            <Text style={{ fontSize: 46, color: "#014a7d" }}>←</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const estilos = StyleSheet.create({
  tudo:{
    flex: 1,
    backgroundColor: "#d0f6fe",
  },
  box:{
    backgroundColor: "#d0f6fe",
    height: 680,
    width: 330,
    margin: "auto",
    borderRadius: 10,
    bottom: -10,
    paddingTop: 4
  },
    logo:{
    height: 140,
    width: 200,
    marginLeft: "auto",
    marginRight: "auto",
    shadowOffset: { width: 0, height: 0},
    shadowOpacity: 0.9,
    shadowRadius: 5, 
    elevation: 5, // isso so funciona pra android
    marginTop:10
  },
  linha:{
    borderTopWidth: 1,
    borderColor:"#0e1f8b",  
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  palavra:{
    fontFamily: "sans-serif",
    fontSize:16,
    color: "#014a7d",
    fontWeight: "bold",
    padding:3
  },
    titulo:{
    fontWeight: "bold",
    fontFamily: "sans-serif",
    fontSize:22,
    color: "#014a7d",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -12,
    right: 5,
    marginBottom: 10
  },
  texto:{
    paddingLeft: 5,
  },
   botao:{
    borderRadius: 20,
    width: "80%",
    height: 40,
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: "#61d1ea",
    marginLeft: "auto",
    marginRight: "auto",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5, 
    elevation: 5,
    marginTop: 10
  },
   textobotao2:{
     fontWeight: "bold",
    fontFamily: "sans-serif",
    fontSize:18,
    color: "white",
  },  
  setaBack:{
    position: "absolute",
    left: 18,
    top: 24, 
    zIndex: 1,
  },
})
