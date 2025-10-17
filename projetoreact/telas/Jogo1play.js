import React from 'react';
import { Text,View,Button,TextInput,StyleSheet, TouchableOpacity,TouchableHighlight,Image } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';

export default class Jogo1play extends React.Component {
    constructor(props){
      super(props)
      this.state={
        expressao:'',
        rodada: 1,
        acertos: 0,
        erros: 0,
        chute: '',
        resposta: '',
      }
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

  troca_ordem(op,op2){
    if(Math.random() < 0.5){
      let temp = op
      op = op2
      op2 = temp
    }
    return [op,op2]
  }

   verifica_sinal(op,op2,sinal){
    if(op == sinal) return ["■",op2]
    return [op,"■"]
  }

  verifica_inteiro(x){
    if (!Number.isInteger(x)){
      return x.toFixed(2)
    }
    return x
  }

  formatar(x){
     x = x.replaceAll(" * ","×")
     x = x.replaceAll(" / ","÷")
      return x
  }

  expandir(resultado){
    let op = this.aleatorio(1,4) // 10 --- 6 -----  6 * n3 = 10 ---> n3 = 10/6
    let n3
    let n = this.aleatorio(1,50)
    if(op == 1){
      n3 = resultado - n
      n3 = this.verifica_inteiro(n3)
      return n3 + " + " + n
    }
    if(op == 2){
      n3 = resultado + n
      n3 = this.verifica_inteiro(n3)
      return n3 + " - " + n
    }
    if(op == 3){
      n3 = resultado / n
      n3 = this.verifica_inteiro(n3)
      return n + "×" + n3
    }
    if(op == 4){
      n3 = resultado * n
      n3 = this.verifica_inteiro(n3)
      return n3 + "÷" + n
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
    let op2 = this.op_aleatoria()
    let rodada5e6 = this.aleatorio(1,2)

    if(op == " + "){
      this.setState({resposta: op})
      if(this.state.rodada <= 2){
        resultado = eval(`${n1}${op}${n2}`); 
        expressaotemp = n1 + " " + icon + " " + n2 + " = " + resultado
        this.setState({expressao: expressaotemp, rodada: rodadatemp + 1})
      }/////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada <= 4){
        [op,op2] = this.troca_ordem(op,op2)
        resultado = eval(`${n1}${op}${n2}${op2}${n3}`);
        [op,op2] = this.verifica_sinal(op,op2," + ")
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = n1 + " " + op + " " + n2 + " " + op2 + " " + n3 + " = " + resultado
        expressaotemp = this.formatar(expressaotemp)
        this.setState({expressao: expressaotemp, rodada: rodadatemp + 1})
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada == 5){
        [op,op2] = this.troca_ordem(op,op2)
        if(rodada5e6 == 1){
          resultado = eval(`${n1}${op}(${n2}${op2}${n3})`);
          [op,op2] = this.verifica_sinal(op,op2," + ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = n1 + " " + op + " (" + n2 + " " + op2 + " " + n3 + ") = " + resultado
        }
        else{
          resultado = eval(`(${n1}${op}${n2})${op2}${n3}`);
          [op,op2] = this.verifica_sinal(op,op2," + ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = "(" + n1 + " " + op + " " + n2 + ") " + op2 + " " + n3 + " = " + resultado
        }
        expressaotemp = this.formatar(expressaotemp)
        this.setState({expressao: expressaotemp, rodada: rodadatemp + 1})
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada == 6){
        [op,op2] = this.troca_ordem(op,op2)
        if(rodada5e6 == 1){
          resultado = eval(`${n1}${op}(${n2}${op2}${n3})`);
          [op,op2] = this.verifica_sinal(op,op2," + ")
          resultado = this.verifica_inteiro(resultado)
          resultado = this.expandir(resultado)
          expressaotemp = n1 + " " + op + " (" + n2 + " " + op2 + " " + n3 + ") = " + resultado
        }
        else{
          resultado = eval(`(${n1}${op}${n2})${op2}${n3}`);
          [op,op2] = this.verifica_sinal(op,op2," + ")
          resultado = this.verifica_inteiro(resultado)
          resultado = this.expandir(resultado)
          expressaotemp = "(" + n1 + " " + op + " " + n2 + ") " + op2 + " " + n3 + " = " + resultado
        }
        expressaotemp = this.formatar(expressaotemp)
        this.setState({expressao: expressaotemp, rodada: rodadatemp + 1})
      }//////////////////////////////////////////////////////////////////////////////////////////////
    }


    if(op == " - "){
      this.setState({resposta: op})
      if(this.state.rodada <= 2){
        resultado = eval(`${n1}${op}${n2}`);
        expressaotemp = n1 + " " + icon + " " + n2 + " = " + resultado
        this.setState({expressao: expressaotemp, rodada:rodadatemp + 1})
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada <= 4){
        [op,op2] = this.troca_ordem(op,op2)
        resultado = eval(`${n1}${op}${n2}${op2}${n3}`);
        [op,op2] = this.verifica_sinal(op,op2," - ")
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = n1 + " " + op + " " + n2 + " " + op2 + " " + n3 + " = " + resultado
        expressaotemp = this.formatar(expressaotemp)
        this.setState({expressao: expressaotemp, rodada: rodadatemp + 1})
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada == 5){
        [op,op2] = this.troca_ordem(op,op2)
        if(rodada5e6 == 1){
          resultado = eval(`${n1}${op}(${n2}${op2}${n3})`);
          [op,op2] = this.verifica_sinal(op,op2," - ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = n1 + " " + op + " (" + n2 + " " + op2 + " " + n3 + ") = " + resultado
        }
        else{
          resultado = eval(`(${n1}${op}${n2})${op2}${n3}`);
          [op,op2] = this.verifica_sinal(op,op2," - ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = "(" + n1 + " " + op + " " + n2 + ") " + op2 + " " + n3 + " = " + resultado
        }
        expressaotemp = this.formatar(expressaotemp)
        this.setState({expressao: expressaotemp, rodada: rodadatemp + 1})
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada == 6){
        [op,op2] = this.troca_ordem(op,op2)
        if(rodada5e6 == 1){
          resultado = eval(`${n1}${op}(${n2}${op2}${n3})`);
          [op,op2] = this.verifica_sinal(op,op2," - ")
          resultado = this.verifica_inteiro(resultado)
          resultado = this.expandir(resultado)
          expressaotemp = n1 + " " + op + " (" + n2 + " " + op2 + " " + n3 + ") = " + resultado
        }
        else{
          resultado = eval(`(${n1}${op}${n2})${op2}${n3}`);
          [op,op2] = this.verifica_sinal(op,op2," - ")
          resultado = this.verifica_inteiro(resultado)
          resultado = this.expandir(resultado)
          expressaotemp = "(" + n1 + " " + op + " " + n2 + ") " + op2 + " " + n3 + " = " + resultado
        }
        expressaotemp = this.formatar(expressaotemp)
        this.setState({expressao: expressaotemp, rodada: rodadatemp + 1})
      }//////////////////////////////////////////////////////////////////////////////////////////////
    }


    if(op == " * "){
      this.setState({resposta: op})
      if(this.state.rodada <= 2){
        resultado = eval(`${n1}${op}${n2}`);
        expressaotemp = n1 + " " + icon + " " + n2 + " = " + resultado
        this.setState({expressao: expressaotemp, rodada:rodadatemp + 1})
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada <= 4){
        [op,op2] = this.troca_ordem(op,op2)
        resultado = eval(`${n1}${op}${n2}${op2}${n3}`);
        [op,op2] = this.verifica_sinal(op,op2," * ")
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = n1 + " " + op + " " + n2 + " " + op2 + " " + n3 + " = " + resultado
        expressaotemp = this.formatar(expressaotemp)
        this.setState({expressao: expressaotemp, rodada: rodadatemp + 1})
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada == 5){
        [op,op2] = this.troca_ordem(op,op2)
        if(rodada5e6 == 1){
          resultado = eval(`${n1}${op}(${n2}${op2}${n3})`);
          [op,op2] = this.verifica_sinal(op,op2," * ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = n1 + " " + op + " (" + n2 + " " + op2 + " " + n3 + ") = " + resultado
        }
        else{
          resultado = eval(`(${n1}${op}${n2})${op2}${n3}`);
          [op,op2] = this.verifica_sinal(op,op2," * ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = "(" + n1 + " " + op + " " + n2 + ") " + op2 + " " + n3 + " = " + resultado
        }
        expressaotemp = this.formatar(expressaotemp)
        this.setState({expressao: expressaotemp, rodada: rodadatemp + 1})
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada == 6){
        [op,op2] = this.troca_ordem(op,op2)
        if(rodada5e6 == 1){
          resultado = eval(`${n1}${op}(${n2}${op2}${n3})`);
          [op,op2] = this.verifica_sinal(op,op2," * ")
          resultado = this.verifica_inteiro(resultado)
          resultado = this.expandir(resultado)
          expressaotemp = n1 + " " + op + " (" + n2 + " " + op2 + " " + n3 + ") = " + resultado
        }
        else{
          resultado = eval(`(${n1}${op}${n2})${op2}${n3}`);
          [op,op2] = this.verifica_sinal(op,op2," * ")
          resultado = this.verifica_inteiro(resultado)
          resultado = this.expandir(resultado)
          expressaotemp = "(" + n1 + " " + op + " " + n2 + ") " + op2 + " " + n3 + " = " + resultado
        }
        expressaotemp = this.formatar(expressaotemp)
        this.setState({expressao: expressaotemp, rodada: rodadatemp + 1})
      }//////////////////////////////////////////////////////////////////////////////////////////////
    }


    if(op == " / "){
      this.setState({resposta: op})  
      if(this.state.rodada <= 2){
        resultado = eval(`${n1}${op}${n2}`);
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = n1 + " " + icon + " " + n2 + " = " + resultado
        this.setState({expressao: expressaotemp, rodada: rodadatemp + 1})
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada <= 4){
        [op,op2] = this.troca_ordem(op,op2)
        resultado = eval(`${n1}${op}${n2}${op2}${n3}`);
        [op,op2] = this.verifica_sinal(op,op2," / ")
        resultado = this.verifica_inteiro(resultado)
        expressaotemp = n1 + " " + op + " " + n2 + " " + op2 + " " + n3 + " = " + resultado
        expressaotemp = this.formatar(expressaotemp)
        this.setState({expressao: expressaotemp, rodada: rodadatemp + 1})
      }//////////////////////////////////////////////////////////////////////////////////////////////
       else if(this.state.rodada == 5){
        [op,op2] = this.troca_ordem(op,op2)
        if(rodada5e6 == 1){
          resultado = eval(`${n1}${op}(${n2}${op2}${n3})`);
          [op,op2] = this.verifica_sinal(op,op2," / ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = n1 + " " + op + " (" + n2 + " " + op2 + " " + n3 + ") = " + resultado
        }
        else{
          resultado = eval(`(${n1}${op}${n2})${op2}${n3}`);
          [op,op2] = this.verifica_sinal(op,op2," / ")
          resultado = this.verifica_inteiro(resultado)
          expressaotemp = "(" + n1 + " " + op + " " + n2 + ") " + op2 + " " + n3 + " = " + resultado
        }
        expressaotemp = this.formatar(expressaotemp)
        this.setState({expressao: expressaotemp, rodada: rodadatemp + 1})
      }//////////////////////////////////////////////////////////////////////////////////////////////
      else if(this.state.rodada == 6){
        [op,op2] = this.troca_ordem(op,op2)
        if(rodada5e6 == 1){
          resultado = eval(`${n1}${op}(${n2}${op2}${n3})`);
          [op,op2] = this.verifica_sinal(op,op2," / ")
          resultado = this.verifica_inteiro(resultado)
          resultado = this.expandir(resultado)
          expressaotemp = n1 + " " + op + " (" + n2 + " " + op2 + " " + n3 + ") = " + resultado
        }
        else{
          resultado = eval(`(${n1}${op}${n2})${op2}${n3}`);
          [op,op2] = this.verifica_sinal(op,op2," / ")
          resultado = this.verifica_inteiro(resultado)
          resultado = this.expandir(resultado)
          expressaotemp = "(" + n1 + " " + op + " " + n2 + ") " + op2 + " " + n3 + " = " + resultado
        }
        expressaotemp = this.formatar(expressaotemp)
        this.setState({expressao: expressaotemp, rodada: rodadatemp + 1})
      }//////////////////////////////////////////////////////////////////////////////////////////////
    }
  }






    render() {
    return (
      <View>
        <Text>Rodada {this.state.rodada}</Text>
        <TouchableOpacity style={estilos.botao} onPress={() => this.criar_expressao()}>
            <Text>Proximo</Text>
        </TouchableOpacity>
        <Text>{this.state.expressao}</Text> 
        <Text> resultado: {this.state.resposta} </Text>      
      </View>
    );
  }
}


const estilos = StyleSheet.create({
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
})