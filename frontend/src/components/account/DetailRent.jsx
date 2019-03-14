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
    let {product, startDate, endDate, status, totalFee, lessor_} = this.state.rent
    if(startDate) startDate = startDate.substring(0, 10)
    if(endDate) endDate = endDate.substring(0, 10)
    let [product0,productPics0,lessor0] = [{},"",{}]
    if (lessor_) lessor0 = lessor_[0]
    if (product) {
      product0 = product[0]
      productPics0 = product0.productPics[0]
    }
    console.log(lessor0)
        return (
      <div style={maindivstyle}>
        <h2>Renta de {product0.title}</h2>
        <img src={productPics0} alt="Product Pic" height="300"/>
        <p>{product0.description}</p>
        <img src={lessor0.profilePic} alt="Lessor Pic" height="50"/>
        <p>Arrendatario: {lessor0.username}</p>
        <br/>
        <hr/>
        <p><b>Estatus:</b> {status}</p>
        <p><b>Fecha Inicio:</b> {startDate}</p>
        <p><b>Fecha Fin:</b> {endDate}</p>
        <p><b>Costo Total a Pagar: $</b> {totalFee}</p>

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