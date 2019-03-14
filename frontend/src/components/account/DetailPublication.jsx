import React from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'

let productsURL = 'https://weavemx.herokuapp.com/products/'

export default class DetailPublication extends React.Component {
  state = {
    publication: {},
    rent:{}
  }

  componentDidMount = () => {
    const { id } = this.props.match.params
    axios.get(productsURL + id).then(res => {

      this.setState({ publication: res.data[0], rent:res.data[0].rent[0] })
    })
  }

  render() {
    console.log('Publication', this.state.publication)
    console.log('Rent', this.state.rent)
    if (!this.state.publication) return <div>Cargando...</div>
    let { title, category, brand, description, rentDay1, rentDay3, rentDay7 } = this.state.publication
    let { availability, pickAtAddress, area, productPics } = this.state.publication
    let [mainPic, extraPics, hasRent] = ['',[],false]
    if (productPics) {
      mainPic = productPics[0]
      extraPics = productPics.slice(1)
    }
    if (category) category = category.toLowerCase()
    let [all, ww, we] = [false, false, false]
    if (availability === 'All') all = true
    if (availability === 'WorkWeek') ww = true
    if (availability === 'WeekEnd') we = true
    if (this.state.rent === undefined) {
      hasRent = false
    } else {
      hasRent = true
    }
    return (
      <section style={{ display: 'flex' }}>
        <div>
          <img src={mainPic} alt={title} height="300" />
          {extraPics.map((elem, index) => {
            return (
              <div key={index}>
                <img src={elem} alt={title} height="50" />
              </div>
            )
          })}
        </div>
        <div>
          <h2>{title}</h2>
          <p>Marca: {brand}</p>
          <p>{description}</p>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
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
          </div>
          <div>
            <h3>Días Disponibles</h3>
            <ul>
              {all ? <li>Todos los días</li> : <span />}
              {ww ? <li>Solo entre semana</li> : <span />}
              {we ? <li>Solo fines de semana</li> : <span />}
            </ul>
            <h3>Lugar de Entrega</h3>
            {pickAtAddress ? (
              <ul>
                <li>Vienes a mi casa.</li>
                <li>Área: {area}</li>
              </ul>
            ) : (
              <ul>
                <li>Nos ponemos de acuerdo en un punto</li>
              </ul>
            )}
          </div>
          <div>
            <hr/>
            <h3>Renta Activa</h3>
            {hasRent ? <div>
              <p><b>Estatus:</b> {this.state.rent.status}</p>
              <p><b>Fecha Inicio:</b> {this.state.rent.startDate}</p>
              <p><b>Fecha Fin:</b> {this.state.rent.endDate}</p>
              <p><b>Costo Total a Pagar: $</b> {this.state.rent.totalFee}</p>
              <button disabled>Aprobar</button>
            </div>: <p>No hay renta activa</p>}
          </div>
          <button disabled>Editar</button>
        </div>
      </section>
    )
  }
}
