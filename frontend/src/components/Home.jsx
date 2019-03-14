import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
let requestsURL = 'https://weavemx.herokuapp.com/requests/'
let productsURL = 'https://weavemx.herokuapp.com/products/'

export default class Beers extends React.Component {
  state = {
    requests: [],
    products: [],
    searchterm: ''
  }

  componentDidMount = () => {
    axios.get(requestsURL).then(res => {
      let requests = res.data.filter((elem, index) => elem.requestStatus.includes('Pending'))
      this.setState({ requests })
    })
    axios.get(productsURL).then(res => {
      let products = res.data
      if (products.length > 5) products.length = 5
      this.setState({ products })
    })
  }

  changeSearch = e => {
    let searchterm = e.target.value.toLowerCase()
    this.setState({ searchterm })
  }

  sendSearch = e => {
    if (e.key === 'Enter') {
      let { searchterm } = this.state
      this.props.history.push(`/busqueda?search=${searchterm}`)
    }
  }

  render() {
    let { requests, products, searchterm } = this.state

    return (
      <div>
        <div id="cover" style={coverstyle}>
          <div id="incover" style={incoverstyle}>
            <h1 style={h1coverstyle}>Conectamos a gente que quiere rentar algo con gente que lo tiene</h1>
            <span>
              <input
                onChange={this.changeSearch}
                onKeyDown={this.sendSearch}
                type="search"
                name="searchbar"
                id="searchbar"
                placeholder="¿Qué quieres rentar?"
              />
              <Link to={`/busqueda?search=${searchterm}`}>
                <img src="./images/identifica.png" alt="Buscar" height="25" />
              </Link>
            </span>
          </div>
        </div>
        <h2>Ahorra hasta 80% rentando</h2>
        <br />
        <hr />
        <div id="homeproducts" style={{ display: 'flex' }}>
          {products.map((product, index) => {
            return (
              <div key={index}>
                <Link to={`/producto/${product._id}`}>
                  <img src={product.productPics[0]} alt="Producto" height="150" />
                </Link>
                <br />
                <img src={product.lessor[0].profilePic} alt="Arrendador" height="50" style={{ borderRadius: '50%' }} />
                <p>{product.lessor[0].username}</p>
                <Link to={`/producto/${product._id}`}>
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
        <div id="homerequests" style={{ display: 'flex' }}>
          {requests.map((request, index) => {
            return (
              <div key={index}>
                <img
                  src={request.requester[0].profilePic}
                  alt="ProfilePic"
                  height="50"
                  style={{ borderRadius: '50%' }}
                />
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

let coverstyle = {
  height: '65vh',
  backgroundImage:
    'url(https://res.cloudinary.com/cgui1107/image/upload/v1552528962/Weave/Resources/homepage-cover.jpg)',
  backgroundPosition: 'top',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
}
let incoverstyle = {
  height: '100%',
  wdth: '100%',
  backgroundColor: 'rgba(0,0,0,0.35)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}
let h1coverstyle = {
  color:"white",
}
