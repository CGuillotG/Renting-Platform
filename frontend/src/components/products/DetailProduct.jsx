import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
let productsURL = 'http://localhost:3000/products/'

export default class DetailProduct extends React.Component {
  state = {
    product: {}
  }

  componentDidMount = () => {
    const { id } = this.props.match.params
    axios.get(productsURL + id)
    .then(res => {
      this.setState({ product: res.data[0] })
  })
  }

  render() {
    if(!this.state.product) return <div>Cargando...</div>
    let { title, category, brand, description, rentDay1, rentDay3, rentDay7, availability, pickAtAddress, area, productPics, lessor} = this.state.product
    let mainPic = "#"
    let extraPics = []
    let lessor0 = {}
    if(lessor) {
      lessor0 = lessor[0]
    }
    if(productPics) {
      mainPic = productPics[0]
      extraPics = productPics.slice(1)
    }
    if(category) category=category.toLowerCase()
    let [all, ww, we] = [false,false, false]
    if(availability === "All") all=true
    if(availability === "WorkWeek") ww=true
    if(availability === "WeekEnd") we=true
    return (
      <div>
        <p><Link to="/">weave</Link> > <Link to="/categorias">categorías</Link> > <Link to={`/categorias/${category}`}>{category}</Link> > {title}</p>
        <img src={mainPic} alt={title} height="300" />
        {extraPics.map((elem, index)=>{
          return (
            <div key={index}>
              <img src={elem} alt={title} height="50" />
            </div>
          )
        })}
        <h2>{title}</h2>
        <p>Marca: {brand}</p>
        <p>{description}</p>
        <div>
          <h4>${rentDay1}</h4>
          <p>por día</p>
        </div>
        <div>
          <h4>${rentDay3}</h4>
          <p>3+ días</p>
        </div>
        <div>
          <h4>${rentDay7}</h4>
          <p>7+ días</p>
        </div>
        
        <div>
          <hr/>
          <h3>¿Cuándo lo necesitas?</h3>
          <input type="datetime" name="startdate" id="startdate" placeholder="Fecha de Inicio"/>
          <input type="datetime" name="enddate" id="enddate" placeholder="Fecha Final"/>
          <table></table>
          <button>Solicitar Renta</button>
          <hr/>
        </div>
        <div>
          <h3>Días Disponibles</h3>
          <ul>
            {all ? <li>Todos los días</li>: <span></span>}
            {ww ? <li>Solo entre semana</li>: <span></span>}
            {we ? <li>Solo fines de semana</li>: <span></span>}

          </ul>
          <h3>Lugar de Entrega</h3>
          {pickAtAddress ? <ul><li>Vienes a mi casa.</li><li>Área: {area}</li></ul> : <ul><li>Nos ponemos de acuerdo en un punto</li></ul>}
        </div>
        <div>
          <h3>¿Quien lo renta?</h3>
          <img src={lessor0.profilePic} alt={lessor0.username} height="50"/>
          <h4>{lessor0.username}</h4>
        </div>
      </div>
    )
  }
}
