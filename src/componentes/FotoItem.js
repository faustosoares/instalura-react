import React, { Component } from 'react';
import {Link} from 'react-router';
import Pubsub from 'pubsub-js';

class FotoAtualizacoes extends Component {
    constructor(props){
      super(props);
      this.state = {likeada : this.props.foto.likeada};
    }

    //REFATORACAO: esse metodo foi transportado para Timeline.js, deixando aqui apenas a manipulacao da VIEW
    like(event){
      event.preventDefault();
      this.setState({likeada : !this.state.likeada});
      this.props.like(this.props.foto.id);
    }

    //REFATORACAO: esse metodo foi transportado para Timeline.js, deixando aqui apenas a manipulacao da VIEW
    comenta(event){
      event.preventDefault();
      this.props.comenta(this.props.foto.id,this.comentario.value);
    }

    render(){
        return (
            <section className="fotoAtualizacoes">
              <a onClick={this.like.bind(this)} className={this.state.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Likar</a>
              <form className="fotoAtualizacoes-form" onSubmit={this.comenta.bind(this)}>
                <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={input => this.comentario = input}/>
                <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
              </form>

            </section>            
        );
    }
}

class FotoInfo extends Component {

    render(){
        return (
            <div className="foto-in fo">
              <div className="foto-info-likes">
                {
                  this.props.foto.likers.map(liker => {
                    return(<Link key={liker.login} href={`/timeline/${liker.login}`} >{liker.login},</Link>) 
                  })
                }
                 
                 curtiram
             
              </div>

              <p className="foto-info-legenda">
                <a className="foto-info-autor">autor </a>
                {this.props.foto.comentario}
              </p>

              <ul className="foto-info-comentarios">
                {
                  this.props.foto.comentarios.map(comentario => {
                    return (
                      <li className="comentario" key={comentario.id}>
                        <Link to={`/timeline/${comentario.login} `} className="foto-info-autor">{comentario.login} </Link>
                        {comentario.texto}
                      </li>
                    );
                  })
                }
              </ul>
            </div>            
        );
    }
}

class FotoHeader extends Component {
    render(){
        return (
            <header className="foto-header">
              <figure className="foto-usuario">
                <img src={this.props.foto.urlPerfil} alt="foto do usuario"/>
                <figcaption className="foto-usuario">
                  <Link to={`/timeline/${this.props.foto.loginUsuario}`}>
                    {this.props.foto.loginUsuario}
                  </Link>  
                </figcaption>
              </figure>
              <time className="foto-data">{this.props.foto.horario}</time>
            </header>            
        );
    }
}


//A classe FotoItem recebe a foto como argumento e repassa para todos os componentes internos que são usados
//para montar a entrada da timeline.
export default class FotoItem extends Component {
    render(){
        return (
          <div className="foto">
            <FotoHeader foto={this.props.foto}/>
            <img alt="foto" className="foto-src" src={this.props.foto.urlFoto}/>
            <FotoInfo foto={this.props.foto}/>
            
            {
              //Substituido por spread operatior
              //<FotoAtualizacoes foto={this.props.foto} like={this.props.like} comenta={this.props.comenta}/>
            }

            <FotoAtualizacoes {...this.props}/>

          </div>            
        );
    }
}