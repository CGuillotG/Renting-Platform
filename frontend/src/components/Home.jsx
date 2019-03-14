import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Input } from 'antd';

const Search = Input.Search;
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
    console.log("SeacrhTerm",searchterm)
    this.setState({ searchterm })
  }

  sendSearch = e => {
    if (e.key === 'Enter') {
      let { searchterm } = this.state
      this.props.history.push(`/busqueda?search=${searchterm}`)
    }
  }

  render() {
    let { /* const maindivstyle = {
      width:"100%",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    } */products, searchterm } = this.state

    return (
      <div>
        <div id="cover" style={coverstyle}>
          <div id="incover" style={incoverstyle}>
            <h1 style={h1coverstyle}>Conectamos a gente que quiere rentar<br/>algo con gente que lo tiene.</h1>
              <Search placeholder="¿Qué quieres rentar?" onChange={this.changeSearch} onSearch={()=>this.props.history.push(`/busqueda?search=${searchterm}`)} style={{ width: 500 }} />
          </div>
        </div>
        <br/>
        <br/>
        <div style={sectiontextstyle}>
          <h2 style={subtitle}>Ahorra hasta 80% rentando</h2>
          <br/>
          <img src="https://res.cloudinary.com/cgui1107/image/upload/v1552592973/Weave/Resources/DeepinScreenshot_select-area_20190314134922.png" alt="" width="85%"/>
        </div>
        <br/>
        <hr/>
        <br/>
        <div style={sectioncardstyle} >
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
        {/* <div style={sectiontextstyle}>
          <h2 style={subtitle}>Gana dinero extra con las cosas que no usas</h2>
        </div>
        <div style={sectiontextstyle}>
          <h2 style={subtitle}>¿Por qué rentar en Weave?</h2>
        </div>
        <div style={sectiontextstyle}>
        <h2 style={subtitle}>¿No encuentras lo que necesitas?</h2>
        </div>
        <div style={sectioncardstyle} >
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
        </div> */}
        <br/>
        <br/>
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
  fontSize:"300%",
  textAlign: "center",
  fontWeight: 'bolder',
  color: 'white'
}
let sectiontextstyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center'
}
let subtitle = {
  fontSize:"200%",
  fontWeight: 'bolder',
  color:"rgb(163, 92, 240)"
}
let sectioncardstyle = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center'
}
