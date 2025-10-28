  import React from 'react';
  import { Text,View,Button,TextInput,StyleSheet, TouchableOpacity,TouchableHighlight,Image,ScrollView,ImageBackground } from 'react-native';
  import Ionicons from '@expo/vector-icons/Ionicons';
  import Fontisto from '@expo/vector-icons/Fontisto';
  import FontAwesome from '@expo/vector-icons/FontAwesome';

  const cartas = {
    agua: {
      1: require('../assets/Aprovado.png'),
      2: require('../assets/cardduel.png'),
      3: require('../assets/desaprovado.png'),
      4: require('../assets/fogao.jpg'),
      5: require('../assets/logojogo1.png'),
      6: require('../assets/Aprovado.png'),
      7: require('../assets/cardduel.png'),
      8: require('../assets/logojogo1.png'),
    },
    fogo: {
      1: require('../assets/Aprovado.png'),
      2: require('../assets/cardduel.png'),
      3: require('../assets/desaprovado.png'),
      4: require('../assets/fogao.jpg'),
      5: require('../assets/logojogo1.png'),
      6: require('../assets/Aprovado.png'),
      7: require('../assets/cardduel.png'),
      8: require('../assets/logojogo1.png'),
    },
    neve: {
      1: require('../assets/Aprovado.png'),
      2: require('../assets/cardduel.png'),
      3: require('../assets/desaprovado.png'),
      4: require('../assets/fogao.jpg'),
      5: require('../assets/logojogo1.png'),
      6: require('../assets/Aprovado.png'),
      7: require('../assets/cardduel.png'),
      8: require('../assets/logojogo1.png'),
    }
  };

  export default class Jogo2play extends React.Component {
    constructor(props){
        super(props)
        this.state={
          cartaSelecionada: null,
          deck: this.criarDeck(),
        }
    }

    criarCarta(){ // SORTEIA DE 0 A 2 PRA VER QUAL ELEMENTO SERÁ, DEPOIS ESCOLHE DE 0+1 A 7+1 O NIVEL E RETORNA A CARTA COM TIPO, NIVEL E A IMAGEM
      const elementos = ['agua', 'fogo', 'neve'];
      const tipo = elementos[Math.floor(Math.random() * 3)];
      const nivel = Math.floor(Math.random() * 8) + 1 // pra n cair 0
      return{
        tipo, 
        nivel,
        imagem: cartas[tipo][nivel],
      }
    }

    criarDeck(){
      const qtd = 5
      const deck = []
      for (let i = 0; i < qtd; i++){ // CRIA 5 CARTAS...
        deck.push(this.criarCarta())
      }
      return deck
    }


  carta({ tipo, nivel, imagem, onPress, index}){
    const icones={
      fogo: <Fontisto name="fire" size={16} color="orange" />,
      agua: <Ionicons name="water-sharp" size={16} color="#00c2ff" />,
      neve: <FontAwesome name="snowflake-o" size={16} color="white" />,
    };

    const coresBorda={
      fogo: 'yellow',
      agua: 'blue',
      neve: '#85f8ff',
    };
    const corFinal = this.state.cartaSelecionada === index ? 'green' : coresBorda[tipo];
    const corStatsFinal = this.state.cartaSelecionada === index ? 'green' : coresBorda[tipo];

    return (
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <ImageBackground source={imagem} style={[estilos.carta, { borderColor: corFinal }]}>
        <View style={[estilos.stats, { backgroundColor: corStatsFinal }]}>
            <Text style={estilos.elemento}>{icones[tipo]}</Text>
            <Text style={estilos.nivel}>{nivel}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

    render() {
      return(
          <View style={estilos.tudo}>
            <View style={estilos.deckinteiro}>
              {this.state.deck.map((c, index) => 
                this.carta({ 
                  tipo: c.tipo, 
                  nivel: c.nivel, 
                  imagem: c.imagem,
                  index, // pra saber qual carta foi selecionada e mudar a cor
                  onPress: () => this.setState({ cartaSelecionada: index })
                })
              )}
            </View>
            <TouchableOpacity style={estilos.botao} activeOpacity={0.6}>
              <FontAwesome name="hand-stop-o" size={70} color="black" />
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
      alignItems: "center",
      backgroundColor: "#dcd5d3",
      height: 1000,
      paddingTop: 30,
      width: "100%",
      alignSelf: "center",
      top: "65%",
      borderRadius: 30,
      borderWidth: 3,
      borderColor: "#6b6b6b"
    },
    botao:{
      position: "absolute",
      borderRadius: 100,
      alignItems: "center",
      justifyContent:"center",
      marginTop: 20,
      left: "40%",
      top: "84%",
    },
    carta: {
    margin: 2,
    height: 100,
    width: 64,
    backgroundColor: "white",
    borderWidth: 4,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 4,             
    shadowColor: "#000",    
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 3,
  },
  stats: {
    width: 16,
    borderBottomRightRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  nivel: {
    fontFamily: "sans-serif",
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginLeft: -3
  },
  elemento:{
    marginLeft: -3
  }

  })
