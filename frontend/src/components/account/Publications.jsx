import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

let productsURL = 'https://weavemx.herokuapp.com/products/'



export default class DetailPublications extends React.Component {
  state = {
    publications: []
  }

  componentDidMount = () => {
    const id = this.props.user._id
    axios.get(productsURL).then(res => {
      let publications = res.data.filter((elem, index) => elem.lessor[0]._id.includes(id))
      this.setState({ publications })
    })
  }

  render() {
    let {publications} = this.state
    return (
    <div style={{ display: 'flex', flexDirection:"column"}}>
    {publications.map((elem,index)=>{
      let status = ""
      if (elem.rent.length === 0) status = "Activo"
      else status = elem.rent[0].status
      return <div key={index} style={{display:"flex"}}>
          <div>
            <img src={elem.productPics[0]} alt="Product Pic" height="100"/>
          </div>
          <div>
            <h3>{elem.title}</h3>
            <p>{elem.description}</p>
          </div>
          <div>
            <button disabled>Estatus: {status}</button>           
          </div>
          <div>
             <Link to={`/producto/${elem._id}`}><button>Vista Pública</button></Link>
             <Link to={`/cuenta/publicaciones/${elem._id}`}><button>Detalles y Edición</button></Link>
          </div>
        </div>
      })}
    </div>
    )
  }
}
