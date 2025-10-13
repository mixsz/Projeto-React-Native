import React from 'react';
import { Text,View,Button,TextInput,StyleSheet, TouchableOpacity,TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Cadastro extends React.Component {
  constructor(props){
    super(props)
    this.state={ 
      user: undefined, 
      password: undefined ,
      confirmarSenha: undefined
    }
  }

  async gravar(){
    try{
      await AsyncStorage.setItem(this.state.user, this.state.password);
      alert("Salvo com sucesso!")
    }catch(erro){
      alert("Erro!")
    }
  }

  render(){
    return(
      <View style={estilos.tudo}>
          <View style={estilos.quasetudo}>
              <Text style={estilos.titulo}> Cadastrar-se </Text>
              <View style={estilos.juncao}>
                <Text style={estilos.botaoTexto1}> Usuário</Text>
                <TextInput style={estilos.input} onChangeText={(texto)=>this.setState({user: texto})} />
              </View>
              <View style={estilos.juncao}>
                <Text style={estilos.botaoTexto1}> Senha</Text>
                <TextInput style={estilos.input} secureTextEntry={true} onChangeText={(texto)=>this.setState({password: texto})} />
              </View>
              <View style={estilos.juncao}>
                <Text style={estilos.botaoTexto1}> Confirmar Senha </Text>
                <TextInput style={estilos.input} secureTextEntry={true} onChangeText={(texto)=>this.setState({confirmarSenha: texto})} />
              </View>
              <View style={estilos.botoes}>
                <TouchableOpacity style={estilos.botao} onPress={() => this.gravar()}>
                  <Text style={estilos.botaoTexto}>Cadastrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.botao2}>
                  <Text style={estilos.botaoTexto}>Já possuo conta</Text>
                </TouchableOpacity>
              </View>
            </View>
      </View>
    )
  }
}

const estilos = StyleSheet.create({
  tudo:{
    flex: 1,
    backgroundColor: "#d0f6fe",
    justifyContent: "center", 
    alignItems: "center",
    paddingBottom: 10,
  },
  quasetudo:{
    height: 900,
    padding: 15,
    borderRadius: 30,
    width: "100%",
    backgroundColor: "white",
    marginBottom: -400,
    paddingLeft: 30,
    
  },
  juncao:{
    flexDirection: "column",
    marginBottom: 20
  },
  input: {
    height: 45,
    borderRadius: 8,
    width: "90%",
    paddingHorizontal: 10,
    backgroundColor: "#eaf7fa",
    borderWidth: 1,
    borderColor: "#c5d3d6",
    fontSize: 16,
    fontFamily: "sans-serif"

  },
  titulo:{
    fontSize: 25,
    borderBottomWidth:1,
    borderColor:"#d0f6fe",
    paddingLeft: 75 ,
    marginTop: -1,
    marginBottom: 50,
    color: "#151515",
    fontFamily: "sans-serif",
  },
  botao:{
    marginTop: -5,
    borderRadius: 5,
    width: "45%",
    height: 35,
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: "#b3dde6"
  },
  botao2:{
    marginTop: -5,
    borderRadius: 5,
    width: "45%",
    height: 35,
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: "#b3dde6"
  },
  botoes:{
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  botaoTexto:{
    fontWeight: "bold",
        fontFamily: "sans-serif"
  },
  botaoTexto1:{
    fontSize: 17,
    fontFamily: "sans-serif"
  }

})
