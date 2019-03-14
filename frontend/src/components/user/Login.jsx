import React from "react";
import { Button } from 'antd';

class Login extends React.Component {
  state = {
    auth: {},
    message: ""
  };

  handleChange = e => {
    let { auth } = this.state;
    auth[e.target.name] = e.target.value;
    this.setState({ auth });
  };

  render() {
    let { message, auth } = this.state;
    return (
      <div style={maindivstyle}>
        <br/><br/>
        <h2 style={titlestyle}>Ingresa</h2>
        <br/><br/>
        <input
          type="email"
          name="email"
          placeholder="Correo"
          onChange={this.handleChange}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={this.handleChange}
        />
        <br />
        <p style={{ color: "red" }}> {message} </p>
        <Button onClick={() => this.props.logIn(auth)}>Log in</Button>
      </div>
    );
  }
}

export default Login;

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