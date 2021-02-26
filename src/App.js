import React, { Component } from "react"
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import {Login} from './pages/LogIn'
import SingUp from './pages/SingUp'
import RecuperaPass from './pages/RecuperaCuenta'
import { DataContext } from './Context'

class App extends Component {

  static contextType = DataContext;
  
  render() {
    const auth0 = this.context

    return (
      <React.Fragment>
        {auth0.IsAuth ? 
          <BrowserRouter>
            <Layout>
              <Switch>  
               <Redirect to='/'/>          
                <Route exact path = "/" component = {Home} /> 
              </Switch>
            </Layout> 
          </BrowserRouter>
        : 
          <BrowserRouter>
          <Layout>
              <Switch>
              <Redirect to='/login'/>  
                <Route exact path ="/recupera" component ={RecuperaPass } />
                <Route exact path = "/SingUp" component = {SingUp} /> 
                <Route exact path = "/login" component = {Login} /> 
                
              </Switch>
            </Layout> 
          </BrowserRouter>
        }     
        
    </React.Fragment>
    );
  }
}
export default App;
