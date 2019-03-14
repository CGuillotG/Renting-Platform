import React from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import Profile from './Profile'
import ProfileEdit from './ProfileEdit'
import Rents from './Rents'
import Publications from './Publications'
import DetailRent from './DetailRent'
import DetailPublication from './DetailPublication'

export default ({ user }) => (
  <div style={{ display: 'flex' }}>
    <nav style={{ display: 'flex', flexDirection: 'column' }}>
      <NavLink activeStyle={{ fontWeight: 'bolder' }} exact to="/cuenta">
        Mi Perfil
      </NavLink>
      <NavLink activeStyle={{ fontWeight: 'bolder' }} to="/cuenta/rentas">
        Mis Rentas
      </NavLink>
      <NavLink activeStyle={{ fontWeight: 'bolder' }} to="/cuenta/publicaciones">
        Mis Publicaciones
      </NavLink>
    </nav>

    <Switch>
      <Route exact path="/cuenta" render={props => <Profile {...props} user={user} />} />
      <Route exact path="/cuenta/editar" render={props => <ProfileEdit {...props} user={user} />} />
      <Route exact path="/cuenta/rentas" render={props => <Rents {...props} user={user} />} />
      <Route path="/cuenta/rentas/:id" component={DetailRent} />
      <Route exact path="/cuenta/publicaciones" render={props => <Publications {...props} user={user} />} />
      <Route path="/cuenta/publicaciones/:id" component={DetailPublication} />
      <Route component={() => <h2>404 - Página no existe</h2>} />
    </Switch>
  </div>
)
