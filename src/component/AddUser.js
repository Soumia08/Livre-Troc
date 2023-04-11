import React from 'react'
import { Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import '../styles/AddUser.scss'
import { AUTH_TOKEN_KEY } from '../App';
import SimpleModal from '../SimpleModal';


class AddUser extends React.Component {

  

  constructor() {
    super();
    this.state = { userData: {}, showModal: false }
    this.handleCloseModal = this.handleCloseModal.bind(this)

  }

  handleChange = (event) => {
    let currentState = { ...this.state.userData };
    currentState[event.target.name] = event.target.value;
    this.setState({ userData: currentState })
  }

  onSubmit = (event) =>  {
    event.preventDefault();
    axios.post('/users', {
      ...this.state.userData
    }).then(response => {
       const bearerToken = response?.headers?.authorization;
       if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
         const jwt = bearerToken.slice(7, bearerToken.length);
         sessionStorage.setItem(AUTH_TOKEN_KEY,jwt)
       }
       this.props.setUserInfo(response.data.firstName + " " + response.data.lastName)
       this.props.history("/myBooks")
      }).catch(() => {
        this.setState({ showModal: true })
    })

    
}

handleCloseModal() {
  this.setState({ showModal: false })
}


    render() {
      const title = "Inscription impossible"
    const bodyTxt = "l'utilisateur déjà isncrit"
    return (
      <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-4"> Inscription </h2>
            <form onSubmit={this.onSubmit}>
              <div>
                <label>E-mail</label>
                <input name="email" type="text" className="form-control" placeholder='obligatoire' onChange={this.handleChange} />
              </div>
              <div>
                <label>Nom</label>
                <input name="lastName" type="text" className="form-control" placeholder="Entre 2 et 25 caractères " onChange={this.handleChange} />
              </div>
              <div>
                <label>Prénom</label>
                <input name="firstName" type="text" className="form-control" placeholder="Entre 2 et 25 caractères " onChange={this.handleChange} />
              </div>
              <div>
                <label>Mot de passe </label>
                <input name="password" type="password" className="form-control" onChange={this.handleChange} />
              </div>
              <div className="container-valid text-center">
                <input type="submit" value="Valider" className="btn btn-primary mt-3" onChange={this.handleChange} />
              </div>
            </form>
          </div>
          <div className="container-valid text-center mt-5 mb-5"><Link to="/home"> Retour à l'accueil </Link></div>
        </div>
        <SimpleModal title={title} bodyTxt={bodyTxt} handleCloseModal={this.handleCloseModal} showModal={this.state.showModal} />

      </div>
    )
  }
}


export default function (props) {
  const history = useNavigate();
  return <AddUser {...props} history={history} />;
}