import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

let rentsURL = 'https://weavemx.herokuapp.com/rents/'



export default class DetailRents extends React.Component {
  state = {
    rents: []
  }

  componentDidMount = () => {
    const id = this.props.user._id
    axios.get(rentsURL).then(res => {
      let rents = res.data.filter((elem, index) => elem.lessee[0]._id.includes(id))
      this.setState({ rents })
    })
  }

  render() {
    let {rents} = this.state  
    return (
    <div style={{ display: 'flex', flexDirection:"column"}}>
      {rents.map((elem, index)=>{
        return <div key={index} style={{display:"flex"}}>
          <div>
            <img src={elem.product[0].productPics[0]} alt="Product Pic" height="100"/>
          </div>
          <div>
            <h3>{elem.product[0].title}</h3>
            <p>{elem.product[0].description}</p>

          </div>
          <div>
            <p><b>Fecha Inicio:</b> {elem.startDate.substring(0, 10)}</p>
            <p><b>Fecha Fin:</b> {elem.endDate.substring(0, 10)}</p>
            
          </div>
          <div>
            <Link to={`/cuenta/rentas/${elem._id}`}><button>{elem.status}</button></Link>            
          </div>
        </div>
      })}
    </div>
    )
  }
}
