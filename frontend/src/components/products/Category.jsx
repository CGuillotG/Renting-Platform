import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
let productsURL = 'http://localhost:3000/products/'

export default class DetailProduct extends React.Component {
  state = {
    products: [],
    category: null,
    image: null
  }

  componentDidMount = () => {
    const { category } = this.props.match.params
    axios.get(productsURL).then(res => {
      let products = res.data.filter((elem, index) => elem.category.toLowerCase().includes(category.toLowerCase()))
      let image = this.getCategoryImage(category)
      this.setState({ products, category, image })
    })
  }

  getCategoryImage = category => {
    let image = ""
    switch(category) {
      case "Fotografía":
        image = "./images/weave-fotografia.jpg"
        break;
      case "Deportes":
        image = "./images/weave-bicicleta.jpg"
        break;
      case "Eventos":
        image = "./images/weave-asador.jpg"
        break;
      case "Otros":
        image = "./images/weave-instrumentos.jpeg"
        break;
      default:
        break;
    }
    return image
  }

  render() {
    let { products, category, image } = this.state
    return (
      <div>
        <p><Link to="/">weave</Link> > <Link to="/categorias">categorías</Link> > {category}</p>
        <h3>{category}</h3>
        {/* <img src={image} alt="Fotografía" height="300"/> */}
        {products.map((product, index) => {
          return (
            <div key={index}>
              <Link to={`producto/${product._id}`}>
                <img src={product.productPics[0]} alt="Producto" height="150" />
              </Link>
              <br />
              <img src={product.lessor[0].profilePic} alt="Arrendador" height="50" style={{ borderRadius: '50%' }} />
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
    )
  }
}
