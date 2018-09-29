import React, { Component } from 'react';
import {browserHistory} from  'react-router';

export default class Login extends Component {

    constructor(props){
        super(props);
        
        //atribuindo a variavel msg o texto que virá como retorno de erro
        this.state = {msg:this.props.location.query.msg};  
    }

    envia(event){
        
        //Parando o fluxo para executar a lógica do metodo envia
        event.preventDefault();

        //Configuração para utilizar POST com a fetchAPI (O metodo fetch por padrão utiliza GET).
        //body: corpo da requisicao (valores dos campos login e senha)
        //headers: precisa de um obj Headers com parametros de configuracao de cabecalho http
        const requestInfo = {
            method:'POST',
            body:JSON.stringify({login:this.login.value,senha:this.senha.value}),
            headers:new Headers({
                'Content-type' : 'application/json' 
            })
        };

        //Realizando a requisição para verificação de login.
        //A rota abaixo,pertencente a API feita em java (Spring), contém a lógica de login de aplicacao.
        fetch('http://localhost:8080/api/public/login',requestInfo)
           //Utilizando a resposta para validar o passe
            .then(response => {
                if(response.ok){
                    //Se login bem sucedido retorne o text do response (stream que retorna uma promise resolves com USVString)
                    return response.text();
                } else {
                    //Se for mal sucedido retorne um erro para msg (capturado com catch, ao final)
                    throw new Error('não foi possível fazer login');
                }
            })
            .then(token => {
                //Armazena o token (criptografado) obtido do login no navegador
                localStorage.setItem('auth-token',token);
                //Encaminha finalmente para timeline
                browserHistory.push('/timeline');
            })
            .catch(error => {
                //Captura o erro gerado e escreve em msg
                this.setState({msg:error.message});
            });
    }

    render(){
        return(
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.msg}</span>
                <form onSubmit={this.envia.bind(this)}>
                    <input type="text" ref={(input) => this.login = input}/> {/*Utilizando ref para evitar metodo onchange para renderizar a todo momento o input */}
                    <input type="password" ref={(input) => this.senha = input}/>
                    <input type="submit" value="login"/>
                </form>
            </div> 
        );
    }
}