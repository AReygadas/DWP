import React, { Component } from "react"
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import Login from './pages/LogIn'
import SingUp from './pages/SingUp'
import RecuperaPass from './pages/RecuperaCuenta'


class App extends Component {
  render() {
    return (
      
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path ="/recupera" component ={RecuperaPass } />
            <Route exact path = "/SingUp" component = {SingUp} /> 
            <Route exact path = "/login" component = {Login} /> 
            <Route exact path = "/" component = {Home} /> 

          </Switch>
        </Layout> 
      </BrowserRouter>
     
    );
  }
}

export default App;
