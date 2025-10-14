import React from 'react';
import { Text,View,Button,TextInput,StyleSheet, TouchableOpacity,TouchableHighlight } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


export default class Home extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
       perfil: this.props.route.params.perfil            
    };
  }
  // nome -> this.state.perfil.usuario !!!!!!!!!!!!!!!!!! VOCÊ TEM QUE ARRUMAR NA TABNAV DEPOIS, N ESQUEÇA!!!!!!!!!!!!!!
  render() {
    return (
      <View style={estilos.tudo}>
        <View style={estilos.cima}>
            <FontAwesome5 style={estilos.icone1} name="user-circle" size={70} color="#232424"/>
            <Text style={estilos.titulo}> {this.state.perfil.usuario} </Text> 
        </View>
         <View style={estilos.botoes}>
              <TouchableOpacity style={estilos.botao} onPress={() =>this.props.navigation.navigate('Jogo1nav')}>
                <Text style={estilos.textobotao}> Operação Misteriosa </Text>
              </TouchableOpacity>
              <TouchableOpacity style={estilos.botao}>
                <Text style={estilos.textobotao1}> Alguma coisa </Text>
              </TouchableOpacity>
              <TouchableOpacity style={estilos.botao} onPress={() =>this.props.navigation.navigate('Login')}>
                <Text style={estilos.textobotao2}> Sair </Text>
              </TouchableOpacity>
         </View>
      </View>
    );
  }
}


const estilos = StyleSheet.create({
  tudo:{
    flex: 1,
    backgroundColor: "#d0f6fe",
  },
  botoes:{
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: 60
  },
  botao:{
    borderRadius: 25,
    width: "90%",
    height: 80,
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: "#232424",
    marginLeft: -1,
    marginBottom: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5, 
    elevation: 5, // isso so funciona pra android
  },
  textobotao:{
    fontSize: 20,
    fontFamily: "sans-serif",
    color: '#d0f6fe',
    fontWeight: "bold"
  },
   textobotao1:{
    fontSize: 20,
    fontFamily: "sans-serif",
    color: '#d0f6fe',
    fontWeight: "bold"
  },
  textobotao2:{
    fontSize: 20,
    fontFamily: "sans-serif",
    color: '#d93838',
    fontWeight: "bold"
  },
  titulo:{
    fontSize: 25,
    fontFamily: "sans-serif",
    textAlign: "center",
    color: "#232424",
    fontWeight: "bolder"
  },
  icone1:{
    fontFamily: "sans-serif",
    textAlign: "center",
    fontWeight: "bolder",
    marginBottom: 10
  },
  cima:{
    backgroundColor: "white",
    height: 260,
    borderRadius: 60,
    marginTop: -50,
    paddingTop: 100,
    flexDirection: "column",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5, 
    elevation: 5
  }
})
