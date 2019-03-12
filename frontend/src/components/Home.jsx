import React from 'react'
import axios from 'axios'
let requestsURL = 'http://localhost:3000/requests/'
let productsURL = 'http://localhost:3000/products/'

export default class Beers extends React.Component {
  state = {
    requests: [],
    products: []
  }

  componentDidMount = () => {
    axios.get(requestsURL).then(res => {
      let requests = res.data.filter((elem, index)=> elem.requestStatus.includes('Pending') )
      this.setState({ requests })
    })
    axios.get(productsURL).then(res => {
      let products = res.data.sort(function (a, b) {
        if (a.createdAt < b.createdAt) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });
      if(products.length > 5) products.length = 5
      this.setState({ products })
    })
  }

  render() {
    let {requests, products} = this.state
    return (
      <div>
        <h1>Conectamos a gente que quiere rentar algo con gente que lo tiene</h1>
        <input type="search" name="search" id="searchbar" />
        <h2>Ahorra hasta 80% rentando</h2>
        <br />
        <hr />
        {products.map((product,index)=>{
          return(
            <div key={index}>
              <img src={product.productPics[0]} alt="Producto" height="150"/>
              <br/>
              <img src={product.lessor[0].profilePic} alt="Arrendador" height="50" style={{"borderRadius":"50%"}}/>
              <p>{product.lessor[0].username}</p>
              <h3>{product.title}</h3>
              <p>{product.area}</p>
              <p>desde</p>
              <h4>${product.rentDay7} por día</h4>
            </div>
          )
        })}
        <h2>Gana dinero extra con las cosas que no usas</h2>
        <br />
        <h2>¿Por qué rentar en Weave?</h2>
        <br />
        <h2>¿No encuentras lo que necesitas?</h2>
        <br />
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
    )
  }
}
