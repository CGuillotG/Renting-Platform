import React, { Component } from 'react'
import Routes from './Routes.jsx'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
let loginUrl = 'https://weavemx.herokuapp.com/auth/login'
let logoutUrl = 'https://weavemx.herokuapp.com/auth/logout'
const loggedUrl = 'https://weavemx.herokuapp.com/auth/logged'
const adminUrl = 'https://weavemx.herokuapp.com/auth/admin'

class App extends Component {
  state = {
    isLogged: false,
    user: {},
    isAdmin: false
  }

  isLogged = () => {
    axios.get(loggedUrl, { withCredentials: true })
      .then(res => this.setState({ isLogged: true, user: res.data.user }))
      .catch(e => this.setState({ isLogged: false }))
  }
  isAdmin = () => {
    axios.get(adminUrl, { withCredentials: true })
      .then(res => this.setState({ isAdmin: true }))
      .catch(e => this.setState({ isAdmin: false }))
  }

  componentDidMount = () => {
    this.isLogged()
  }
  
  drawNavs = () => {
    let { isLogged } = this.state
    return (
      <nav>
        <NavLink activeStyle={{ fontWeight: 'bolder' }} exact to="/">
          Weave
        </NavLink>
        <span> | </span>
        <NavLink activeStyle={{ fontWeight: 'bolder' }} exact to="/categorias">
          Categorías
        </NavLink>
        <span> | </span>
        <NavLink activeStyle={{ fontWeight: 'bolder' }} exact to="/cuenta/productos/publicar">
          Publicar Artículo
        </NavLink>
        {/* <span> | </span>
        <Link to="/construccion">
        ¿Cómo funciona?
        </Link> */}
        <span> | </span>
        {isLogged ? (
          <NavLink activeStyle={{ fontWeight: 'bolder' }} to="/cuenta">
            <img src={this.state.user.profilePic} alt="" height="25" style={{ borderRadius: '50%' }} />
          </NavLink>
        ) : (
          <NavLink activeStyle={{ fontWeight: 'bolder' }} to="/login">
            Ingresa
          </NavLink>
        )}
        <span> | </span>
        {isLogged ? (
          <NavLink activeStyle={{ fontWeight: 'bolder' }} to="/logout">
            Salir
          </NavLink>
        ) : (
          <NavLink activeStyle={{ fontWeight: 'bolder' }} to="/signup">
            Registrate
          </NavLink>
        )}
      </nav>
    )
  }

  logIn = auth => {
    axios.post(loginUrl, auth, { withCredentials: true })
      .then(res => {
        this.setState({ isLogged: true, user: res.data })
        console.log('Login Data')
        console.log(res.data)
        console.log('----')
      })
      .catch(e => {
        let message = 'Invalid username and password'
        this.setState({ message })
      })
  }

  logOut = () => {
    axios.get(logoutUrl, { withCredentials: true })
      .then(res => this.setState({ isLogged: false }))
      .catch(e => console.log(e))
  }

  render() {
    const { isLogged, user } = this.state

    return (
      <div>
        {this.drawNavs()}
        <Routes isLogged={isLogged} logIn={this.logIn} logOut={this.logOut} user={user} />
        <footer>
          <hr />
          Footer
        </footer>
      </div>
    )
  }
}

export default App
