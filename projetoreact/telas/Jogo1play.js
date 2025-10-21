import React from 'react';
import { Text,View,Button,TextInput,StyleSheet, TouchableOpacity,TouchableHighlight,Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
export default class Jogo1play extends React.Component {
    constructor(props){
      super(props)
      this.state={
        expressao:'',
        rodada: 0,
        acertos: 0,
        erros: 0,
        chute: '',
        resposta: '',
        acabou: false
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
    if(this.state.rodada > 7){
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

  expandir(resultado){
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
    let op = this.op_aleatoria()
    let resultado, expressaotemp
    const icon = "■"
    let n1 = this.aleatorio(1,100)
    let n2 = this.aleatorio(1,100)
    let n3 = this.aleatorio(1,100)
    let n4 = this.aleatorio(1,75)
    let op2 = this.op_aleatoria()
    let op3 = this.op_aleatoria()
    let rodada5e6 = this.aleatorio(1,2)
    let final = this.aleatorio(1,3)
    if(op == " + "){
      this.setState({resposta: op})
      if(this.state.rodada < 2){
        resultado = eval(`${n1}${op}${n2}`); 
        expressaotemp = n1 + " " + icon + " " + n2 + " = " + resultado
      }/////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 4){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        resultado = eval(`${n1}${op}${n2}${op2}${n3}`);
        [op,op2,op3] = this.verifica_sinal(op,op2,op3," + ")
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = n1 + op + n2 + op2 + n3 + " = " + resultado
        expressaotemp = this.formatar(expressaotemp)
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 5){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        if(rodada5e6 == 1){
          resultado = eval(`${n1}${op}(${n2}${op2}${n3})`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," + ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = n1 + op + "(" + n2 + op2 + n3 + ") = " + resultado
        }
        else{
          resultado = eval(`(${n1}${op}${n2})${op2}${n3}`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," + ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = "(" + n1 + op + n2 + ")" + op2 + n3 + " = " + resultado
        }
        expressaotemp = this.formatar(expressaotemp)
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 6){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        resultado = eval(`${n1}${op}${n2}${op2}${n3}`);
        [op,op2,op3] = this.verifica_sinal(op,op2,op3," + ")
        resultado = this.verifica_inteiro(resultado)
        resultado = this.expandir(resultado)
        expressaotemp = n1 + op + n2 + op2 + n3 + " = " + resultado
        expressaotemp = this.formatar(expressaotemp)
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 8){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        resultado = eval(`${n1}${op}${n2}${op2}${n3}${op3}${n4}`);
        [op,op2,op3] = this.verifica_sinal(op,op2,op3," + ")
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = n1 + op + n2 + op2 + n3 + op3 + n4 + " = " + resultado
        expressaotemp = this.formatar(expressaotemp)
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 9){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        if(final == 1){
          resultado = eval(`(${n1}${op}${n2})${op2}${n3}${op3}${n4}`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," + ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = "(" + n1 + op + n2 + ")" + op2 + n3 + op3 + n4 + " = " + resultado
        }
        if(final == 2){
          resultado = eval(`${n1}${op}${n2}${op2}(${n3}${op3}${n4})`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," + ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = n1 + op + n2 + op2 + "(" + n3 + op3 + n4 + ") = " + resultado
        }
        if(final == 3){
          resultado = eval(`${n1}${op}(${n2}${op2}${n3})${op3}${n4}`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," + ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = n1 + op + "(" + n2 + op2 + n3 +")" + op3 + n4 + " = " + resultado
        }
        expressaotemp = this.formatar(expressaotemp)
      }
      else if(this.state.rodada < 10){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        if(final == 1){
          resultado = eval(`(${n1}${op}${n2})${op2}${n3}${op3}${n4}`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," + ")
          resultado = this.verifica_inteiro(resultado)
          resultado = this.expandir(resultado)
          expressaotemp = "(" + n1 + op + n2 + ")" + op2 + n3 + op3 + n4 + " = " + resultado
        }
        if(final == 2){
          resultado = eval(`${n1}${op}${n2}${op2}(${n3}${op3}${n4})`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," + ")
          resultado = this.verifica_inteiro(resultado)
          resultado = this.expandir(resultado)
          expressaotemp = n1 + op + n2 + op2 + "(" + n3 + op3 + n4 + ") = " + resultado
        }
        if(final == 3){
          resultado = eval(`${n1}${op}(${n2}${op2}${n3})${op3}${n4}`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," + ")
          resultado = this.verifica_inteiro(resultado)
          resultado = this.expandir(resultado)
          expressaotemp = n1 + op + "(" + n2 + op2 + n3 +")" + op3 + n4 + " = " + resultado
        }
        expressaotemp = this.formatar(expressaotemp)
      }
    }


    if(op == " - "){
      this.setState({resposta: op})
      if(this.state.rodada < 2){
        resultado = eval(`${n1}${op}${n2}`);
        expressaotemp = n1 + " " + icon + " " + n2 + " = " + resultado
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 4){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        resultado = eval(`${n1}${op}${n2}${op2}${n3}`);
        [op,op2,op3] = this.verifica_sinal(op,op2,op3," - ")
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = n1 + op + n2 + op2 + n3 + " = " + resultado
        expressaotemp = this.formatar(expressaotemp)
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 5){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        if(rodada5e6 == 1){
          resultado = eval(`${n1}${op}(${n2}${op2}${n3})`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," - ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = n1 + op + "(" + n2 + op2 + n3 + ") = " + resultado
        }
        else{
          resultado = eval(`(${n1}${op}${n2})${op2}${n3}`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," - ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = "(" + n1 + op + n2 + ")" + op2 + n3 + " = " + resultado
        }
        expressaotemp = this.formatar(expressaotemp)
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 6){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        if(rodada5e6 == 1){
          resultado = eval(`${n1}${op}(${n2}${op2}${n3})`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," - ")
          resultado = this.verifica_inteiro(resultado)
          resultado = this.expandir(resultado)
          expressaotemp = n1 + op + "(" + n2 + op2 + n3 + ") = " + resultado
        }
        else{
          resultado = eval(`(${n1}${op}${n2})${op2}${n3}`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," - ")
          resultado = this.verifica_inteiro(resultado)
          resultado = this.expandir(resultado)
          expressaotemp = "(" + n1 + op + n2 + ")" + op2 + n3 + " = " + resultado
        }
        expressaotemp = this.formatar(expressaotemp)
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 8){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        resultado = eval(`${n1}${op}${n2}${op2}${n3}${op3}${n4}`);
        [op,op2,op3] = this.verifica_sinal(op,op2,op3," - ")
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = n1 + op + n2 + op2 + n3 + op3 + n4 + " = " + resultado
        expressaotemp = this.formatar(expressaotemp)
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 9){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        if(final == 1){
          resultado = eval(`(${n1}${op}${n2})${op2}${n3}${op3}${n4}`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," - ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = "(" + n1 + op + n2 + ")" + op2 + n3 + op3 + n4 + " = " + resultado
        }
        if(final == 2){
          resultado = eval(`${n1}${op}${n2}${op2}(${n3}${op3}${n4})`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," - ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = n1 + op + n2 + op2 + "(" + n3 + op3 + n4 + ") = " + resultado
        }
        if(final == 3){
          resultado = eval(`${n1}${op}(${n2}${op2}${n3})${op3}${n4}`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," - ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = n1 + op + "(" + n2 + op2 + n3 +")" + op3 + n4 + " = " + resultado
        }
        expressaotemp = this.formatar(expressaotemp)
      }
      else if(this.state.rodada < 10){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        if(final == 1){
          resultado = eval(`(${n1}${op}${n2})${op2}${n3}${op3}${n4}`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," - ")
          resultado = this.verifica_inteiro(resultado)
          resultado = this.expandir(resultado)
          expressaotemp = "(" + n1 + op + n2 + ")" + op2 + n3 + op3 + n4 + " = " + resultado
        }
        if(final == 2){
          resultado = eval(`${n1}${op}${n2}${op2}(${n3}${op3}${n4})`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," - ")
          resultado = this.verifica_inteiro(resultado)
          resultado = this.expandir(resultado)
          expressaotemp = n1 + op + n2 + op2 + "(" + n3 + op3 + n4 + ") = " + resultado
        }
        if(final == 3){
          resultado = eval(`${n1}${op}(${n2}${op2}${n3})${op3}${n4}`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," - ")
          resultado = this.verifica_inteiro(resultado)
          resultado = this.expandir(resultado)
          expressaotemp = n1 + op + "(" + n2 + op2 + n3 +")" + op3 + n4 + " = " + resultado
        }
        expressaotemp = this.formatar(expressaotemp)
      }
    }


    if(op == " * "){
      this.setState({resposta: op})
      if(this.state.rodada < 2){
        resultado = eval(`${n1}${op}${n2}`);
        expressaotemp = n1 + " " + icon + " " + n2 + " = " + resultado
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 4){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        resultado = eval(`${n1}${op}${n2}${op2}${n3}`);
        [op,op2,op3] = this.verifica_sinal(op,op2,op3," * ")
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = n1 + op + n2 + op2 + n3 + " = " + resultado
        expressaotemp = this.formatar(expressaotemp)
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 5){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        if(rodada5e6 == 1){
          resultado = eval(`${n1}${op}(${n2}${op2}${n3})`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," * ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = n1 + op + "(" + n2 + op2 + n3 + ") = " + resultado
        }
        else{
          resultado = eval(`(${n1}${op}${n2})${op2}${n3}`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," * ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = "(" + n1 + op + n2 + ")" + op2 + n3 + " = " + resultado
        }
        expressaotemp = this.formatar(expressaotemp)
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 6){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        if(rodada5e6 == 1){
          resultado = eval(`${n1}${op}(${n2}${op2}${n3})`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," * ")
          resultado = this.verifica_inteiro(resultado)
          resultado = this.expandir(resultado)
          expressaotemp = n1 + op + "(" + n2 + op2 + n3 + ") = " + resultado
        }
        else{
          resultado = eval(`(${n1}${op}${n2})${op2}${n3}`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," * ")
          resultado = this.verifica_inteiro(resultado)
          resultado = this.expandir(resultado)
          expressaotemp = "(" + n1 + op + n2 + ")" + op2 + n3 + " = " + resultado
        }
        expressaotemp = this.formatar(expressaotemp)
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 8){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        resultado = eval(`${n1}${op}${n2}${op2}${n3}${op3}${n4}`);
        [op,op2,op3] = this.verifica_sinal(op,op2,op3," * ")
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = n1 + op + n2 + op2 + n3 + op3 + n4 + " = " + resultado
        expressaotemp = this.formatar(expressaotemp)
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 9){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        if(final == 1){
          resultado = eval(`(${n1}${op}${n2})${op2}${n3}${op3}${n4}`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," * ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = "(" + n1 + op + n2 + ")" + op2 + n3 + op3 + n4 + " = " + resultado
        }
        if(final == 2){
          resultado = eval(`${n1}${op}${n2}${op2}(${n3}${op3}${n4})`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," * ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = n1 + op + n2 + op2 + "(" + n3 + op3 + n4 + ") = " + resultado
        }
        if(final == 3){
          resultado = eval(`${n1}${op}(${n2}${op2}${n3})${op3}${n4}`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," * ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = n1 + op + "(" + n2 + op2 + n3 +")" + op3 + n4 + " = " + resultado
        }
        expressaotemp = this.formatar(expressaotemp)
      }
      else if(this.state.rodada < 10){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        if(final == 1){
          resultado = eval(`(${n1}${op}${n2})${op2}${n3}${op3}${n4}`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," * ")
          resultado = this.verifica_inteiro(resultado)
          resultado = this.expandir(resultado)
          expressaotemp = "(" + n1 + op + n2 + ")" + op2 + n3 + op3 + n4 + " = " + resultado
        }
        if(final == 2){
          resultado = eval(`${n1}${op}${n2}${op2}(${n3}${op3}${n4})`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," * ")
          resultado = this.verifica_inteiro(resultado)
          resultado = this.expandir(resultado)
          expressaotemp = n1 + op + n2 + op2 + "(" + n3 + op3 + n4 + ") = " + resultado
        }
        if(final == 3){
          resultado = eval(`${n1}${op}(${n2}${op2}${n3})${op3}${n4}`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," * ")
          resultado = this.verifica_inteiro(resultado)
          resultado = this.expandir(resultado)
          expressaotemp = n1 + op + "(" + n2 + op2 + n3 +")" + op3 + n4 + " = " + resultado
        }
        expressaotemp = this.formatar(expressaotemp)
      }
    }


    if(op == " / "){
      this.setState({resposta: op})  
      if(this.state.rodada < 2){
        resultado = eval(`${n1}${op}${n2}`);
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = n1 + " " + icon + " " + n2 + " = " + resultado
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 4){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        resultado = eval(`${n1}${op}${n2}${op2}${n3}`);
        [op,op2,op3] = this.verifica_sinal(op,op2,op3," / ")
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = n1 + op + n2 + op2 + n3 + " = " + resultado
        expressaotemp = this.formatar(expressaotemp)
      }//////////////////////////////////////////////////////////////////////////////////////////////
       else if(this.state.rodada < 5){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        if(rodada5e6 == 1){
          resultado = eval(`${n1}${op}(${n2}${op2}${n3})`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," / ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = n1 + op + "(" + n2 + op2 + n3 + ") = " + resultado
        }
        else{
          resultado = eval(`(${n1}${op}${n2})${op2}${n3}`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," / ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = "(" + n1 + op + n2 + ")" + op2 + n3 + " = " + resultado
        }
        expressaotemp = this.formatar(expressaotemp)
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 6){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        if(rodada5e6 == 1){
          resultado = eval(`${n1}${op}(${n2}${op2}${n3})`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," / ")
          resultado = this.verifica_inteiro(resultado)
          resultado = this.expandir(resultado)
          expressaotemp = n1 + op + "(" + n2 + op2 + n3 + ") = " + resultado
        }
        else{
          resultado = eval(`(${n1}${op}${n2})${op2}${n3}`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," / ")
          resultado = this.verifica_inteiro(resultado)
          resultado = this.expandir(resultado)
          expressaotemp = "(" + n1 + op + n2 + ")" + op2 + n3 + " = " + resultado
        }
        expressaotemp = this.formatar(expressaotemp)
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 8){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        resultado = eval(`${n1}${op}${n2}${op2}${n3}${op3}${n4}`);
        [op,op2,op3] = this.verifica_sinal(op,op2,op3," / ")
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = n1 + op + n2 + op2 + n3 + op3 + n4 + " = " + resultado
        expressaotemp = this.formatar(expressaotemp)
      }//////////////////////////////////////////////////////////////////////////////////////////////
       else if(this.state.rodada < 9){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        if(final == 1){
          resultado = eval(`(${n1}${op}${n2})${op2}${n3}${op3}${n4}`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," / ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = "(" + n1 + op + n2 + ")" + op2 + n3 + op3 + n4 + " = " + resultado
        }
        if(final == 2){
          resultado = eval(`${n1}${op}${n2}${op2}(${n3}${op3}${n4})`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," / ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = n1 + op + n2 + op2 + "(" + n3 + op3 + n4 + ") = " + resultado
        }
        if(final == 3){
          resultado = eval(`${n1}${op}(${n2}${op2}${n3})${op3}${n4}`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," / ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = n1 + op + "(" + n2 + op2 + n3 +")" + op3 + n4 + " = " + resultado
        }
        expressaotemp = this.formatar(expressaotemp)
      }
      else if(this.state.rodada < 10){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        if(final == 1){
          resultado = eval(`(${n1}${op}${n2})${op2}${n3}${op3}${n4}`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," / ")
          resultado = this.verifica_inteiro(resultado)
          resultado = this.expandir(resultado)
          expressaotemp = "(" + n1 + op + n2 + ")" + op2 + n3 + op3 + n4 + " = " + resultado
        }
        if(final == 2){
          resultado = eval(`${n1}${op}${n2}${op2}(${n3}${op3}${n4})`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," / ")
          resultado = this.verifica_inteiro(resultado)
          resultado = this.expandir(resultado)
          expressaotemp = n1 + op + n2 + op2 + "(" + n3 + op3 + n4 + ") = " + resultado
        }
        if(final == 3){
          resultado = eval(`${n1}${op}(${n2}${op2}${n3})${op3}${n4}`);
          [op,op2,op3] = this.verifica_sinal(op,op2,op3," / ")
          resultado = this.verifica_inteiro(resultado)
          resultado = this.expandir(resultado)
          expressaotemp = n1 + op + "(" + n2 + op2 + n3 +")" + op3 + n4 + " = " + resultado
        }
        expressaotemp = this.formatar(expressaotemp)
      }
    }
    this.setState({expressao: expressaotemp})
  }

 //////////////////////////////////////////////

  validar(){ // POR ALGUM MOTIVO A FUNCAO criar_expressao() DA ERRO NO CELULAR AS VEZES, ENTAO PRECISEI CRIAR UMA OUTRA FUNCAO COM EXCEPTION 
    let ok = false;

    if(this.state.rodada == 0){
      while (!ok){
        try{
          this.criar_expressao();
          ok = true; 
          this.setState(prevState => ({ rodada: prevState.rodada + 1 }));
        } 
        catch(erro){
          console.log("Erro na primeira rodada: ", erro);
        }
      }
    }

    else if(this.state.rodada < 10){
      this.pontuar()
      while (!ok){
        try{
          this.criar_expressao();
          ok = true; 
          this.setState(prevState => ({ rodada: prevState.rodada + 1, chute: ''}));
        } 
        catch(erro){
          console.log("Erro expressao:", erro);
        }
      }
    }

    else if(this.state.rodada == 10 && !this.state.acabou){
      this.pontuar()
      this.setState({acabou: true,chute: ''})
    }
  }
  /////////////////////////////////////////////////
 escolhersinal = (sinal) => {
    if (this.state.chute === sinal) {
      this.setState({ chute: '' });
    } else {
      this.setState({ chute: sinal });
    }
  }

  ////////////////////////////////////////////////
  pontuar(){
    if(this.state.chute == this.state.resposta){
      this.setState(prevState => ({ acertos: prevState.acertos + 1 }));
    }
    else{
      this.setState(prevState => ({ erros: prevState.erros + 1 }));
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
            style={[estilos.botaosinal,this.state.chute === " + " && estilos.botaoselecionado]} 
            onPress={() => this.escolhersinal(" + ")} activeOpacity={0.6}>
              <Text style={[estilos.textobotao,this.state.chute === " + " && estilos.textoselecionado]}>+</Text>
            </TouchableOpacity>
             <TouchableOpacity 
            style={[estilos.botaosinal,this.state.chute === " - " && estilos.botaoselecionado]} 
            onPress={() => this.escolhersinal(" - ")} activeOpacity={0.6}>
              <Text style={[estilos.textobotao,this.state.chute === " - " && estilos.textoselecionado]}>-</Text>
            </TouchableOpacity>
          </View>
          <View style={estilos.sinais2}>
             <TouchableOpacity 
            style={[estilos.botaosinal,this.state.chute === " * " && estilos.botaoselecionado]} 
            onPress={() => this.escolhersinal(" * ")} activeOpacity={0.6}>
              <Text style={[estilos.textobotao,this.state.chute === " * " && estilos.textoselecionado]}>×</Text>
            </TouchableOpacity>
             <TouchableOpacity 
            style={[estilos.botaosinal,this.state.chute === " / " && estilos.botaoselecionado]} 
            onPress={() => this.escolhersinal(" / ")} activeOpacity={0.6}>
              <Text style={[estilos.textobotao,this.state.chute === " / " && estilos.textoselecionado]}>÷</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={estilos.botao} onPress={() => this.validar()} activeOpacity={0.6}>
              <Text style={estilos.textobotao2}>Confirmar</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
            style={estilos.setaBack} 
            onPress={() => this.props.navigation.navigate('Jogo1')} activeOpacity={0.6}>
            <Text style={{ fontSize: 46, color: "#014a7d" }}>←</Text>
        </TouchableOpacity>
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
    backgroundColor: "white", // cor de destaque, ex: amarelo
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
  }
 
})    