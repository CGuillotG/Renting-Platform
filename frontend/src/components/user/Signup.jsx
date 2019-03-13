import React from 'react'
import axios from 'axios'
let url = 'http://localhost:3000/auth/signup'

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
        .then(res =>this.props.history.push('/login'))
        .catch(e => console.log(e))
    }

    render() {
        let {errors} = this.state
        return (
            <div>
              <label htmlFor="firstname">Nombre:</label><br/>
              <input type="text" name="firstname" onChange={this.handleChange}/>
              <br/>
              <label htmlFor="lastname">Apellido:</label><br/>
              <input type="text" name="lastname" onChange={this.handleChange}/>
              <br/>
              <label htmlFor="username">Usuario:</label><br/>
              <input type="text" name="username" onChange={this.handleChange}/>
              <br/>
              <label htmlFor="email">Email:</label><br/>
              <input type="email" name="email" onChange={this.handleChange}/>
              <br/>
              <label htmlFor="phone">Teléfono:</label><br/>
              <input type="text" name="phone" onChange={this.handleChange}/>
              <br/>
              <label htmlFor="password">Contraseña:</label><br/>
              <input type="password" name="password" onChange={this.handleChange}/>
              <br/>
              <label htmlFor="password">Confirmar Contraseña:</label><br/>
              <input type="password" name="password2" onChange={this.handleChange}/>
              <p style={{color:"red"}}>{errors.password}</p>
              <button onClick={this.sendToServer}>Sign Up</button>
            </div>
        )
    }
}

export default Signup