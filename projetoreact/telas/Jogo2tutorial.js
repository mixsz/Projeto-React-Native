import React from 'react';
import { Text,View,StyleSheet, TouchableOpacity,Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default class Jogo2tutorial extends React.Component {
    render() {
    return (
      <View style={estilos.tudo}>
         <Image source={require('../assets/cardduel.png')} style={estilos.logo}/>
         <View style={estilos.box}>
            <View style={estilos.texto}>
              <Text style={estilos.titulo}>Como jogar?</Text>
              <Text style={estilos.palavra}>
                 Card Duel é um duelo de cartas, onde você enfrenta o famoso Sensei em uma batalha estratégica.{"\n\n"}
                 O jogo começa com a distribuição de 5 cartas aleatórias para ambos os lados. 
                 A cada rodada, você e a casa escolhem uma carta para duelar.{"\n\n"}
                 As cartas são divididas em 2 atributos:{"\n"}
                 Elemento e nível de poder.{"\n\n"}
                 Cada elemento vence o outro, sendo assim:{"\n"}
                 Água <Ionicons name="water-sharp" size={16} color="#00c2ff" /> → Fogo  <Fontisto name="fire" size={16} color="orange" />{"\n"}
                 Fogo  <Fontisto name="fire" size={16} color="orange" /> → Neve  <FontAwesome name="snowflake-o" size={16} color="white" />{"\n"}
                 Neve  <FontAwesome name="snowflake-o" size={16} color="white" /> → Água <Ionicons name="water-sharp" size={16} color="#00c2ff" />{"\n\n"}
                 Se o elemento de uma carta for igual ao outro, o nível de poder é utilizado para determinar o vencedor da rodada.{"\n\n"}
                 Seu objetivo é vencer este duelo, e você possui 2 maneiras de vencer:{"\n\n"}
                 Fazendo 3 PONTOS com o mesmo elemento ou fazendo no mínimo 1 PONTO com cada elemento.
              </Text>
            </View>
             <TouchableOpacity style={estilos.botao} onPress={() =>this.props.navigation.navigate('Jogo2')} activeOpacity={0.6}>
                  <Text style={estilos.textobotao2}>Entendido</Text>
            </TouchableOpacity>
         </View>
        <TouchableOpacity 
            style={estilos.setaBack} 
            onPress={() => this.props.navigation.navigate('Jogo2')}>
            <Text style={{ fontSize: 46, color: "black" }}>←</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const estilos = StyleSheet.create({
  tudo:{
    flex: 1,
    backgroundColor: "#dff6fb",
  },
    logo:{
    height: 80,
    width: 80,
    marginLeft: "auto",
    marginRight: "auto",
    shadowOffset: { width: 0, height: 0},
    shadowOpacity: 0.9,
    shadowRadius: 5, 
    elevation: 5, // isso so funciona pra android
    marginTop:20,
    marginBottom: 10
  },
  box:{
      backgroundColor: "#d0e7e6",
      height: 590,
      paddingTop: 20,
      borderRadius: 50,
    },
  palavra:{
    fontFamily: "sans-serif",
    fontSize:14,
    color: "black",
    fontWeight: "bold",
    padding:3
  },
    titulo:{
    fontWeight: "bold",
    fontFamily: "sans-serif",
    fontSize:22,
    color: "black",
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
    width: "60%",
    height: 40,
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: "#414040",
    marginLeft: "auto",
    marginRight: "auto",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5, 
    elevation: 5,
    marginTop: 20
  },
   textobotao2:{
    fontWeight: "bold",
    fontFamily: "sans-serif",
    fontSize:18,
    color: "#b3dde6",
  },  
  setaBack:{
    position: "absolute",
    left: 18,
    top: 24, 
    zIndex: 1,
  },
})
