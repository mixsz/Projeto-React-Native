import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = { usuario: undefined, senha: undefined }
  }

  async ler(){
    try{
      let senha = await AsyncStorage.getItem(this.state.usuario);
      if(senha != null){
        if(senha == this.state.senha){
          this.props.navigation.navigate('Tela3', { usuario: this.state.usuario })
        } else {
          alert("Senha Incorreta!");
        }
      } else {
        alert("Usuário não foi encontrado!");
      }
    }catch(erro){
      console.log(erro);
    }
  }

  render(){
    return(
      <View>
        <Text>Usuário:</Text>
        <TextInput onChangeText={(texto)=>this.setState({usuario: texto})} />
        <Text>Senha:</Text>
        <TextInput onChangeText={(texto)=>this.setState({senha: texto})} />
        <Button title="Logar" onPress={()=>this.ler()} />
      </View>
    )
  }
}
