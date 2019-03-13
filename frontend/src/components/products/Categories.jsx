import React from 'react'
import { Link } from "react-router-dom";

export default () =>  {
  return (
    <section style={{display:"flex", flexWrap:"wrap"}}>
        <Link to="/categorias/Fotografía">
          <h3>Fotografía</h3>
          <img src="./images/weave-fotografia.jpg" alt="Fotografía" height="300"/>
        </Link>
        <Link to="/categorias/Deportes">
          <h3>Deportes</h3>
          <img src="./images/weave-bicicleta.jpg" alt="Deportes" height="300"/>
        </Link>
        <Link to="/categorias/Eventos">
          <h3>Eventos</h3>
          <img src="./images/weave-asador.jpg" alt="Eventos" height="300"/>
        </Link>
        <Link to="/categorias/Otros">
          <h3>Otros</h3>
          <img src="./images/weave-instrumentos.jpeg" alt="Otros" height="300"/>
        </Link>
    </section>
  )
}