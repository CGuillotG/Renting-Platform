import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Button } from 'antd';
let url = "https://weavemx.herokuapp.com/auth/logged";


export default class Profile extends React.Component {
    state = {user:{}}

    componentDidMount(){
        axios.get(url, {withCredentials: true})
            .then(res => {
                this.setState({user: res.data.user})
                this.forceUpdate()
            })
            .catch(e=> this.props.history.push("/login"))
    }
                    
    componentWillReceiveProps(){
        axios.get(url, {withCredentials: true})
        .then(res => {
            this.setState({user: res.data.user})
            this.forceUpdate()})
        .catch(e=> this.props.history.push("/login"))                                 
    }

    render() {
      let { profilePic, username, email } = this.state.user
      if(!profilePic) return <div>Cargando...</div>
        return (
          <div style={maindivstyle}>
                <img src={profilePic} alt="profilepic" height="250" />
                <h3>Username : {username}</h3>
                <p>Email: {email}</p>
                <Link to="/cuenta/editar"><Button>Edit</Button></Link>
            </div>
        )
    }
}
const maindivstyle = {
  width:"100%",
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}