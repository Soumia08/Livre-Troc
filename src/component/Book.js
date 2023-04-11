import React from 'react'

import '../styles/Book.scss'
import Img from '../images/book.png'

export default class Book extends React.Component {

constructor (){
  super();
}

render(){
   
     return <div className="book">
      <div className='book-image'>
        <img src={this.props.picUrl}  alt = "book picture" /> 
           {/* <img src={Img} alt="book picture"/>  */}
      </div>
      <div>Titre : {this.props.title}</div>
      <div>Auteur : {this.props.author}</div>
      <div>Catégorie: {this.props.category}</div>
      {this.props.lender &&  <div>Prêteur: {this.props.lender}</div>}
                {this.props.askDate && <div>Date demande: {this.props.askDate}</div>}
                {this.props.closeDate && <div>Date cloture: {this.props.closeDate}</div>}
           
       </div> ;
}
}