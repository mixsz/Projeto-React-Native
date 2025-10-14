import React from 'react';
import { Text,View,Button,TextInput,StyleSheet, TouchableOpacity,TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Cadastro extends React.Component {
  constructor(props){
    super(props)
    this.state={ 
      user: '', 
      password: '' ,
      confirmarSenha: '',
      mensagem: '',
      cor: 'gray'
    }
  }

  async gravar(){
       /**
             * Vou salvar a key como usuario e o valor como uma string JSON (objeto) 
             * exemplo:
             * const perfil = {
             * usuario: this.state.user,
             * senha: this.state.password
             *  };
             * await AsyncStorage.setItem(this.state.user, JSON.stringify(perfil));
             * 
             * AsyncStorage.setItem('a', '{"usuario":"a","senha":"a"}');
             *                      key              values
      */

    if(this.state.user != '' && this.state.password != '' && this.state.confirmarSenha != '') {
      if(this.state.password !== this.state.confirmarSenha){
        this.setState({mensagem: "As senhas não coincidem!"})
        this.setState({cor: "red"})
      }
      else{
        try{
          const existente = await AsyncStorage.getItem(this.state.user)
           if (existente !== null) {
              this.setState({ mensagem: "Este nome já está sendo utilizado!", cor: "red"});
            }
          else{
            const perfil = {
              usuario: this.state.user,
              senha: this.state.password, // dps eu coloco ponto ou moeda sla oq vou usar !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            };
            await AsyncStorage.setItem(this.state.user, JSON.stringify(perfil));
            this.setState({mensagem: "Conta cadastrada com sucesso!", cor: "green" })
            return;
          }
        }
        catch(erro){
          alert("Erro!")
        }
      }
    }
   else{
     this.setState({mensagem: "Preencha todos os dados!"})
     this.setState({cor: "red"})
   }
  }

  render(){
    return(
      <View style={estilos.tudo}>
          <View style={estilos.quasetudo}>
          <TouchableOpacity 
            style={estilos.setaBack} 
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={{ fontSize: 37 }}>←</Text>
          </TouchableOpacity>
              <Text style={estilos.titulo}> Cadastrar-se </Text>
              <View style={estilos.juncao}>
                <Text style={estilos.botaoTexto1}> Usuário</Text>
                <TextInput style={estilos.input} value={this.state.user} onChangeText={(texto)=>this.setState({user: texto})} />
              </View>
              <View style={estilos.juncao}>
                <Text style={estilos.botaoTexto1}> Senha</Text>
                <TextInput style={estilos.input} value={this.state.password} secureTextEntry={true} onChangeText={(texto)=>this.setState({password: texto})} />
              </View>
              <View style={estilos.juncao}>
                <Text style={estilos.botaoTexto1}> Confirmar Senha </Text>
                <TextInput style={estilos.input} secureTextEntry={true} value={this.state.confirmarSenha} onChangeText={(texto)=>this.setState({confirmarSenha: texto})} />
              </View>
                <Text style={[{color: this.state.cor},estilos.mensagem]}>{this.state.mensagem} </Text>
              <View style={estilos.botoes}>
                <TouchableOpacity style={estilos.botao} onPress={() => this.gravar()}>
                  <Text style={estilos.botaoTexto}>Cadastrar</Text>
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
  setaBack:{
  position: "absolute",
  left: 18,
  top: 10, 
  zIndex: 1,
  fontSize:30
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
},
  botao:{
    marginTop: 2,
    borderRadius: 20,
    width: "92%",
    height: 50,
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: "#b3dde6",
    marginLeft: -1,
    marginRight: "auto",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5, 
    elevation: 5
    
  },
  botoes:{
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  botaoTexto:{
    fontWeight: "bold",
    fontFamily: "sans-serif",
    fontSize:19,
    color: "#414040"
  },
  botaoTexto1:{
    fontSize: 17,
    fontFamily: "sans-serif"
  },
  mensagem:{
    fontSize: 14,
    fontFamily: "sans-serif",
    marginTop: -10
  }

})
