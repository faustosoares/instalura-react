import React, { Component } from 'react';
import FotoItem from './FotoItem';

export default class Timeline extends Component {

    constructor(props){
        super(props);
        this.state = {fotos:[]};
        this.login = this.props.login;
    }

    //Utilizando Fetch Api para consumir a API.
    //Será trazido como resposta (response) o json com as características que utilizaremos no FrontEnd.
    //Atribuiremos também as fotos trazidas a variável fotos inicializada no construtor.
    //Utilizando o token gerado no login para trazer os dados específicos do usuário LOGADO (auth-token)
    //Ou trazer também a timeline publica de qualquer usuario (com clique em seu nome ou direto por url)
    carregaFotos(){
        let urlPerfil;

        if(this.login === undefined){
            urlPerfil = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        } else {
            urlPerfil = `http://localhost:8080/api/public/fotos/${this.login}`;
        }

        fetch(urlPerfil)
        .then(response => response.json())
        .then(fotos => {         
          this.setState({fotos:fotos});
        });      
        
    }

    componentDidMount(){
        this.carregaFotos();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.login !== undefined){
            this.login = nextProps.login;
            this.carregaFotos();
        }
    }

    render(){
        return (
        <div className="fotos container">
            
            {/* Listando as fotos trazidas da API em FotoItem na tela, passando para o componente
            a foto que está em cada item do array fotos*/}
            {
                this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto}/>)
            }
        </div>            
        );
    }
}