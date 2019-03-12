import React from 'react'
import axios from 'axios'
let requestsURL = ''

export default class Beers extends React.Component {
  state = { requests: [] }

  componentDidMount = () => {
    axios.get(requestsURL).then(res => {
      this.setState({ requests: res.data })
    })
  }

  render() {
    return (
      <div>
        <h1>Conectamos a gente que quiere rentar algo con gente que lo tiene</h1>
        <input type="search" name="search" id="searchbar" />
        <h2>Ahorra hasta 80% rentando</h2>
        <br />
        <hr />
        <h2>Gana dinero extra con las cosas que no usas</h2>
        <br />
        <h2>¿Por qué rentar en Weave?</h2>
        <br />
        <h2>¿No encuentras lo que necesitas?</h2>
        <br />
        
      </div>
    )
  }
}
