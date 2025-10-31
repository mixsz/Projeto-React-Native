  import React from 'react';
  import { Text,View,StyleSheet, TouchableOpacity,ImageBackground } from 'react-native';
  import Ionicons from '@expo/vector-icons/Ionicons';
  import Fontisto from '@expo/vector-icons/Fontisto';
  import FontAwesome from '@expo/vector-icons/FontAwesome';
  import fundo from '../assets/dojo.webp'; // sua imagem
  import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

  const setaDireita = <FontAwesome name="long-arrow-right" size={28} color="black" />
  const setaEsquerda = <FontAwesome name="long-arrow-left" size={28} color="black" />
  const igual = <FontAwesome5 name="equals" size={25} color="black" />
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
  const imagens = [
  require('../assets/senseiagua2.png'),
  require('../assets/senseineve2.png'),
  require('../assets/senseifogo2.png'),
  require('../assets/senseielemento2.png'),
  require('../assets/senseiperdeu.png'),
];

  export default class Jogo2play extends React.Component {
      constructor(props){
        super(props)
        this.state={
          cartaIndex: null,
          cartaEscolhidaUser: null,  // carta escolhida n é a confirmacao ainda
          deckUser: this.criarDeck(),
          deckCasa: this.criarDeck(),
          pontosUser:{
            agua: 0,
            fogo: 0,
            neve: 0,
          },
          pontosCasa:{
            agua: 0,
            fogo: 0,
            neve: 0,
          },
          permissao: true,
          cartaSelecionadaUser: null, // aqui é quando a carta foi confirmada
          cartaSelecionadaCasa: null,
          mensagem: null,
          acabou: false,
          imagem: null, 
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
      const deckUser = [];

      while(deckUser.length < 5){
        const carta = this.criarCarta();
        const jaExiste = deckUser.some(c => c.tipo === carta.tipo && c.nivel === carta.nivel); // verifica se a carta ja ta no deckUser p n repetir..
        if (!jaExiste) {
          deckUser.push(carta);
        }
      }

      return deckUser;
    }


  selecionarCarta(index){
    if(!this.state.permissao){
      return
    }
    const carta = this.state.deckUser[index];
    if(this.state.cartaIndex !== index){
      this.setState({cartaIndex: index, cartaEscolhidaUser: carta,
      });
    } 
    else{
      this.setState({cartaIndex: null, cartaEscolhidaUser: null, 
      })
    }
  }

  jogar(){
    if(this.state.cartaIndex == null || !this.state.permissao){
      return
    }
    const indexCasa = Math.floor(Math.random() * this.state.deckCasa.length)
    const cartaCasa = this.state.deckCasa[indexCasa]

      this.setState({
        cartaSelecionadaUser: this.state.cartaEscolhidaUser,
        cartaSelecionadaCasa: cartaCasa,
        permissao: false
      });

      setTimeout(() => {
       this.verificaRodada(this.state.cartaEscolhidaUser, cartaCasa);
      }, 1500);

      setTimeout(() => {
        this.atualizarCartaUser(this.state.cartaIndex);
        this.atualizarCartaCasa(indexCasa);
        this.setState({
          cartaSelecionadaUser: null,
          cartaSelecionadaCasa: null,
          cartaEscolhidaUser: null,
          cartaIndex: null, 
          permissao: true,
          mensagem: null
        });
      }, 3000);
      setTimeout(() => {
        this.verificaVitoria();
      }, 3000);
    }

  verificaRodada(cartaUser,cartaCasa){
    let mensagem;
    const icones = {
      fogo: <Fontisto name="fire" size={28} color="orange" />,
      agua: <Ionicons name="water-sharp" size={28} color="#00c2ff" />,
      neve: <FontAwesome name="snowflake-o" size={27} color="#58f5ff" />,
    };
    if(cartaUser.tipo === "fogo" && cartaCasa.tipo === "neve"){
      this.setState(prevState =>({
        pontosUser:{ 
          ...prevState.pontosUser,
          fogo: prevState.pontosUser.fogo + 1,
       }}))
        mensagem=(
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10}}>
            {icones[cartaUser.tipo]}
            {setaDireita}
            {icones[cartaCasa.tipo]}
          </View>
       );
       this.setState({ mensagem })
       return 1
    }

    else if(cartaUser.tipo === "agua" && cartaCasa.tipo === "fogo"){
      this.setState(prevState =>({
        pontosUser:{ 
          ...prevState.pontosUser, 
          agua: prevState.pontosUser.agua + 1
       }}))
      mensagem=(
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10}}>
            {icones[cartaUser.tipo]}
            {setaDireita}
            {icones[cartaCasa.tipo]}
          </View>
       );
       this.setState({ mensagem })
       return 1
    }

    else if(cartaUser.tipo === "neve" && cartaCasa.tipo === "agua"){
      this.setState(prevState =>({
        pontosUser:{ 
          ...prevState.pontosUser, 
          neve: prevState.pontosUser.neve + 1
       }}))
       mensagem=(
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10}}>
            {icones[cartaUser.tipo]}
            {setaDireita}
            {icones[cartaCasa.tipo]}
          </View>
       );
       this.setState({ mensagem })
       return 1
    }
    
    else if(cartaUser.tipo === cartaCasa.tipo){
      if(cartaUser.nivel > cartaCasa.nivel){
        this.setState(prevState => ({
          pontosUser:{
            ...prevState.pontosUser,
            [cartaUser.tipo]: prevState.pontosUser[cartaUser.tipo] + 1
          }
        }))
        mensagem = (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {icones[cartaUser.tipo]}
              <Text style={estilos.mensagemEstilo}>
                ({cartaUser.nivel})
              </Text>
            </View>
            <Text style={{ marginHorizontal: 5 }}>{setaDireita}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {icones[cartaCasa.tipo]}
              <Text  style={estilos.mensagemEstilo}>
                ({cartaCasa.nivel})
              </Text>
            </View>
          </View>
        );

       this.setState({ mensagem })
        return 1
      }
      else if(cartaUser.nivel < cartaCasa.nivel){
        this.setState(prevState =>({
          pontosCasa:{
            ...prevState.pontosCasa,
            [cartaCasa.tipo]: prevState.pontosCasa[cartaCasa.tipo] + 1
          }
        }))
        mensagem = (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {icones[cartaUser.tipo]}
              <Text  style={estilos.mensagemEstilo}>
                ({cartaUser.nivel})
              </Text>
            </View>
            <Text style={{ marginHorizontal: 5 }}>{setaDireita}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {icones[cartaCasa.tipo]}
              <Text  style={estilos.mensagemEstilo}>
                ({cartaCasa.nivel})
              </Text> 
            </View>
          </View>
        );

       this.setState({ mensagem })
        return 0
      }
      else{ // empate
       mensagem=(
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10}}>
            {icones[cartaUser.tipo]}
            {igual}
            {icones[cartaCasa.tipo]}
          </View>
       );
       this.setState({ mensagem })
        return 2
      }
    }

    else{
      this.setState(prevState =>({
        pontosCasa:{
          ...prevState.pontosCasa,
          [cartaCasa.tipo]: prevState.pontosCasa[cartaCasa.tipo] + 1
        }
      }))
      mensagem=(
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10}}>
          {icones[cartaUser.tipo]}
          {setaEsquerda}
          {icones[cartaCasa.tipo]}
        </View>
      );
      this.setState({ mensagem })
      return 0
    }
  }

  verificaVitoria(){
    if(this.state.pontosCasa.fogo >= 1 && this.state.pontosCasa.agua >= 1 && this.state.pontosCasa.neve >= 1){
      this.setState({imagem: imagens[3], acabou: true})
    }
    else if(this.state.pontosCasa.fogo == 3){
      this.setState({imagem: imagens[2], acabou: true})
    }
    else if(this.state.pontosCasa.agua == 3){
      this.setState({imagem: imagens[0], acabou: true})
    }
    else if(this.state.pontosCasa.neve == 3){
      this.setState({imagem: imagens[1], acabou: true})
    }
    else if(this.state.pontosUser.fogo == 3 || this.state.pontosUser.agua == 3 || this.state.pontosUser.neve == 3 || 
            (this.state.pontosUser.fogo >= 1 && this.state.pontosUser.agua >= 1 && this.state.pontosUser.neve >= 1)){
      this.setState({imagem: imagens[4], acabou: true})
    }
  }

  jogarNovamente(){
    this.setState({
          cartaIndex: null,
          cartaEscolhidaUser: null, 
          deckUser: this.criarDeck(),
          deckCasa: this.criarDeck(),
          pontosUser:{
            agua: 0,
            fogo: 0,
            neve: 0,
          },
          pontosCasa:{
            agua: 0,
            fogo: 0,
            neve: 0,
          },
          permissao: true,
          cartaSelecionadaUser: null,
          cartaSelecionadaCasa: null,
          mensagem: null,
          acabou: false,
          imagem: null, 
    })
  }

  atualizarCartaUser(index){
    const novoDeck = [...this.state.deckUser]

    let novaCarta = this.criarCarta()
    while (novoDeck.some(c => c.tipo === novaCarta.tipo && c.nivel === novaCarta.nivel)){
        novaCarta = this.criarCarta()
    }
    novoDeck[index] = novaCarta
    this.setState({
      deckUser: novoDeck
    });
  }

  atualizarCartaCasa(index){
    const novoDeckCasa = [...this.state.deckCasa];

    let novaCarta = this.criarCarta();
    while (novoDeckCasa.some(c => c.tipo === novaCarta.tipo && c.nivel === novaCarta.nivel)){
        novaCarta = this.criarCarta();
    }
    novoDeckCasa[index] = novaCarta
    this.setState({
      deckCasa: novoDeckCasa
    })
  }

  
  CartaPlacar=({ tipo })=>{
    const cores = {
      fogo: 'orange',
      agua: '#00c2ff',
      neve: '#85f8ff',
    }

    const icones = {
      fogo: <Fontisto name="fire" size={16} color="orange"/>,
      agua: <Ionicons name="water-sharp" size={18} color="#00c2ff"/>,
      neve: <FontAwesome name="snowflake-o" size={16} color="#85f8ff"/>,
    }

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
    )
  }

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
        this.state.cartaIndex === 
        index ? 'green' : // se for a selecionada fica verde
        nivel === 8 && tipo === "fogo" ? '#6a2020' :
        nivel === 8 && tipo === "agua" ? '#272972' :
        nivel === 8 && tipo === "neve" ? '#358f8f' :
        coresBorda[tipo];

    const corStatsFinal =
      this.state.cartaIndex ===
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

   renderCartaGrande(carta) {
      const { tipo, nivel, imagem } = carta;
      const icones = {
        fogo: <Fontisto name="fire" size={32} color="orange" />, // tamanho maior
        agua: <Ionicons name="water-sharp" size={32} color="#00c2ff" />,
        neve: <FontAwesome name="snowflake-o" size={32} color="white" />,
      };
      const coresBorda = {
        fogo: 'yellow',
        agua: '#183ccb',
        neve: '#85f8ff',
      };
      const corFinal =
        nivel === 8 && tipo === "fogo" ? '#6a2020' :
        nivel === 8 && tipo === "agua" ? '#272972' :
        nivel === 8 && tipo === "neve" ? '#358f8f' :
        coresBorda[tipo];
      const corStatsFinal =
        nivel === 8 && tipo === "fogo" ? '#6a2020' :
        nivel === 8 && tipo === "agua" ? '#272972' :
        nivel === 8 && tipo === "neve" ? '#358f8f' :
        coresBorda[tipo];
      const corPalavra = nivel === 8 ? 'white' : 'black';
      return (
        <ImageBackground source={imagem} style={[estilos.cartaGrande, { borderColor: corFinal }]}>
          <View style={[estilos.statsGrande, { backgroundColor: corStatsFinal }]}>
            <Text style={estilos.elementoGrande}>{icones[tipo]}</Text>
            <Text style={[estilos.nivelGrande, { color: corPalavra }]}>
              {nivel}
            </Text>
          </View>
        </ImageBackground>
      );
    }


    render() {
      return(

          <ImageBackground source={fundo} style={estilos.tudo}>
            {!this.state.acabou && (
              <View style={estilos.deckUserinteiro}>
                {this.state.deckUser.map((c, index) => 
                  this.carta({ 
                    tipo: c.tipo, 
                    nivel: c.nivel, 
                    imagem: c.imagem,
                    index, // pra saber qual carta foi selecionada e mudar a cor
                    onPress: () => this.selecionarCarta(index)
                  })
                )}
                <TouchableOpacity style={estilos.botao} activeOpacity={0.8} onPress={() => this.jogar()}>
                <FontAwesome style={[estilos.mao,this.state.cartaIndex !== null && { backgroundColor: "#3d8537" }]} 
                  name="hand-stop-o" size={58} color="black" />
                </TouchableOpacity>
              </View>
            )}
            
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
            
            
          {this.state.cartaSelecionadaUser && this.state.cartaSelecionadaCasa && (
            <View style={estilos.centro}>
              {this.renderCartaGrande(this.state.cartaSelecionadaUser)}
              {this.renderCartaGrande(this.state.cartaSelecionadaCasa)}
              {this.state.mensagem && (
                <View style={estilos.minibox}> 
                  {this.state.mensagem}
                </View>
              )}
            </View>
          )}

        {this.state.acabou && (
          <ImageBackground source={this.state.imagem} style={estilos.boxFinal} imageStyle={estilos.conteudoInterno}>
              <TouchableOpacity style={estilos.botao3} onPress={() =>this.jogarNovamente()} activeOpacity={0.9}>
                <Text style={estilos.botaoTexto}>Jogar novamente</Text>
              </TouchableOpacity>
              <TouchableOpacity style={estilos.botao4} onPress={() =>this.props.navigation.navigate('Home')} activeOpacity={0.9}>
                <Text style={estilos.botaoTexto}>Menu Principal</Text>
              </TouchableOpacity>
          </ImageBackground>
        )}  

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
    deckUserinteiro:{
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
    height: 35,
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
    bottom: -17,
    borderWidth: 1
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
    },
    centro:{
      position: 'absolute',
      top: '27%',
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 1000,
    },
    cartaGrande: {
      width: 150,
      height: 200,
      borderWidth: 6,
      borderColor: 'black',
      borderRadius: 11,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    statsGrande: {
      position: 'absolute',
      bottom: 125,
      right: 106, 
      width: 34,
      height: 70,
      borderBottomRightRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
  elementoGrande: {
    marginLeft: -3,
  },
  nivelGrande: {
    fontFamily: "sans-serif",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginLeft: -3,
  },
  minibox:{
    position: "absolute",
    backgroundColor: "white",
    top: "125%",
    height: 50,
    width: "50%",
    borderRadius: 25,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  mensagemEstilo:{
    fontFamily: "sans-serif",
    fontSize:22,
    fontWeight: "bold",
    marginLeft: 5,
    marginBottom: 2
  },
  boxFinal: {
    position: "absolute",
    height: 470,
    width: "100%",
    top: "23%",
    left: "1%",
    backgroundColor: "black",
  },
  conteudoInterno: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 3
  },
  botao3:{
    borderRadius: 15,
    width: "40%",
    height: 50,
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: "#3d8537",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5, 
    elevation: 5,
    borderWidth:2,
    position: "absolute",
    left: "5%",
    top: "103%"
  },
  botaoTexto:{
    fontWeight: "bold",
    fontFamily: "sans-serif",
    fontSize:16,
    color: "black"
  },
   botao4:{
    borderRadius: 15,
    width: "40%",
    height: 50,
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: "#853737",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5, 
    elevation: 5,
    borderWidth:2,
    position: "absolute",
    left: "50%",
    top: "103%"
  },
})
