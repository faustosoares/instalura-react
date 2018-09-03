import React, { Component } from 'react';
import FotoItem from './FotoItem';

export default class Timeline extends Component {

    constructor(){
        super();
        this.state = {fotos:[]};
    }

    //Utilizando Fetch Api para consumir a API.
    //Será trazido como resposta (response) o json com as características que utilizaremos no FrontEnd.
    //Atribuiremos também as fotos trazidas a variável fotos inicializada no construtor.
    componentDidMount(){
        fetch('http://localhost:8080/api/public/fotos/alots')
            .then(response => response.json())
            .then(fotos => {
                this.setState({fotos:fotos});
            });
    }

    render(){
        return (
        <div className="fotos container">
            
            {/* Listando as fotos trazidas da API em FotoItem na tela, passando para o componente
            a foto que está em cada item do array fotos*/}
            {
                this.state.fotos.map(foto => <FotoItem foto={foto}/>)
            }
        </div>            
        );
    }
}