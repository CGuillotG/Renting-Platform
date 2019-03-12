import React from "react";
import { Switch, Route , Redirect} from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Logout from "./components/Logout.jsx";
import Signup from "./components/Signup.jsx";
import Profile from "./components/Profile";
import ProfileEdit from "./components/ProfileEdit.jsx";
import Construction from "./components/Construction.jsx";
import Search from "./components/Search.jsx";

export default ({ isLogged, logIn , logOut, user}) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" render={(props=>isLogged?<Redirect to={'/'}/>:<Login {...props} logIn={logIn}/>)} />
    <Route path="/logout" render={(props=>isLogged? <Logout {...props} logOut={logOut}/>: <Redirect to={'/'}/>)} />
    <Route path="/signup" component={Signup} />
    <Route exact path="/profile" render={(props => <Profile {...props} user={user} />)} />
    <Route path="/profile/edit" render={(props => <ProfileEdit {...props} user={user} />)} />
    <Route path="/busqueda" component={Search} />

    <Route path="/construccion" component={Construction} />
    <Route
      component={() => {
        return <h2>404 - Página no existe</h2>;
      }}
    />
  </Switch>
);
