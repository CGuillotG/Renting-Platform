import React from 'react'
import axios from 'axios'
import { Button } from 'antd';

const productsURL = 'https://weavemx.herokuapp.com/products/'
const serviceUpload = axios.create({ productsURL, withCredentials: true })

export default class DetailPublication extends React.Component {
  state = {
    newPublication: {
    }
  }

  handleChange = e => {
    let { newPublication } = this.state
    console.log(e.target.files)
    if (e.target.files) newPublication.productPics = e.target.files[0]
    else newPublication[e.target.name] = e.target.value
    this.setState({ newPublication })
  }

  uploadImage = (file, url) => {
    let formData = new FormData()
    formData.append('productPics', file)
    return serviceUpload
      .post(url, formData, {
        headers: { enctype: 'multipart/form-data' }
      })
      .then(res => res.data)
      .catch(e => e)
  }

  submitProduct = () => {
    let { newPublication } = this.state
    if (newPublication.availability) {
      if (newPublication.availability === 'Todos los días') newPublication.availability = 'All'
      else if (newPublication.availability === 'Solo entre semana') newPublication.availability = 'WorkWeek'
      else if (newPublication.availability === 'Solo fines de semana') newPublication.availability = 'WeekEnd'
      else newPublication.availability = 'All'
    }
    if (newPublication.pickAtAddress) {
      if (newPublication.pickAtAddress === 'Vienes a mi casa.') newPublication.pickAtAddress = true
      else if (newPublication.pickAtAddress === 'Nos ponemos de acuerdo en un punto')
        newPublication.pickAtAddress = false
      else newPublication.pickAtAddress = true
    }
    console.log(newPublication)
      this.uploadImage(newPublication.productPics, productsURL)
        .then(res => {
          axios.post(productsURL, {...newPublication}, { withCredentials: true })
          .then(res => console.log(res))
        })
        .catch(e => console.log(e))
  }

  render() {
    return (
      <section style={maindivstyle}>
        <div style={{ height: '300', width: '300' }}>
          <h3>Imágen del Producto:</h3>
          <input name="productPics" type="file" onChange={this.handleChange} />
        </div>
        <div>
          <h2>
            Título: <input name="title" type="text" onChange={this.handleChange} />
          </h2>
          <p>
            Marca: <input name="brand" type="text" onChange={this.handleChange} />
          </p>
          <p>
            Categoría: <input list="category" name="category" onChange={this.handleChange} />
          </p>
          <datalist id="category">
            <option value="Fotografía" />
            <option value="Deportes" />
            <option value="Eventos" />
            <option value="Otros" />
          </datalist>
          <p>
            Descripción: <input name="description" type="textarea" rows="10" onChange={this.handleChange} />
          </p>
          <p>
            Precio usado: $<input type="number" name="usedPrice" onChange={this.handleChange} />
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div>
              <h4>
                $<input name="rentDay1" type="number" onChange={this.handleChange} />
              </h4>
              <p>por día</p>
            </div>
            <div>
              <h4>
                $<input name="rentDay3" type="number" onChange={this.handleChange} />
              </h4>
              <p>3+ días</p>
            </div>
            <div>
              <h4>
                $<input name="rentDay7" type="number" onChange={this.handleChange} />
              </h4>
              <p>7+ días</p>
            </div>
          </div>
          <div>
            <h3>Días Disponibles</h3>
            <input list="availability" name="availability" onChange={this.handleChange} />
            <datalist id="availability">
              <option value="Todos los días" />
              <option value="Solo entre semana" />
              <option value="Solo fines de semana" />
            </datalist>
            <h3>Lugar de Entrega</h3>
            <input list="pickAtAddress" name="pickAtAddress" onChange={this.handleChange} />
            <datalist id="pickAtAddress">
              <option value="Vienes a mi casa." />
              <option value="Nos ponemos de acuerdo en un punto" />
            </datalist>
            <p>
              Área: <input name="area" type="text" onChange={this.handleChange} />
            </p>
          </div>
          <Button onClick={this.submitProduct}>Crear Producto</Button>
        </div>
      </section>
    )
  }
}
const maindivstyle = {
  width:"100%",
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}