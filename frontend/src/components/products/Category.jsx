import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
let productsURL = 'https://weavemx.herokuapp.com/products/'

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
        image = "https://res.cloudinary.com/cgui1107/image/upload/v1552528962/Weave/Resources/weave-fotografia.jpg"
        break;
      case "Deportes":
        image = "https://res.cloudinary.com/cgui1107/image/upload/v1552528959/Weave/Resources/weave-bicicleta.jpg"
        break;
      case "Eventos":
        image = "https://res.cloudinary.com/cgui1107/image/upload/v1552528960/Weave/Resources/weave-asador.jpg"
        break;
      case "Otros":
        image = "https://res.cloudinary.com/cgui1107/image/upload/v1552528958/Weave/Resources/weave-instrumentos.jpg"
        break;
      default:
        break;
    }
    return image
  }

  render() {
    let { products, category/* , image */ } = this.state
    return (
      <div>
        <p><Link to="/">weave</Link> > <Link to="/categorias">categorías</Link> > {category}</p>
        <div style={maindivstyle}>
          <h3>{category}</h3>
          {/* <img src={image} alt="Fotografía" height="300"/> */}
          <div style={cardsstyle}>
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

        </div>
      </div>
    )
  }
}
const maindivstyle = {
  width:"100%",
  display: 'flex',
  flexDirection: "column",
  justifyContent: 'center',
  alignItems: 'center'
}
const cardsstyle = {
  width:"100%",
  display: 'flex',
  flexWrap:"wrap",
  justifyContent: 'center',
  alignItems: 'center'
}