import React from 'react';
import { Text,View,Button,TextInput,StyleSheet, TouchableOpacity,TouchableHighlight,Image } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';

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
      }
  }

  componentDidMount(){
    this.validar()
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
    let rodadatemp = this.state.rodada
    const icon = "■"
    let n1 = this.aleatorio(1,100)
    let n2 = this.aleatorio(1,100)
    let n3 = this.aleatorio(1,100)
    let n4 = this.aleatorio(1,75)
    let op2 = this.op_aleatoria()
    let op3 = this.op_aleatoria()
    let rodada5e6 = this.aleatorio(1,2)
    let final = this.aleatorio(1,2,3)
    if(op == " + "){
      this.setState({resposta: op})
      if(this.state.rodada < 2){
        resultado = eval(`${n1}${op}${n2}`); 
        expressaotemp = n1 + " " + icon + " " + n2 + " = " + resultado
        this.setState({expressao: expressaotemp})
      }/////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 4){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        resultado = eval(`${n1}${op}${n2}${op2}${n3}`);
        [op,op2,op3] = this.verifica_sinal(op,op2,op3," + ")
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = n1 + op + n2 + op2 + n3 + " = " + resultado
        expressaotemp = this.formatar(expressaotemp)
        this.setState({expressao: expressaotemp})
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
        this.setState({expressao: expressaotemp})
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 6){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        resultado = eval(`${n1}${op}${n2}${op2}${n3}`);
        [op,op2,op3] = this.verifica_sinal(op,op2,op3," + ")
        resultado = this.verifica_inteiro(resultado)
        resultado = this.expandir(resultado)
        expressaotemp = n1 + op + n2 + op2 + n3 + " = " + resultado
        expressaotemp = this.formatar(expressaotemp)
        this.setState({expressao: expressaotemp})
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 8){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        resultado = eval(`${n1}${op}${n2}${op2}${n3}${op3}${n4}`);
        [op,op2,op3] = this.verifica_sinal(op,op2,op3," + ")
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = n1 + op + n2 + op2 + n3 + op3 + n4 + " = " + resultado
        expressaotemp = this.formatar(expressaotemp)
        this.setState({expressao: expressaotemp})
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
        this.setState({expressao: expressaotemp})
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
        this.setState({expressao: expressaotemp})
      }
    }


    if(op == " - "){
      this.setState({resposta: op})
      if(this.state.rodada < 2){
        resultado = eval(`${n1}${op}${n2}`);
        expressaotemp = n1 + " " + icon + " " + n2 + " = " + resultado
        this.setState({expressao: expressaotemp})
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 4){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        resultado = eval(`${n1}${op}${n2}${op2}${n3}`);
        [op,op2,op3] = this.verifica_sinal(op,op2,op3," - ")
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = n1 + op + n2 + op2 + n3 + " = " + resultado
        expressaotemp = this.formatar(expressaotemp)
        this.setState({expressao: expressaotemp})
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
        this.setState({expressao: expressaotemp})
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
        this.setState({expressao: expressaotemp})
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 8){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        resultado = eval(`${n1}${op}${n2}${op2}${n3}${op3}${n4}`);
        [op,op2,op3] = this.verifica_sinal(op,op2,op3," - ")
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = n1 + op + n2 + op2 + n3 + op3 + n4 + " = " + resultado
        expressaotemp = this.formatar(expressaotemp)
        this.setState({expressao: expressaotemp})
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
        this.setState({expressao: expressaotemp})
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
        this.setState({expressao: expressaotemp})
      }
    }


    if(op == " * "){
      this.setState({resposta: op})
      if(this.state.rodada < 2){
        resultado = eval(`${n1}${op}${n2}`);
        expressaotemp = n1 + " " + icon + " " + n2 + " = " + resultado
        this.setState({expressao: expressaotemp})
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 4){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        resultado = eval(`${n1}${op}${n2}${op2}${n3}`);
        [op,op2,op3] = this.verifica_sinal(op,op2,op3," * ")
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = n1 + op + n2 + op2 + n3 + " = " + resultado
        expressaotemp = this.formatar(expressaotemp)
        this.setState({expressao: expressaotemp})
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
        this.setState({expressao: expressaotemp})
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
        this.setState({expressao: expressaotemp})
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 8){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        resultado = eval(`${n1}${op}${n2}${op2}${n3}${op3}${n4}`);
        [op,op2,op3] = this.verifica_sinal(op,op2,op3," * ")
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = n1 + op + n2 + op2 + n3 + op3 + n4 + " = " + resultado
        expressaotemp = this.formatar(expressaotemp)
        this.setState({expressao: expressaotemp})
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
        this.setState({expressao: expressaotemp})
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
        this.setState({expressao: expressaotemp})
      }
    }


    if(op == " / "){
      this.setState({resposta: op})  
      if(this.state.rodada < 2){
        resultado = eval(`${n1}${op}${n2}`);
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = n1 + " " + icon + " " + n2 + " = " + resultado
        this.setState({expressao: expressaotemp})
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 4){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        resultado = eval(`${n1}${op}${n2}${op2}${n3}`);
        [op,op2,op3] = this.verifica_sinal(op,op2,op3," / ")
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = n1 + op + n2 + op2 + n3 + " = " + resultado
        expressaotemp = this.formatar(expressaotemp)
        this.setState({expressao: expressaotemp})
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
        this.setState({expressao: expressaotemp})
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
        this.setState({expressao: expressaotemp})
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada < 8){
        [op,op2,op3] = this.troca_ordem(op,op2,op3)
        resultado = eval(`${n1}${op}${n2}${op2}${n3}${op3}${n4}`);
        [op,op2,op3] = this.verifica_sinal(op,op2,op3," / ")
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = n1 + op + n2 + op2 + n3 + op3 + n4 + " = " + resultado
        expressaotemp = this.formatar(expressaotemp)
        this.setState({expressao: expressaotemp})
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
        this.setState({expressao: expressaotemp})
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
        this.setState({expressao: expressaotemp})
      }
    }
  }

  validar = () => { // POR ALGUM MOTIVO A FUNCAO criar_expressao() DA ERRO NO CELULAR AS VEZES, ENTAO PRECISEI CRIAR UMA OUTRA FUNCAO COM EXCEPTION 
    let ok = false;
    if(this.state.rodada < 10){
      while (!ok) {
        try{
          this.criar_expressao();
          ok = true; 
          this.setState(prevState => ({ rodada: prevState.rodada + 1 }));
        } 
        catch(erro){
          console.log("Erro expressao:", erro);
        }
      }
    }
  }
    render() {
    return (
      <View style={estilos.tudo}>
        <Text style={estilos.rodada}>Rodada {this.state.rodada}</Text>   
        <View style={estilos.box}>
          <Text style={estilos.expressao}>{this.state.expressao}</Text> 
        </View>
         <TouchableOpacity style={estilos.botao} onPress={() => this.validar()}>
            <Text>Proximo</Text>
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
    marginTop: 15
  },
  botao:{
    borderRadius: 3,
    width: "20%",
    height: 30,
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: "#b3dde6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5, 
    elevation: 5,
    marginBottom: 60,
    marginTop: 20,
  },
  box:{
    backgroundColor: "white",
    height: 200,
    width: "90%",
    alignSelf: "center",
    top: "15%",
    borderRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5, 
    elevation: 5,
    justifyContent:"center",
    alignItems: "center",
  },
  expressao:{
    fontSize: 20,
    fontWeight: "bold",

  }
})

        // <Text>Rodada {this.state.rodada}</Text>
        // <TouchableOpacity style={estilos.botao} onPress={() => this.criar_expressao()}>
        //     <Text>Proximo</Text>
        // </TouchableOpacity>
        // <Text>{this.state.expressao}</Text> 
        // <Text> resultado: {this.state.resposta} </Text>      