import React from "react";
import { Switch, Route , Redirect} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/user/Login";
import Logout from "./components/user/Logout";
import Signup from "./components/user/Signup";
import Construction from "./components/Construction";
import Search from "./components/products/Search";
import DetailProduct from "./components/products/DetailProduct";
import Categories from "./components/products/Categories";
import Category from "./components/products/Category";
import ProfileLayout from "./components/account/ProfileLayout";

export default ({ isLogged, logIn , logOut, user}) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" render={(props=>isLogged?<Redirect to={'/'}/>:<Login {...props} logIn={logIn}/>)} />
    <Route path="/logout" render={(props=>isLogged? <Logout {...props} logOut={logOut} />: <Redirect to={'/'}/>)} />
    <Route path="/signup" render={(props=>isLogged? <Redirect to={'/'}/> : <Signup history={props.history}/>)} />
    <Route path="/busqueda" component={Search} />
    <Route path="/producto/:id" component={DetailProduct} />
    <Route exact path="/categorias" component={Categories} />
    <Route path="/categorias/:category" component={Category} />
    
    <Route path="/cuenta" render={(props=>isLogged? <ProfileLayout {...props} user={user} history={props.history}/>: <Redirect to={'/login'}/>)} />

    <Route path="/construccion" component={Construction} />
    <Route component={() => <h2>404 - Página no existe</h2>}/>
  </Switch>
);
