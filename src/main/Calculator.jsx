import React, { Component } from "react";

import './Calculator.css';
import Button from "../component/Button";
import Display from '../component/display'

//implementado a logica  https://www.udemy.com/course/curso-web/learn/lecture/10591758#overview 
// Criei um objeto com configurações iniciais da calculadora
const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation:null,
    values: [0,0],
    current:0
}

export default class Calculator extends Component {
    // criei um clone do initialState
    state = { ...initialState }


    constructor(props) {
        super(props)

        //Aqui estou usando o bind para amarrar as funções para onde o (this) tem que realmente apontar
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory(){
        //Aqui preciso deixar o initialState dentro  das chaves para que de certo
       this.setState( {...initialState} )
    }

    setOperation(operation) {
        //implememtação do codigo setOperation : https://www.udemy.com/course/curso-web/learn/lecture/10591760#overview 
        //Aqui vou ver se estou trablahndo com indice de valor 0 do array caso a setoperation seja invocado preciso mudar para indice "1" 
        if (this.state.current === 0) {
            //se a expressao do if for verdadeira então vou mudar o this.state.current para "1" ou seja vou mudar o indice para "1"
            this.setState({operation,current:1,clearDisplay:true})
        }else {
            //Aqui casso esteja mechendo no indice "1" preciso agora processar a operação
            //se o equals for true 
            const equals = operation === '='
            //se o usuario caiu aqui siguinifica que ja temos um operação setada então preciso dessa variavel abaixo para resolver a operação
            const currentOperation = this.state.operation

            //Agora vou criar um clone do array values
            const values = [ ...this.state.values]

            try{ //O eval pode gerar algum efeito então colocamos dentro do try

                //Agora vou fazer o claculo do valor em cima da função eval() porem poderia implementar com o swit case ou estrutura if aninhada mas para não ficar muito grande o codigo vou usar o eval() porem vai me jerar um advertencia ` e dentro do eval temos uma template string com back cheap as crases `${}` o currentOperation vai conter o valor do sinla digitado pelo usuario se vai ser + - * / e o eval() vai interpretar tudo isso como uma operação 
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
                //Então o resultado vai ser armazenado no indice "0"  e o indice"1" será zerado.
            } catch(e){
                values[0] = this.state.values[0]
            }
            
            values[1] = 0

            //Então iserimos os valores no estado
            this.setState({
                displayValue:values[0],
                operation:equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }

    }

    addDigit(n) {
       //Aqui estou criando está função para que o  ponto não possa ser digitado 2 vezês! E somente uma validação! A logica se o usuario digitou um  ponto e já está incluido um ponto no corpo da função. por isso que usei o include('.') ele teste o valor!! iguinore e de continuidade perseba que não estamos retornando nada!


       //A explicação para está logica está neste video : //implementado a logica  https://www.udemy.com/course/curso-web/learn/lecture/10591758#overview  
       if (n === '.' && this.state.displayValue.includes('.')) {
            return 
       }

       //Aqui so vou limpar o display quando existir apenas o "0" ou quando a variavel clearDisplay estiver "true" a ogica aqui ´e para tornar o valor boleano onde será verdadeiro nessas duas situações
       const clearDisplay = this.state.displayValue === '0'|| this.state.clearDisplay

       //Se o clearDisplay for true o valor será vazio senao for limpo vamos pegar o valor por issoque estamos usando o operador ternario
        const currentValue = clearDisplay ? '' : this.state.displayValue

        //Aqui vamos colocar no display o proximo valor a ser colocado no display
        const displayValue = currentValue + n

        //Aqui chamo o setState e aplico os atributos para exibir o valor no dilplay !note que estou coocando o clearDisplay para falso pois assim que for digitado um valor ela será falsa
        this.setState({displayValue, clearDisplay:false})


        //Abaixo estou verificando se  o que foi digitado e diferente de um ponto isso siguinifica que é um numero
        if (n !== '.') {
            //Agora vou armazenar dentro do array qual o indice que estou trablhando pois no  meu initialState tenho um atributo  chamado "current"
            const i = this.state.current 

            //Aqui estou convertendo o valor do displaypara um valor real que posui casas  decimais onde seria um float
            const newValue = parseFloat(displayValue)

            //Agora vou duplicar o meu array values com  o operador "..." spread
            const values= [...this.state.values]
            values[i] =newValue
            //Agora vou adicionar este array no estado do meu objeto
            this.setState({values})
        }
    }

    render(){
        // const addDigit = n => this.addDigit(n)
        // const serOperation = op => this.setOperation(op)
    
        return (
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label="A/C" click={() => this.clearMemory()} triple/>
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.setOperation} operation/>
            </div> 
        )
    }
}