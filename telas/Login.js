import React from 'react';
import { View, Text, TextInput,TouchableOpacity,StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = { usuario: '', senha: '', mensagem:''}
  }

  async ler(){
    if(this.state.usuario != '' && this.state.senha != ''){
        try{
          const dados = await AsyncStorage.getItem(this.state.usuario);
          if(dados !== null){
            const perfil = JSON.parse(dados)
            if(perfil.senha === this.state.senha){
              this.props.navigation.navigate('TabNav', {perfil})
            } 
            else{
                this.setState({mensagem: "Senha incorreta!"})
            }
          }
          else {
            this.setState({mensagem: "Usuário não encontrado!"})
          }
        }
        catch(erro){
          console.log(erro);
        }
     }     
     else{
       this.setState({mensagem: "Preencha todos os dados!"})
     } 
  } 

  render(){
    return(
      <View style={estilos.tudo}>
          <View style={estilos.quasetudo}>
              <Text style={estilos.titulo}> Login </Text>
              <View style={estilos.juncao}>
                <View style={estilos.nomeicon}>
                  <FontAwesome5 name="user-alt" size={16} color="#414040" />
                  <Text style={estilos.botaoTexto1}> Usuário</Text>
                </View>
                <TextInput style={estilos.input} value={this.state.usuario} onChangeText={(texto)=>this.setState({usuario: texto})} />
              </View>
              <View style={estilos.juncao}>
              <View style={estilos.nomeicon}>
                <FontAwesome5 name="lock" size={16} color="#414040" />
                <Text style={estilos.botaoTexto1}> Senha</Text>
              </View>
                <TextInput style={estilos.input} secureTextEntry={true} value={this.state.senha} onChangeText={(texto)=>this.setState({senha: texto})} />
              </View>
              <Text style={estilos.mensagem2}> {this.state.mensagem} </Text>
              <View style={estilos.botoes}>
                <TouchableOpacity style={estilos.botao} onPress={() => this.ler()} activeOpacity={0.6}>
                  <Text style={estilos.botaoTexto}>Entrar</Text>
                </TouchableOpacity>
                 <TouchableOpacity style={estilos.botao2} onPress={() =>this.props.navigation.navigate('Cadastro')} activeOpacity={0.6}>
                  <Text style={estilos.botaoTexto2}>Cadastrar-se</Text>
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
    paddingBottom: 10
  },
  quasetudo:{
    height: 900,
    padding: 15,
    borderRadius: 45,
    width: "100%",
    backgroundColor: "white",
    marginBottom: -400,
    paddingLeft: 30,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 5, 
    elevation: 5
    
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
    fontFamily: "sans-serif",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5, 
    elevation: 5
  },
titulo:{
  fontSize: 25,
  textAlign: "center", 
  borderBottomWidth: 1,
  borderColor:"#d0f6fe",
  paddingBottom:10,
  marginTop: 10, 
  marginBottom: 50,
  color: "#151515",
  fontFamily: "sans-serif",
  right: 12
},
  botao:{
    marginTop: -1,
    borderRadius: 20,
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: "#b3dde6",
    marginLeft: "auto",
    marginRight: "auto",
    right: 14,
    marginBottom: 10, 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5, 
    elevation: 5 
  },
    botao2:{
    marginTop: -1,
    borderRadius: 20,
    width: "50%",
    height: 35,
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: "#414040",
    marginLeft: "auto",
    marginRight: "auto",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5, 
    elevation: 5,
    right:6
    
  },

  botoes:{
    marginTop: 4,
    flexDirection: "column",
  },
  botaoTexto:{
    fontWeight: "bold",
    fontFamily: "sans-serif",
    fontSize:19,
    color: "#414040"
  },
    botaoTexto2:{
    fontWeight: "bold",
    fontFamily: "sans-serif",
    fontSize:15,
    color: "#b3dde6"
  },
  botaoTexto1:{
    fontSize: 17,
    fontFamily: "sans-serif"
  },
  nomeicon:{
    flexDirection: "row",
    marginLeft: 6
  },
  mensagem2:{
    fontSize: 14,
    fontFamily: "sans-serif",
    marginTop: -15,
    color: "red"
  }
})
