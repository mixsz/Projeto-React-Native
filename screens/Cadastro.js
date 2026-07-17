import React from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { criarUsuario } from '../services/usuarioService';
import { cores, fontes, sombraTopo, sombraPadrao, inputPadrao } from '../styles/tema';

export default class Cadastro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
      confirmarSenha: '',
      mensagem: '',
      cor: 'gray',
      criado: false,
    };
  }

  async gravar() {
    if (this.state.user === '' || this.state.password === '' || this.state.confirmarSenha === '') {
      this.setState({ mensagem: 'Preencha todos os dados!', cor: cores.erro });
      return;
    }

    if (this.state.password !== this.state.confirmarSenha) {
      this.setState({ mensagem: 'As senhas não coincidem!', cor: cores.erro });
      return;
    }

    try {
      await criarUsuario(this.state.user, this.state.password);
      this.setState({ mensagem: '', cor: cores.sucesso, criado: true });
      alert('Conta cadastrada com sucesso!');
    } catch (erro) {
      this.setState({ mensagem: erro.message, cor: cores.erro });
    }
  }

  render() {
    return (
      <View style={estilos.tudo}>
        <View style={estilos.quasetudo}>
          <TouchableOpacity
            style={estilos.setaBack}
            onPress={() => this.props.navigation.navigate('Login')}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 37 }}>←</Text>
          </TouchableOpacity>
          <Text style={estilos.titulo}> Cadastrar-se </Text>
          <View style={estilos.juncao}>
            <View style={estilos.nomeicon}>
              <FontAwesome5 name="user-alt" size={16} color={cores.textoCinza} />
              <Text style={estilos.botaoTexto1}> Usuário</Text>
            </View>
            <TextInput
              style={estilos.input}
              value={this.state.user}
              onChangeText={(texto) => this.setState({ user: texto })}
            />
          </View>
          <View style={estilos.juncao}>
            <View style={estilos.nomeicon}>
              <FontAwesome5 name="lock" size={16} color={cores.textoCinza} />
              <Text style={estilos.botaoTexto1}> Senha</Text>
            </View>
            <TextInput
              style={estilos.input}
              value={this.state.password}
              secureTextEntry={true}
              onChangeText={(texto) => this.setState({ password: texto })}
            />
          </View>
          <View style={estilos.juncao}>
            <View style={estilos.nomeicon}>
              <MaterialIcons name="lock-person" size={18} color={cores.textoCinza} />
              <Text style={estilos.botaoTexto1}> Confirmar senha</Text>
            </View>
            <TextInput
              style={estilos.input}
              secureTextEntry={true}
              value={this.state.confirmarSenha}
              onChangeText={(texto) => this.setState({ confirmarSenha: texto })}
            />
          </View>
          <Text style={[{ color: this.state.cor }, estilos.mensagem]}>{this.state.mensagem} </Text>
          <View style={estilos.botoes}>
            <TouchableOpacity style={estilos.botao} onPress={() => this.gravar()} activeOpacity={0.6}>
              <Text style={estilos.botaoTexto}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const estilos = StyleSheet.create({
  tudo: {
    flex: 1,
    backgroundColor: cores.fundo,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  quasetudo: {
    height: 900,
    padding: 15,
    borderRadius: 45,
    width: '100%',
    backgroundColor: cores.branco,
    marginBottom: -400,
    paddingLeft: 30,
    ...sombraTopo,
  },
  juncao: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  input: {
    ...inputPadrao,
  },
  setaBack: {
    position: 'absolute',
    left: 18,
    top: 10,
    zIndex: 1,
    fontSize: 30,
  },
  titulo: {
    fontSize: 25,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: cores.fundo,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 50,
    color: cores.textoEscuro,
    fontFamily: fontes.padrao,
  },
  botao: {
    marginTop: 2,
    borderRadius: 20,
    width: '92%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b3dde6',
    marginLeft: -1,
    marginRight: 'auto',
    ...sombraPadrao,
  },
  botoes: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  botaoTexto: {
    fontWeight: 'bold',
    fontFamily: fontes.padrao,
    fontSize: 19,
    color: cores.textoCinza,
  },
  botaoTexto1: {
    fontSize: 17,
    fontFamily: fontes.padrao,
  },
  mensagem: {
    fontSize: 14,
    fontFamily: fontes.padrao,
    marginTop: -10,
  },
  nomeicon: {
    flexDirection: 'row',
    marginLeft: 6,
  },
});