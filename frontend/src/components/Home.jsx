import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
let requestsURL = 'http://localhost:3000/requests/'
let productsURL = 'http://localhost:3000/products/'

export default class Beers extends React.Component {
  state = {
    requests: [],
    products: [],
    searchterm: null
  }

  componentDidMount = () => {
    axios.get(requestsURL).then(res => {
      let requests = res.data.filter((elem, index)=> elem.requestStatus.includes('Pending') )
      this.setState({ requests })
    })
    axios.get(productsURL).then(res => {
      let products = res.data
      if(products.length > 5) products.length = 5
      this.setState({ products })
    })
  }
  
  changeSearch = e => {
    let searchterm = e.target.value.toLowerCase()
    this.setState({searchterm})
  }

  sendSearch = e => {
    if(e.key === "Enter") {
      let {searchterm} = this.state
      this.props.history.push(`/busqueda?search=${searchterm}`)
    }
  }

  render() {
    let {requests, products, searchterm} = this.state
    return (
      <div>
        <h1>Conectamos a gente que quiere rentar algo con gente que lo tiene</h1>
        <input onChange={this.changeSearch} onKeyDown={this.sendSearch} type="search" name="searchbar" id="searchbar" placeholder="¿Qué quieres rentar?"/>
        <Link to={`/busqueda?search=${searchterm}`}>
          <img src="./images/identifica.png" alt="Buscar" height="25"/>        
        </Link>
        <h2>Ahorra hasta 80% rentando</h2>
        <br />
        <hr />
        <div id="homeproducts" style={{display:"flex"}}>
          {products.map((product,index)=>{
            return(
              <div key={index}>
                <Link to={`producto/${product._id}`}>
                  <img src={product.productPics[0]} alt="Producto" height="150"/>
                </Link>
                <br/>
                <img src={product.lessor[0].profilePic} alt="Arrendador" height="50" style={{"borderRadius":"50%"}}/>
                <p>{product.lessor[0].username}</p>
                <Link to={`producto/${product._id}`}>
                  <h3>{product.title}</h3>
                </Link>
                <p>{product.area}</p>
                <p>desde</p>
                <h4>${product.rentDay7} por día</h4>
              </div>
            )
          })}
        </div>
        <h2>Gana dinero extra con las cosas que no usas</h2>
        <br />
        <h2>¿Por qué rentar en Weave?</h2>
        <br />
        <h2>¿No encuentras lo que necesitas?</h2>
        <br />
        <div id="homerequests" style={{display:"flex"}}>
          {requests.map((request,index)=>{
            return(
              <div key={index}>
                <img src={request.requester[0].profilePic} alt="ProfilePic" height="50" style={{"borderRadius":"50%"}}/>
                <h3>{request.requester[0].username}</h3>
                <p>{request.description}</p>
              </div>
            )
          })}
        </div>
        
      </div>
    )
  }
}
