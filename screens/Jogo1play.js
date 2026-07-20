import React from 'react';
import { Text,View,StyleSheet, TouchableOpacity,Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Audio } from 'expo-av';

export default class Jogo1play extends React.Component {
    constructor(props){
      super(props)
      this.state={
        perfil: this.props.route.params.perfil,
        expressao:'',
        rodada: 0,
        acertos: 0,
        erros: 0,
        chute: '',
        resposta: '',
        acabou: false,
        botaoCerto: null,
        botaoErrado: null,
        espera: false,
      }
  }
  componentDidMount(){
    this.validar();
  }

  aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  op_aleatoria(){
    let op = this.aleatorio(1,4)
    if(op == 1) return " + "

    if( op == 2) return " - "

    if(op == 3)  return " * "

    if(op == 4)  return " / "
  }

  troca_ordem(op,op2,op3){
    if(this.state.rodada < 7){
      if(Math.random() < 0.5){
        let temp = op
        op = op2
        op2 = temp
      }
      return [op,op2,op3]
    }
    else{
      if(Math.random() < 0.5){
        let temp = op
        op = op2 
        op2 = temp
      }
      if(Math.random() < 0.5){
        let temp = op2
        op2 = op3
        op3 = temp
      }
      return [op,op2,op3]
    }
  }

  verifica_sinal(op,op2,op3,sinal){
    if(this.state.rodada >= 7){
      if(op == sinal) return [" ■ ",op2,op3]
      if(op2 == sinal) return [op," ■ ",op3]
      if(op3 == sinal) return [op,op2," ■ "]
    } 
    else{
      if(op == sinal) return [" ■ ",op2,op3]
      if(op2 == sinal) return [op," ■ ",op3]
    }
    return [op, op2, op3]
  }

  verifica_inteiro(x){
    if (!Number.isInteger(x)){
      return x.toFixed(2)
    }
    return x
  }

  formatar(x){
     x = x.split(" * ").join(" × ")
     x = x.split(" / ").join(" ÷ ")
      return x
  }

  avaliarExpressao(expressao){
    const tokens = expressao.match(/\d+\.?\d*|\+|-|\*|\/|\(|\)/g) || []
    let pos = 0

    const parseFactor = () => {
      if(tokens[pos] === '('){
        pos++
        const valor = parseExpr()
        pos++ // fecha ')'
        return valor
      }
      if(tokens[pos] === '-'){
        pos++
        return -parseFactor()
      }
      return parseFloat(tokens[pos++])
    }

    const parseTerm = () => {
      let valor = parseFactor()
      while(tokens[pos] === '*' || tokens[pos] === '/'){
        const op = tokens[pos++]
        const prox = parseFactor()
        valor = op === '*' ? valor * prox : valor / prox
      }
      return valor
    }

    const parseExpr = () => {
      let valor = parseTerm()
      while(tokens[pos] === '+' || tokens[pos] === '-'){
        const op = tokens[pos++]
        const prox = parseTerm()
        valor = op === '+' ? valor + prox : valor - prox
      }
      return valor
    }

    return parseExpr()
  }

  expandir(resultado){
    resultado = Number(resultado) 
    let op = this.aleatorio(1,4)

    if(resultado == 0){ // pra n dar problema com denominador 0
      op = this.aleatorio(1,2)
    }

    let n3
    let n = 0
    while(n==0){
      n = this.aleatorio(-50,50)
    }
    if(op == 1){
      n3 = resultado - n
      n3 = this.verifica_inteiro(n3)
      if(n>0){
        return n3 + " + " + n
      }
      return n3 + " + (" + n + ")"
    }
    if(op == 2){
      n3 = resultado + n
      n3 = this.verifica_inteiro(n3)
      if(n>0){
        return n3 + " - " + n
      }
      return n3 + " + (" + n + ")"
    }
    if(op == 3){
      n3 = resultado / n
      n3 = this.verifica_inteiro(n3)
      if(n>0){
        return n3 + " × " + n
      }
      return n3 + " × (" + n + ")"
    }
    if(op == 4){
      n3 = resultado * n
      n3 = this.verifica_inteiro(n3)
      if(n>0){
        return n3 + " ÷ " + n
      }
      return n3 + " ÷ (" + n + ")"
    }
  }

  criar_expressao(){
    // "alvo" é o operador que o jogador vai precisar adivinhar nesta rodada
    const alvo = this.op_aleatoria()
    this.setState({resposta: alvo})
    const icon = "■"

    let op = alvo
    let op2 = this.op_aleatoria()
    let op3 = this.op_aleatoria()

    let n1 = this.aleatorio(1,100)
    let n2 = this.aleatorio(1,100)
    let n3 = this.aleatorio(1,100)
    let n4 = this.aleatorio(1,75)

    let rodada5e6 = this.aleatorio(1,2)
    let final = this.aleatorio(1,3)
    let resultado, expressaotemp
    const rodada = this.state.rodada

    if(rodada < 2){
      resultado = this.avaliarExpressao(`${n1}${op}${n2}`)
      resultado = this.verifica_inteiro(resultado)
      expressaotemp = n1 + " " + icon + " " + n2 + " = " + resultado
    }
    else if(rodada < 4){
      [op,op2,op3] = this.troca_ordem(op,op2,op3)
      resultado = this.avaliarExpressao(`${n1}${op}${n2}${op2}${n3}`)
      ;[op,op2,op3] = this.verifica_sinal(op,op2,op3,alvo)
      resultado = this.verifica_inteiro(resultado)
      expressaotemp = n1 + op + n2 + op2 + n3 + " = " + resultado
      expressaotemp = this.formatar(expressaotemp)
    }
    else if(rodada < 5){
      [op,op2,op3] = this.troca_ordem(op,op2,op3)
      if(rodada5e6 == 1){
        resultado = this.avaliarExpressao(`${n1}${op}(${n2}${op2}${n3})`)
        ;[op,op2,op3] = this.verifica_sinal(op,op2,op3,alvo)
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = n1 + op + "(" + n2 + op2 + n3 + ") = " + resultado
      } else {
        resultado = this.avaliarExpressao(`(${n1}${op}${n2})${op2}${n3}`)
        ;[op,op2,op3] = this.verifica_sinal(op,op2,op3,alvo)
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = "(" + n1 + op + n2 + ")" + op2 + n3 + " = " + resultado
      }
      expressaotemp = this.formatar(expressaotemp)
    }
    else if(rodada < 6){
      [op,op2,op3] = this.troca_ordem(op,op2,op3)
      if(rodada5e6 == 1){
        resultado = this.avaliarExpressao(`${n1}${op}(${n2}${op2}${n3})`)
        ;[op,op2,op3] = this.verifica_sinal(op,op2,op3,alvo)
        resultado = this.verifica_inteiro(resultado)
        resultado = this.expandir(resultado)
        expressaotemp = n1 + op + "(" + n2 + op2 + n3 + ") = " + resultado
      } else {
        resultado = this.avaliarExpressao(`(${n1}${op}${n2})${op2}${n3}`)
        ;[op,op2,op3] = this.verifica_sinal(op,op2,op3,alvo)
        resultado = this.verifica_inteiro(resultado)
        resultado = this.expandir(resultado)
        expressaotemp = "(" + n1 + op + n2 + ")" + op2 + n3 + " = " + resultado
      }
      expressaotemp = this.formatar(expressaotemp)
    }
    else if(rodada < 8){
      [op,op2,op3] = this.troca_ordem(op,op2,op3)
      resultado = this.avaliarExpressao(`${n1}${op}${n2}${op2}${n3}${op3}${n4}`)
      ;[op,op2,op3] = this.verifica_sinal(op,op2,op3,alvo)
      resultado = this.verifica_inteiro(resultado)
      expressaotemp = n1 + op + n2 + op2 + n3 + op3 + n4 + " = " + resultado
      expressaotemp = this.formatar(expressaotemp)
    }
    else if(rodada < 9){
      [op,op2,op3] = this.troca_ordem(op,op2,op3)
      if(final == 1){
        resultado = this.avaliarExpressao(`(${n1}${op}${n2})${op2}${n3}${op3}${n4}`)
        ;[op,op2,op3] = this.verifica_sinal(op,op2,op3,alvo)
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = "(" + n1 + op + n2 + ")" + op2 + n3 + op3 + n4 + " = " + resultado
      }
      if(final == 2){
        resultado = this.avaliarExpressao(`${n1}${op}${n2}${op2}(${n3}${op3}${n4})`)
        ;[op,op2,op3] = this.verifica_sinal(op,op2,op3,alvo)
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = n1 + op + n2 + op2 + "(" + n3 + op3 + n4 + ") = " + resultado
      }
      if(final == 3){
        resultado = this.avaliarExpressao(`${n1}${op}(${n2}${op2}${n3})${op3}${n4}`)
        ;[op,op2,op3] = this.verifica_sinal(op,op2,op3,alvo)
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = n1 + op + "(" + n2 + op2 + n3 +")" + op3 + n4 + " = " + resultado
      }
      expressaotemp = this.formatar(expressaotemp)
    }
    else if(rodada < 10){
      [op,op2,op3] = this.troca_ordem(op,op2,op3)
      if(final == 1){
        resultado = this.avaliarExpressao(`(${n1}${op}${n2})${op2}${n3}${op3}${n4}`)
        ;[op,op2,op3] = this.verifica_sinal(op,op2,op3,alvo)
        resultado = this.verifica_inteiro(resultado)
        resultado = this.expandir(resultado)
        expressaotemp = "(" + n1 + op + n2 + ")" + op2 + n3 + op3 + n4 + " = " + resultado
      }
      if(final == 2){
        resultado = this.avaliarExpressao(`${n1}${op}${n2}${op2}(${n3}${op3}${n4})`)
        ;[op,op2,op3] = this.verifica_sinal(op,op2,op3,alvo)
        resultado = this.verifica_inteiro(resultado)
        resultado = this.expandir(resultado)
        expressaotemp = n1 + op + n2 + op2 + "(" + n3 + op3 + n4 + ") = " + resultado
      }
      if(final == 3){
        resultado = this.avaliarExpressao(`${n1}${op}(${n2}${op2}${n3})${op3}${n4}`)
        ;[op,op2,op3] = this.verifica_sinal(op,op2,op3,alvo)
        resultado = this.verifica_inteiro(resultado)
        resultado = this.expandir(resultado)
        expressaotemp = n1 + op + "(" + n2 + op2 + n3 +")" + op3 + n4 + " = " + resultado
      }
      expressaotemp = this.formatar(expressaotemp)
    }

    this.setState({expressao: expressaotemp})
  }

 //////////////////////////////////////////////

  validar(){
    if(this.state.espera){
      return
    }
    if(this.state.rodada == 0){
      this.criar_expressao();
      this.setState({ rodada: this.state.rodada + 1 });
    }

    else if(this.state.rodada < 10){
      if(this.state.chute == ''){
        return
      }
      this.pontuar()
      this.criar_expressao();
      this.setState({ rodada: this.state.rodada + 1, chute: '' });
    }

    else if(this.state.rodada == 10 && !this.state.acabou){
    if(this.state.chute == ''){
      return
    }
      this.pontuar()
      setTimeout(() => {
          this.setState({
            acabou: true,
            chute: '',
          });
        }, 1000);
      }
  }
  /////////////////////////////////////////////////
  escolhersinal(sinal) {

    if(this.state.espera || this.state.acabou){
      return
    }

    if (this.state.chute === sinal) {
      this.setState({ chute: '' });
    } else {
      this.setState({ chute: sinal });
    }
  }

  ///////////////////////////////////////////////
  pontuar(){
    if(this.state.chute == this.state.resposta){
      this.tocarSom(require('../assets/respostacerta.mp3'), 0.2)
      this.setState({ acertos: this.state.acertos + 1,botaoCerto: this.state.chute,espera: true});
    }
    else{
      this.tocarSom(require('../assets/respostaerrada.mp3'), 0.2)
      this.setState({ erros: this.state.erros + 1, botaoCerto: this.state.resposta, botaoErrado: this.state.chute,espera:true});
    }
    setTimeout(() => {
      this.setState({botaoCerto: null, botaoErrado: null, espera: false
      });
    }, 700); 
  }

  resetar() {
    if (this.soundAtual) {
      this.soundAtual.stopAsync();
      this.soundAtual.unloadAsync();
      this.soundAtual = null;
    }
    this.setState({
      expressao:'',
      rodada: 0,
      acertos: 0,
      erros: 0,
      chute: '',
      resposta: '',
      acabou: false,
      botaoCerto: null,
      botaoErrado: null,
      espera: false,
    }, () => {
      this.validar();
    });
  }

  // toca um som, interrompendo/descarregando o som anterior se houver.
  // substitui as 4 funcoes somCertaResposta/somErradaResposta/somDerrota/somVitoria.
  async tocarSom(arquivo, volume = 1){
    if (this.soundAtual) {
      await this.soundAtual.stopAsync();
      await this.soundAtual.unloadAsync();
      this.soundAtual = null;
    }

    const { sound } = await Audio.Sound.createAsync(arquivo);
    await sound.setVolumeAsync(volume);
    await sound.playAsync();
    this.soundAtual = sound;

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        sound.unloadAsync();
        this.soundAtual = null;
      }
    });
  }

  componentDidUpdate(prevProps, prevState){
    if (!prevState.acabou && this.state.acabou && this.state.acertos < 6){
      this.tocarSom(require('../assets/perdeu.mp3'))
    }
    if (!prevState.acabou && this.state.acabou && this.state.acertos >= 6 ){
      this.tocarSom(require('../assets/ganhou.mp3'))
    }
  }

    render() {
    return (
      <View style={estilos.tudo}>
        <Text style={estilos.rodada}>Rodada {this.state.rodada}</Text>   
         <View style={estilos.stats}>
            <View style={estilos.acertos}>
              <MaterialIcons name="check-box" size={17} color="#60d06e"/> 
              <Text style={estilos.pontos}> {this.state.acertos} </Text>
            </View>
            <View style={estilos.erros}>
              <MaterialCommunityIcons name="close-box" size={18} color="#fd5353"  style={estilos.iconruim}/>
              <Text style={estilos.pontos}> {this.state.erros} </Text>
            </View>
        </View>
        <View style={estilos.box}>
          <Text style={estilos.expressao}>{this.state.expressao}</Text> 
        </View>
        <View style={estilos.botoes}>
          <View style={estilos.sinais}>

            <TouchableOpacity 
            style={[estilos.botaosinal,
            this.state.chute === " + " && estilos.botaoselecionado,
            this.state.botaoCerto === " + " && { backgroundColor: 'green' },
            this.state.botaoErrado === " + " && { backgroundColor: 'red' }]} 
            onPress={() => this.escolhersinal(" + ")} activeOpacity={0.6}>
              <Text style={[estilos.textobotao,
              this.state.chute === " + " && estilos.textoselecionado,
              (this.state.botaoCerto === " + " || this.state.botaoErrado === " + ") && estilos.textobotao ]}>+</Text>
            </TouchableOpacity>

             <TouchableOpacity 
            style={[estilos.botaosinal,
            this.state.chute === " - " && estilos.botaoselecionado,
            this.state.botaoCerto === " - " && { backgroundColor: 'green' },
            this.state.botaoErrado === " - " && { backgroundColor: 'red' }]} 
            onPress={() => this.escolhersinal(" - ")} activeOpacity={0.6}>
              <Text style={[estilos.textobotao,
              this.state.chute === " - " && estilos.textoselecionado,
              (this.state.botaoCerto === " - " || this.state.botaoErrado === " - ") && estilos.textobotao ]}>-</Text>
            </TouchableOpacity>

          </View>
          <View style={estilos.sinais2}>

              <TouchableOpacity 
            style={[estilos.botaosinal,
            this.state.chute === " * " && estilos.botaoselecionado,
            this.state.botaoCerto === " * " && { backgroundColor: 'green' },
            this.state.botaoErrado === " * " && { backgroundColor: 'red' }]} 
            onPress={() => this.escolhersinal(" * ")} activeOpacity={0.6}>
              <Text style={[estilos.textobotao,
              this.state.chute === " * " && estilos.textoselecionado,
              (this.state.botaoCerto === " * " || this.state.botaoErrado === " * ") && estilos.textobotao ]}>×</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={[estilos.botaosinal,
            this.state.chute === " / " && estilos.botaoselecionado,
            this.state.botaoCerto === " / " && { backgroundColor: 'green' },
            this.state.botaoErrado === " / " && { backgroundColor: 'red' }]} 
            onPress={() => this.escolhersinal(" / ")} activeOpacity={0.6}>
              <Text style={[estilos.textobotao,
              this.state.chute === " / " && estilos.textoselecionado,
              (this.state.botaoCerto === " / " || this.state.botaoErrado === " / ") && estilos.textobotao ]}>÷</Text>
            </TouchableOpacity>

          </View>
          <TouchableOpacity style={estilos.botao} onPress={() => this.validar()} activeOpacity={0.6}>
              <Text style={estilos.textobotao2}>Confirmar</Text>
          </TouchableOpacity>

           {this.state.acabou && (
            <TouchableOpacity 
              style={estilos.botao3} 
              onPress={() => this.resetar()} 
              activeOpacity={0.6}
            >
              <Text><MaterialIcons name="restart-alt" size={30} color="#014a7d" /></Text>
            </TouchableOpacity>
          )}

        </View>
        <TouchableOpacity 
            style={estilos.setaBack} 
            onPress={() => this.props.navigation.navigate('Jogo1')} activeOpacity={0.6}>
            <Text style={{ fontSize: 46, color: "#014a7d" }}>←</Text>
        </TouchableOpacity>

        {this.state.acabou && this.state.acertos >= 6 && (
          <Image source={require('../assets/Aprovado.png')}style={estilos.imagem}/>
        )}
         {this.state.acabou && this.state.acertos < 6 && (
          <Image source={require('../assets/desaprovado.png')}style={estilos.imagem} />
        )}
      </View>
    );
  }
}


const estilos = StyleSheet.create({
  tudo:{
    flex : 1,
    backgroundColor: "#d0f6fe"
  },
  rodada:{
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "sans-serif",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50
  },
  botao:{
    borderRadius:30,
    width: "70%",
    height: 50,
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5, 
    elevation: 5,
    marginBottom: 60,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -30,
    paddingBottom: 2
  },
  textobotao2:{
    fontSize: 20,
    fontWeight: "bold",
    color: "#61d1ea",
  },
  box:{
    backgroundColor: "white",
    height: 200,
    width: "90%",
    alignSelf: "center",
    top: "8%",
    borderRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 5, 
    elevation: 5,
    justifyContent:"center",
    alignItems: "center",
    resizeMode: "cover"
  },
  imagem:{
    height: 225,
    width: "92%",
    position: "absolute",
    alignSelf: "center",
    top: "23%",
    borderRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 5, 
    elevation: 5,
  },
  expressao:{
    fontSize: 20,
    fontWeight: "bold",
  },
  sinais:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 22,
    marginRight: 22,
    marginTop: -20
  },
  sinais2:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 22,
    marginRight: 22,
    marginTop: -50
  },
  botoes:{
    marginTop: 100
  },
  botaosinal:{
    width: "45%",
    height: 45,
    alignItems: "center",
    backgroundColor: "#61d1ea",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5, 
    elevation: 5,
    marginBottom: 60,
    marginTop: 20,
    borderRadius: 30,
  },
  textobotao:{
    fontSize: 30,
    fontWeight: "bolder",
    color: "white",
  },
  botaoselecionado: {
    backgroundColor: "white"
  },
  textoselecionado:{
    color: "#61d1ea",
  },
  stats:{
    flexDirection:"row",
    justifyContent: "center",
    backgroundColor: "#014a7d",
    width: 130,
    height: 36,
    alignSelf: "center",
    marginTop: 45,
    marginBottom: -42,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5, 
    elevation: 5,
  },
  pontos:{
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: -1,
    color: "white"
  },
  acertos:{
    flexDirection: "row",
    marginRight: 20,
    alignItems: "center"
  },
  erros:{
    flexDirection: "row",
    alignItems: "center",
    marginTop: -1
  },
    setaBack:{
    position: "absolute",
    left: 18,
    top: 22, 
    zIndex: 1,
  },
  iconruim:{
    marginTop: 1
  },
  botao3:{
    height: 30,
    alignItems: "center",
    justifyContent:"center",
    marginBottom: 60,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -40,
  },
})