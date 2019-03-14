import React, { Component } from 'react'
import Routes from './Routes.jsx'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { Affix } from 'antd'
let loginUrl = 'https://weavemx.herokuapp.com/auth/login'
let logoutUrl = 'https://weavemx.herokuapp.com/auth/logout'
const loggedUrl = 'https://weavemx.herokuapp.com/auth/logged'
const adminUrl = 'https://weavemx.herokuapp.com/auth/admin'

class App extends Component {
  state = {
    isLogged: false,
    user: {},
    isAdmin: false,
    top: 0
  }

  isLogged = () => {
    axios
      .get(loggedUrl, { withCredentials: true })
      .then(res => this.setState({ isLogged: true, user: res.data.user }))
      .catch(e => this.setState({ isLogged: false }))
  }
  isAdmin = () => {
    axios
      .get(adminUrl, { withCredentials: true })
      .then(res => this.setState({ isAdmin: true }))
      .catch(e => this.setState({ isAdmin: false }))
  }

  componentDidMount = () => {
    this.isLogged()
  }

  drawNavs = () => {
    let { isLogged } = this.state
    return (
      <nav style={navstyle}>
        <div style={navstyleleft}>
          <NavLink style={navelemstyle} exact to="/">
            <img src="https://res.cloudinary.com/cgui1107/image/upload/v1552586697/Weave/Resources/Weave.mx.png" alt="Weave" style={navlogo}/>
          </NavLink>
        </div>
        <div>
          <NavLink style={navelemstyle} activeStyle={{ fontWeight: 'bolder' }} exact to="/categorias">
            Categorías
          </NavLink>
          <span> | </span>
          <NavLink style={navelemstyle} activeStyle={{ fontWeight: 'bolder' }} exact to="/cuenta/publicaciones/nueva">
            Publicar Producto
          </NavLink>
          <span> | </span>
          {isLogged ? (
            <NavLink style={navelemstyle} activeStyle={{ fontWeight: 'bolder' }} to="/cuenta">
              <img src={this.state.user.profilePic} alt="" height="25" style={{ borderRadius: '50%' }} />
            </NavLink>
          ) : (
            <NavLink style={navelemstyle} activeStyle={{ fontWeight: 'bolder' }} to="/login">
              Ingresa
            </NavLink>
          )}
          <span> | </span>
          {isLogged ? (
            <NavLink style={navelemstyle} activeStyle={{ fontWeight: 'bolder' }} to="/logout">
              Salir
            </NavLink>
          ) : (
            <NavLink style={navelemstyle} activeStyle={{ fontWeight: 'bolder' }} to="/signup">
              Registrate
            </NavLink>
          )}
        </div>
      </nav>
    )
  }

  logIn = auth => {
    axios
      .post(loginUrl, auth, { withCredentials: true })
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
    axios
      .get(logoutUrl, { withCredentials: true })
      .then(res => this.setState({ isLogged: false }))
      .catch(e => console.log(e))
  }

  render() {
    const { isLogged, user } = this.state

    return (
      <div>
        <Affix offsetTop={this.state.top}>{this.drawNavs()}</Affix>
        <div style={maincontentstyle}><Routes isLogged={isLogged} logIn={this.logIn} logOut={this.logOut} user={user}/></div>        
        <footer style={footerStyle}>
          © Weave 2019 - Hecho en la Ciudad de México por el equipo de Weave
        </footer>
      </div>
    )
  }
}

export default App

const maincontentstyle = {
  minHeight: "93vh"
}
const footerStyle = {
  flexShrink: "0",
  background: 'rgb(163, 92, 240)',
  height:"3vh",
  textAlign: 'center',
  fontSize: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}
const navstyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height:"4vh",
  backgroundColor:"rgb(253, 250, 241)"
}
const navlogo = {
  height:"3vh",
}
const navstyleleft = {
  justifySelf: 'start'
}
const navelemstyle = {
  paddingLeft:"10px",
  paddingRight:"10px",
  color:"rgb(163, 92, 240)"
}
