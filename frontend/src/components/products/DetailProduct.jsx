import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { DatePicker } from 'antd'
import moment from 'moment'

let productsURL = 'https://weavemx.herokuapp.com/products/'
let rentsUrl = 'https://weavemx.herokuapp.com/rents/'
const { RangePicker } = DatePicker
const dateFormat = 'DD/MM/YYYY'

export default class DetailProduct extends React.Component {
  state = {
    product: {},
    rent: {},
    error: '',
    days:1,
    dayprice:0,
    startdate:null,
    enddate:null
  }

  componentDidMount = () => {
    const { id } = this.props.match.params
    axios.get(productsURL + id).then(res => {
      this.setState({ product: res.data[0], dayprice:res.data[0].rentDay1})
    })
  }

  calendarChange = e => {
    if(e.length === 2) {
      var days = moment.duration(e[1].diff(e[0])).asDays()
      let dayprice = 0
      if (days < 3) dayprice = this.state.product.rentDay1
      else if (days < 7) dayprice = this.state.product.rentDay3
      else dayprice = this.state.product.rentDay7
      this.setState({days, dayprice, startdate:e[0].toDate(), enddate:e[1]._d})
    }
  }
  createRent = () => {
    let rent = {
      product:this.props.match.params.id,
      startDate:this.state.startdate,
      endDate:this.state.enddate,
      status:'Pending',
      totalFee: this.state.days*this.state.dayprice
    }
    const { id } = this.props.match.params
    console.log(rent)
    axios.post(rentsUrl, rent, { withCredentials: true })
      .then(resrent => {
        axios.post(productsURL+id, {rent:resrent.data._id}, { withCredentials: true })
        .then(resprod => {
          console.log(resprod)
          this.props.history.push(`/cuenta/rentas/${resrent.data._id}`)
        })
      })
      .catch(e => console.log(e))
  }

  render() {
    if (!this.state.product) return <div>Cargando...</div>
    let { title, category, brand, description, rentDay1, rentDay3, rentDay7 } = this.state.product
    let { availability, pickAtAddress, area, productPics, lessor } = this.state.product
    let {days, dayprice} = this.state
    let mainPic = '#'
    let extraPics = []
    let lessor0 = {}
    if (lessor) {
      lessor0 = lessor[0]
    }
    if (productPics) {
      mainPic = productPics[0]
      extraPics = productPics.slice(1)
    }
    if (category) category = category.toLowerCase()
    let [all, ww, we] = [false, false, false]
    if (availability === 'All') all = true
    if (availability === 'WorkWeek') ww = true
    if (availability === 'WeekEnd') we = true
    return (
      <div>
        <p>
          <Link to="/">weave</Link> > <Link to="/categorias">categorías</Link> >{' '}
          <Link to={`/categorias/${category}`}>{category}</Link> > {title}
        </p>
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
              <hr />
              <h3>¿Cuándo lo necesitas?</h3>
              <RangePicker
                defaultValue={[moment().add(1, 'days'), moment().add(2, 'days')]}
                format={dateFormat}
                onCalendarChange={this.calendarChange}
              />
              <p>{days} día(s)</p>
              <p>Precio por día: <b>${dayprice}</b></p>
              <p><b>Precio total: ${dayprice*days}</b></p>
              <button onClick={this.createRent}>Solicitar Renta</button>
              <hr />
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
              <h3>¿Quien lo renta?</h3>
              <img src={lessor0.profilePic} alt={lessor0.username} height="50" />
              <h4>{lessor0.username}</h4>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
