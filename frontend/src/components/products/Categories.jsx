import React from 'react'
import { Link } from "react-router-dom";

export default () =>  {
  return (
    <section style={maindivstyle}>
        <Link to="/categorias/Fotografía" style={categorystyle}>
          <h3>Fotografía</h3>
          <img src="https://res.cloudinary.com/cgui1107/image/upload/v1552528962/Weave/Resources/weave-fotografia.jpg" alt="Fotografía" width="500"/>
        </Link>
        <Link to="/categorias/Deportes" style={categorystyle}>
          <h3>Deportes</h3>
          <img src="https://res.cloudinary.com/cgui1107/image/upload/v1552528959/Weave/Resources/weave-bicicleta.jpg" alt="Deportes" width="500"/>
        </Link>
        <Link to="/categorias/Eventos" style={categorystyle}>
          <h3>Eventos</h3>
          <img src="https://res.cloudinary.com/cgui1107/image/upload/v1552528960/Weave/Resources/weave-asador.jpg" alt="Eventos" width="500"/>
        </Link>
        <Link to="/categorias/Otros" style={categorystyle}>
          <h3>Otros</h3>
          <img src="https://res.cloudinary.com/cgui1107/image/upload/v1552528958/Weave/Resources/weave-instrumentos.jpg" alt="Otros" width="500"/>
        </Link>
    </section>
  )
}
let categorystyle = {
  padding:"15px",
  display: 'flex',
  flexDirection:"column",
  justifyContent: 'center',
  alignItems: 'center'
}
const maindivstyle = {
  width:"100%",
  display: 'flex',
  flexWrap:"wrap",
  justifyContent: 'center',
  alignItems: 'center'
}