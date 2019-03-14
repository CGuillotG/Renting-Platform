import React from 'react'
import { Link } from "react-router-dom";

export default () =>  {
  return (
    <section style={{display:"flex", flexWrap:"wrap"}}>
        <Link to="/categorias/Fotografía">
          <h3>Fotografía</h3>
          <img src="https://res.cloudinary.com/cgui1107/image/upload/v1552528962/Weave/Resources/weave-fotografia.jpg" alt="Fotografía" height="300"/>
        </Link>
        <Link to="/categorias/Deportes">
          <h3>Deportes</h3>
          <img src="https://res.cloudinary.com/cgui1107/image/upload/v1552528959/Weave/Resources/weave-bicicleta.jpg" alt="Deportes" height="300"/>
        </Link>
        <Link to="/categorias/Eventos">
          <h3>Eventos</h3>
          <img src="https://res.cloudinary.com/cgui1107/image/upload/v1552528960/Weave/Resources/weave-asador.jpg" alt="Eventos" height="300"/>
        </Link>
        <Link to="/categorias/Otros">
          <h3>Otros</h3>
          <img src="https://res.cloudinary.com/cgui1107/image/upload/v1552528958/Weave/Resources/weave-instrumentos.jpg" alt="Otros" height="300"/>
        </Link>
    </section>
  )
}