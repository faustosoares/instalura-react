import React, { Component } from 'react';
import {browserHistory} from  'react-router';

export default class Logout extends Component {

    componentWillMount(){
        
        //Removendo token de autenticacao do navegador
        localStorage.removeItem('auth-token');
        
        //Redirecionando para página de login
        browserHistory.push('/');
    }

    render(){
        return null;
    }
}