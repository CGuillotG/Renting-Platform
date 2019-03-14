import React from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import Profile from './Profile'
import ProfileEdit from './ProfileEdit'
import Rents from './Rents'
import Publications from './Publications'
import DetailRent from './DetailRent'
import DetailPublication from './DetailPublication'
import NewPublication from './NewPublication'

export default ({ user }) => (
  <div style={{ display: 'flex' }}>
    <nav style={leftnavstyle}>
      <NavLink activeStyle={{ fontWeight: 'bolder' }} style={leftnavmenu} exact to="/cuenta">
        Mi Perfil
      </NavLink>
      <NavLink activeStyle={{ fontWeight: 'bolder' }} style={leftnavmenu} to="/cuenta/rentas">
        Mis Rentas
      </NavLink>
      <NavLink activeStyle={{ fontWeight: 'bolder' }} style={leftnavmenu} to="/cuenta/publicaciones">
        Mis Publicaciones
      </NavLink>
    </nav>
      <Switch>
        <Route exact path="/cuenta" render={props => <Profile {...props} user={user} />} />
        <Route exact path="/cuenta/editar" render={props => <ProfileEdit {...props} user={user} />} />
        <Route exact path="/cuenta/rentas" render={props => <Rents {...props} user={user} />} />
        <Route path="/cuenta/rentas/:id" component={DetailRent} />
        <Route exact path="/cuenta/publicaciones" render={props => <Publications {...props} user={user} />} />
        <Route exact path="/cuenta/publicaciones/nueva" render={props => <NewPublication {...props} user={user} />} />
        <Route path="/cuenta/publicaciones/:id" component={DetailPublication} />
        <Route component={() => <h2>404 - Página no existe</h2>} />
      </Switch>
  </div>
)
const leftnavstyle = {
  width:"15vw",
  backgroundColor:"rgb(163, 92, 240)",
  display: 'flex',
  flexDirection: 'column',
  minHeight: "93vh",
  justifyContent: 'flex-start',
  alignItems: 'center'
}
let leftnavmenu = {
  color:"White",
  padding:"20px"
}