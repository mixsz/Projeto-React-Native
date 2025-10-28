import React from 'react';
import { Text,View,Button,TextInput,StyleSheet, TouchableOpacity,TouchableHighlight,Image,ScrollView,ImageBackground } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default class Jogo2play extends React.Component {
    render() {
    return (
      <View style={estilos.tudo}>
        <View style={estilos.deckinteiro}>
          <ImageBackground source={require('../assets/fogao.jpg')} style={estilos.cartaFogo}>
            <View style={estilos.statsFogo}>
              <Text style={estilos.elementoFogo}><Fontisto name="fire" size={16} color="orange" /></Text>
              <Text style={estilos.pontoFogo}>5</Text>
            </View>
          </ImageBackground>

          <ImageBackground source={require('../assets/Aprovado.png')} style={estilos.cartaAgua}>
            <View style={estilos.statsAgua}>
              <Text style={estilos.elementoAgua}><Ionicons name="water-sharp" size={16} color="#00c2ff"/></Text>
              <Text style={estilos.pontoAgua}>5</Text>
            </View>
          </ImageBackground>

          <ImageBackground source={require('../assets/cardduel.png')} style={estilos.cartaNeve}>
            <View style={estilos.statsNeve}>
              <Text style={estilos.elementoNeve}><FontAwesome name="snowflake-o" size={16} color="white" /></Text>
              <Text style={estilos.pontoNeve}>5</Text>
            </View>
          </ImageBackground>

          <ImageBackground source={require('../assets/logojogo1.png')} style={estilos.cartaFogo}>
            <View style={estilos.statsFogo}>
              <Text style={estilos.elementoFogo}><Fontisto name="fire" size={16} color="orange" /></Text>
              <Text style={estilos.pontoFogo}>5</Text>
            </View>
          </ImageBackground>

          <ImageBackground source={require('../assets/fogao.jpg')} style={estilos.cartaFogo}>
            <View style={estilos.statsFogo}>
              <Text style={estilos.elementoFogo}><Fontisto name="fire" size={16} color="orange" /></Text>
              <Text style={estilos.pontoFogo}>5</Text>
            </View>
          </ImageBackground>
        </View>
         <TouchableOpacity style={estilos.botao} activeOpacity={0.6}>
            <Ionicons name="hand-right-sharp" size={40} color="#14ff00" />
          </TouchableOpacity>
      </View>
    );
  }
}
const estilos = StyleSheet.create({
  tudo:{
    flex: 1,
    backgroundColor: "black",
  },
  deckinteiro:{
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#edebe9",
    height: 1000,
    paddingTop: 20,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    top: "45%",
    borderRadius: 30,
    borderTopWidth: 8,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderColor: "#c88a3d"
  },
  botao:{
    position: "absolute",
    borderRadius: 100,
    alignItems: "center",
    justifyContent:"center",
    marginTop: 20,
    left: "38%",
    top: "88%",
    width: "25%",
    height: 60,
    backgroundColor: "#2f2d2d",
    paddingRight: 4,
    paddingVertical: 2,
    shadowOffset: { width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5, 
    elevation: 5,
  },
  cartaFogo:{
    margin: 3,
    height: 130,
    width: 100,
    backgroundColor: "white",
    borderWidth: 4,
    borderColor: "yellow",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 4,             
    shadowColor: "#000",    
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 2},
    shadowRadius: 3,
  }, 
  pontoFogo:{
    fontFamily: "sans-serif",
    fontSize:16,
    color: "black",
    fontWeight: "bold",
    marginLeft: 3
  },
  elementoFogo:{
    marginLeft: 2
  },
  statsFogo:{
    backgroundColor: "yellow",
    width: 20,
    borderBottomRightRadius: 5,
  },
  cartaAgua:{
    margin: 3,
    height: 130,
    width: 100,
    backgroundColor: "white",
    borderWidth: 4,
    borderColor: "blue",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 4,             
    shadowColor: "#000",    
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 2},
    shadowRadius: 3,
  },
   statsAgua:{
    backgroundColor: "blue",
    width: 20,
    borderBottomRightRadius: 5,
  },
  elementoAgua:{
    marginLeft: 0
  },
  pontoAgua:{
    fontFamily: "sans-serif",
    fontSize:16,
    color: "white",
    fontWeight: "bold",
    marginLeft: 3
  },
  cartaNeve:{
    margin: 3,
    height: 130,
    width: 100,
    backgroundColor: "white",
    borderWidth: 4,
    borderColor: "#85f8ff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 4,             
    shadowColor: "#000",    
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 2},
    shadowRadius: 3,
  },
   statsNeve:{
    backgroundColor: "#85f8ff",
    width: 20,
    borderBottomRightRadius: 5,
  },
  elementoNeve:{
    marginLeft: 2
  },
  pontoNeve:{
    fontFamily: "sans-serif",
    fontSize:16,
    color: "black",
    fontWeight: "bold",
    marginLeft: 3
  },

})
