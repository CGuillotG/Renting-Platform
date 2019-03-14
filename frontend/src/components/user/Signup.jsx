import React from 'react'
import axios from 'axios'
import { Button } from 'antd';
let url = 'https://weavemx.herokuapp.com/auth/signup'

class Signup extends React.Component {
    state = {
        newUser : {},
        errors : {}
    }
    
    handleChange = e => {
        let { newUser, errors} = this.state
        newUser[e.target.name] = e.target.value
        //validations
        errors = {}
        if (newUser.password !== newUser.password2) errors.password = "Passwords don't match"
        this.setState({newUser, errors})
    }
    
    sendToServer = () => {
        let {newUser, errors} = this.state
        if(errors === {}) return 
        axios.post(url, newUser)
        .then(res =>{
          console.log("Succesful new User")
          this.props.history.push('/login')
        })
        .catch(e => console.log(e))
    }

    render() {
        let {errors} = this.state
        return (
            <div style={maindivstyle}>
              <br/><br/>
              <h2 style={titlestyle}>Registrate</h2>
              <br/><br/>
              <label htmlFor="firstname">Nombre:</label>
              <input type="text" name="firstname" onChange={this.handleChange}/>
              <br/>
              <label htmlFor="lastname">Apellido:</label>
              <input type="text" name="lastname" onChange={this.handleChange}/>
              <br/>
              <label htmlFor="username">Usuario:</label>
              <input type="text" name="username" onChange={this.handleChange}/>
              <br/>
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" onChange={this.handleChange}/>
              <br/>
              <label htmlFor="phone">Teléfono:</label>
              <input type="text" name="phone" onChange={this.handleChange}/>
              <br/>
              <label htmlFor="password">Contraseña:</label>
              <input type="password" name="password" onChange={this.handleChange}/>
              <br/>
              <label htmlFor="password">Confirmar Contraseña:</label>
              <input type="password" name="password2" onChange={this.handleChange}/>
              <p style={{color:"red"}}>{errors.password}</p>
              <Button onClick={this.sendToServer}>Sign Up</Button>
            </div>
        )
    }
}

export default Signup

const titlestyle = {
  fontWeight: 'bolder',
  color:"rgb(163, 92, 240)"
}

const maindivstyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}