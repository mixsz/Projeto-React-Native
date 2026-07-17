import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { autenticar } from '../services/usuarioService';
import { cores, fontes, sombraPadrao, sombraTopo, inputPadrao } from '../styles/tema';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { usuario: '', senha: '', mensagem: '' };
  }

  async ler() {
    if (this.state.usuario === '' || this.state.senha === '') {
      this.setState({ mensagem: 'Preencha todos os dados!' });
      return;
    }

    try {
      const resultado = await autenticar(this.state.usuario, this.state.senha);
      if (resultado.sucesso) {
        this.props.navigation.navigate('TabNav', { perfil: resultado.perfil });
        return;
      }
      if (resultado.motivo === 'SENHA_INCORRETA') {
        this.setState({ mensagem: 'Senha incorreta!' });
      } else {
        this.setState({ mensagem: 'Usuário não encontrado!' });
      }
    } catch (erro) {
      console.log(erro);
      this.setState({ mensagem: 'Erro ao fazer login. Tente novamente.' });
    }
  }

  render() {
    return (
      <View style={estilos.tudo}>
        <View style={estilos.quasetudo}>
          <Text style={estilos.titulo}> Login </Text>
          <View style={estilos.juncao}>
            <View style={estilos.nomeicon}>
              <FontAwesome5 name="user-alt" size={16} color={cores.textoCinza} />
              <Text style={estilos.botaoTexto1}> Usuário</Text>
            </View>
            <TextInput
              style={estilos.input}
              value={this.state.usuario}
              onChangeText={(texto) => this.setState({ usuario: texto })}
            />
          </View>
          <View style={estilos.juncao}>
            <View style={estilos.nomeicon}>
              <FontAwesome5 name="lock" size={16} color={cores.textoCinza} />
              <Text style={estilos.botaoTexto1}> Senha</Text>
            </View>
            <TextInput
              style={estilos.input}
              secureTextEntry={true}
              value={this.state.senha}
              onChangeText={(texto) => this.setState({ senha: texto })}
            />
          </View>
          <Text style={estilos.mensagem2}> {this.state.mensagem} </Text>
          <View style={estilos.botoes}>
            <TouchableOpacity style={estilos.botao} onPress={() => this.ler()} activeOpacity={0.6}>
              <Text style={estilos.botaoTexto}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={estilos.botao2}
              onPress={() => this.props.navigation.navigate('Cadastro')}
              activeOpacity={0.6}
            >
              <Text style={estilos.botaoTexto2}>Cadastrar-se</Text>
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
    right: 12,
  },
  botao: {
    marginTop: -1,
    borderRadius: 20,
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b3dde6',
    marginLeft: 'auto',
    marginRight: 'auto',
    right: 14,
    marginBottom: 10,
    ...sombraPadrao,
  },
  botao2: {
    marginTop: -1,
    borderRadius: 20,
    width: '50%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.textoCinza,
    marginLeft: 'auto',
    marginRight: 'auto',
    right: 6,
    ...sombraPadrao,
  },
  botoes: {
    marginTop: 4,
    flexDirection: 'column',
  },
  botaoTexto: {
    fontWeight: 'bold',
    fontFamily: fontes.padrao,
    fontSize: 19,
    color: cores.textoCinza,
  },
  botaoTexto2: {
    fontWeight: 'bold',
    fontFamily: fontes.padrao,
    fontSize: 15,
    color: '#b3dde6',
  },
  botaoTexto1: {
    fontSize: 17,
    fontFamily: fontes.padrao,
  },
  nomeicon: {
    flexDirection: 'row',
    marginLeft: 6,
  },
  mensagem2: {
    fontSize: 14,
    fontFamily: fontes.padrao,
    marginTop: -15,
    color: cores.erro,
  },
});