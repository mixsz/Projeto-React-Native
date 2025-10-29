  import React from 'react';
  import { Text,View,Button,TextInput,StyleSheet, TouchableOpacity,TouchableHighlight,Image,ScrollView,ImageBackground } from 'react-native';
  import Ionicons from '@expo/vector-icons/Ionicons';
  import Fontisto from '@expo/vector-icons/Fontisto';
  import FontAwesome from '@expo/vector-icons/FontAwesome';
  import fundo from '../assets/dojo.webp'; // sua imagem

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
          pontosUser:{
            agua: 1,
            fogo: 2,
            neve: 3,
          },
          pontosCasa:{
            agua: 2,
            fogo: 0,
            neve: 2,
          },
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
      const deck = [];

      while(deck.length < 5){
        const carta = this.criarCarta();
        const jaExiste = deck.some(c => c.tipo === carta.tipo && c.nivel === carta.nivel); // verifica se a carta ja ta no deck p n repetir..
        if (!jaExiste) {
          deck.push(carta);
        }
      }

      return deck;
    }


  selecionarCarta(index){
      if(this.state.cartaSelecionada != index){
        this.setState({ cartaSelecionada: index })
      }
      else{
        this.setState({ cartaSelecionada: null })
      }
  }
  
  CartaPlacar = ({ tipo }) =>{
    const cores = {
      fogo: 'orange',
      agua: '#00c2ff',
      neve: '#85f8ff',
    };

    const icones = {
      fogo: <Fontisto name="fire" size={16} color="orange" />,
      agua: <Ionicons name="water-sharp" size={18} color="#00c2ff" />,
      neve: <FontAwesome name="snowflake-o" size={16} color="#85f8ff" />,
    };

    return (
      <View style={{
        height: 25,
        width: 25,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: cores[tipo],
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2,
      }}>
        {icones[tipo]}
      </View>
    );
  };

  carta({ tipo, nivel, imagem, onPress, index}){
    const icones={
      fogo: <Fontisto name="fire" size={16} color="orange" />,
      agua: <Ionicons name="water-sharp" size={16} color="#00c2ff" />,
      neve: <FontAwesome name="snowflake-o" size={16} color="white" />,
    };

    const coresBorda={
      fogo: 'yellow',
      agua: '#183ccb',
      neve: '#85f8ff',
    };
    const corFinal =
        this.state.cartaSelecionada === 
        index ? 'green' : // se for a selecionada fica verde
        nivel === 8 && tipo === "fogo" ? '#6a2020' :
        nivel === 8 && tipo === "agua" ? '#272972' :
        nivel === 8 && tipo === "neve" ? '#358f8f' :
        coresBorda[tipo];

    const corStatsFinal =
      this.state.cartaSelecionada ===
      index? 'green' :
      nivel === 8 && tipo === "fogo" ? '#6a2020' :
      nivel === 8 && tipo === "agua" ? '#272972' :
      nivel === 8 && tipo === "neve" ? '#358f8f' :
      coresBorda[tipo];

    const corPalavra = nivel === 8 ? 'white' : 'black';



    return (
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <ImageBackground source={imagem} style={[estilos.carta, { borderColor: corFinal }]}>
        <View style={[estilos.stats, { backgroundColor: corStatsFinal }]}>
            <Text style={estilos.elemento}>{icones[tipo]}</Text>
            <Text style={[estilos.nivel,{color: corPalavra}]}>
              {nivel}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

    render() {
      return(
          <ImageBackground source={fundo} style={estilos.tudo}>
            <View style={estilos.deckinteiro}>
              {this.state.deck.map((c, index) => 
                this.carta({ 
                  tipo: c.tipo, 
                  nivel: c.nivel, 
                  imagem: c.imagem,
                  index, // pra saber qual carta foi selecionada e mudar a cor
                  onPress: () => this.selecionarCarta(index)
                })
              )}
            </View>
            
            <TouchableOpacity style={estilos.botao} activeOpacity={0.8}>
              <FontAwesome style={[estilos.mao,this.state.cartaSelecionada !== null && { backgroundColor: "#3d8537" }]} 
                name="hand-stop-o" size={58} color="black" />
            </TouchableOpacity>

            <View style={estilos.placar}>
              <View style={[estilos.placarColuna, { marginLeft: 13 }]}>
                <Text style={estilos.placarPalavra}>Você</Text>
                <View style={estilos.placarElementos}>
                  {['fogo', 'agua', 'neve'].map(tipo => (
                    <View key={tipo} style={estilos.placarElementoColuna}>
                      <View style={estilos.slotElemento}>
                        {Array(this.state.pontosUser[tipo]).fill().map((_, i) =>
                          this.CartaPlacar({ tipo, key: i })
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
              <View style={[estilos.placarColuna, { marginLeft: -6}]}>
                <Text style={estilos.placarPalavra}>Casa</Text>
                <View style={estilos.placarElementos}>
                  {['fogo', 'agua', 'neve'].map(tipo => (
                    <View key={tipo} style={estilos.placarElementoColuna}>
                      <View style={estilos.slotElemento}>
                        {Array(this.state.pontosCasa[tipo]).fill().map((_, i) =>
                          this.CartaPlacar({ tipo, key: i })
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>

          <View style={estilos.linha}/>
        </ImageBackground>
      );
    }
  }

  const estilos = StyleSheet.create({
    tudo:{
      flex: 1,
      backgroundColor: "white",
    },
    deckinteiro:{
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#c9c9c9",
      width: "100%",
      alignSelf: "center",
      top: "71%",
      paddingVertical: 8,
      borderWidth: 3
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
    carta:{
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
  stats:{
    width: 16,
    borderBottomRightRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 35
  },
  nivel:{
    fontFamily: "sans-serif",
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginLeft: -3
  },
  elemento:{
    marginLeft: -3
  },
  mao: {
    backgroundColor: '#853737',
    borderRadius: 50,         
    width: 70,              
    height: 70,                 
    textAlign: 'center', 
    textAlignVertical: 'center',
    lineHeight: 65,      
    right: -3,
    bottom: -17    
  },
 placar:{
    position: "absolute",
    height: 125,
    width: "80%",
    top: "5%",
    left: "10%",
    borderRadius: 20,
    backgroundColor: "#d6d6d6",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 3,
    borderColor: "black",
  },
  placarPalavra:{
    fontFamily: "sans-serif",
    fontSize:16,
    fontWeight: "bold",
  },
  linha:{
    height: 125,
    width: 3,
    backgroundColor: "black",
    position: "absolute",
    alignSelf: "center",
    left: "50%",
    top: "5%",
  },
  placarColuna:{
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: 120, 
      height: 100, 
      marginHorizontal: 20, 
    },
    placarElementos:{
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginTop: 5,
    },
    placarElementoColuna:{
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginHorizontal: 2,
      height: 89, 
      width: 30,
    },
   slotElemento:{
    height: 80, 
    width: 30, 
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
})
