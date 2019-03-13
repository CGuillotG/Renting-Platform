import React from 'react'
import axios from 'axios'

let rentsUrl = 'https://weavemx.herokuapp.com/rents/'

export default class DetailRent extends React.Component {
  state = {
    rent:{}
  }

  componentDidMount = () => {
    const { id } = this.props.match.params
    axios.get(rentsUrl + id).then(res => {
      this.setState({ rent: res.data[0]})
    })
  }

  render(){
    if (!this.state.rent) return <div>Cargando...</div>
    let {product} = this.state.rent
    let product0 = {}
    if (product) product0 = product[0]
    console.log(this.state.rent)
        return (
      <div>
        <h2>Renta de {product0.title}</h2>
        

      </div>
    )
  }
}