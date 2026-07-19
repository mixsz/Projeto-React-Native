import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { cores, fontes, sombraPadrao } from '../styles/tema';

const ELEMENTOS = {
  agua: { nome: 'Água', icone: <Ionicons name="water-sharp" size={18} color="#00c2ff" /> },
  fogo: { nome: 'Fogo', icone: <Fontisto name="fire" size={18} color="orange" /> },
  neve: { nome: 'Neve', icone: <FontAwesome name="snowflake-o" size={18} color="#58c9d1" /> },
};

const setaDireita = <FontAwesome name="long-arrow-right" size={18} color="black" />;

export default class Jogo2tutorial extends React.Component {
  matchup(vencedor, perdedor) {
    return (
      <View style={estilos.matchup}>
        <View style={estilos.matchupLado}>
          {ELEMENTOS[vencedor].icone}
          <Text style={estilos.matchupTexto}>{ELEMENTOS[vencedor].nome}</Text>
        </View>
        {setaDireita}
        <View style={estilos.matchupLado}>
          {ELEMENTOS[perdedor].icone}
          <Text style={estilos.matchupTexto}>{ELEMENTOS[perdedor].nome}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={estilos.tudo}>
        <Image source={require('../assets/cardduel.png')} style={estilos.logo} />
        <View style={estilos.box}>
          <View style={estilos.texto}>
            <Text style={estilos.titulo}>Como jogar?</Text>

            <Text style={estilos.palavra}>
              Card Duel é um duelo de cartas, onde você enfrenta o famoso Sensei em uma batalha estratégica.
            </Text>

            <Text style={estilos.palavra}>
              O jogo começa com a distribuição de 5 cartas aleatórias para ambos os lados. A cada rodada, você e a
              casa escolhem uma carta para duelar.
            </Text>

            <Text style={estilos.palavra}>
              As cartas são divididas em 2 atributos: elemento e nível de poder. Cada elemento vence o outro:
            </Text>

            {this.matchup('agua', 'fogo')}
            {this.matchup('fogo', 'neve')}
            {this.matchup('neve', 'agua')}

            <Text style={estilos.palavra}>
              Se o elemento de uma carta for igual ao outro, o nível de poder é utilizado para determinar o vencedor
              da rodada.
            </Text>

            <Text style={estilos.palavra}>Seu objetivo é vencer este duelo, e você possui 2 maneiras de vencer:</Text>
            <Text style={estilos.palavra}>• Fazendo 3 pontos com o mesmo elemento</Text>
            <Text style={estilos.palavra}>• Fazendo no mínimo 1 ponto com cada elemento</Text>
          </View>

          <TouchableOpacity style={estilos.botao} onPress={() => this.props.navigation.navigate('Jogo2')} activeOpacity={0.6}>
            <Text style={estilos.textobotao2}>Entendido</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={estilos.setaBack} onPress={() => this.props.navigation.navigate('Jogo2')}>
          <Text style={{ fontSize: 46, color: 'black' }}>←</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const estilos = StyleSheet.create({
  tudo: {
    flex: 1,
    backgroundColor: '#dff6fb',
  },
  logo: {
    height: 80,
    width: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 20,
    marginBottom: 10,
  },
  box: {
    backgroundColor: '#d0e7e6',
    height: 590,
    paddingTop: 20,
    borderRadius: 50,
  },
  texto: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  titulo: {
    fontWeight: 'bold',
    fontFamily: fontes.padrao,
    fontSize: 22,
    color: 'black',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: -12,
    right: 5,
    marginBottom: 10,
  },
  palavra: {
    fontFamily: fontes.padrao,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    padding: 3,
  },
  matchup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    gap: 12,
  },
  matchupLado: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  matchupTexto: {
    fontFamily: fontes.padrao,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  botao: {
    borderRadius: 20,
    width: '60%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.textoCinza,
    marginLeft: 'auto',
    marginRight: 'auto',
    ...sombraPadrao,
    marginTop: 3
  },
  textobotao2: {
    fontWeight: 'bold',
    fontFamily: fontes.padrao,
    fontSize: 18,
    color: cores.azulAccent,
  },
  setaBack: {
    position: 'absolute',
    left: 18,
    top: 24,
    zIndex: 1,
  },
});