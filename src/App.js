//Importar paginas, componentes y dependencias
import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
//Paginas
import Layout from "./Layout";
import Home from "./pages/Home";
import SingUp from "./pages/SingUp";
import RecuperaPass from "./pages/RecuperaCuenta";
//Componentes
import { DataContext } from "./Context";
import { Login } from "./pages/LogIn";
import EcommercePage from "./pages/ecomerce";
//Clase que controla la navegacion en la app
class App extends Component {
  //Permite consumir el Context con los datos globales
  static contextType = DataContext;

  render() {
    //asigno a una constante las variables globales
    const auth0 = this.context;
    //Elementos a renderizar
    return (
      //Devuelve un solo componente <div><div>
      <React.Fragment>
        {/* Validamos que el usuario este autenticado == if() 
        ? es verdadero
        : es falso
      */}
        {auth0.IsAuth ? (
          <BrowserRouter>
            <Layout>
              <Switch>
                <Route exact path="/" component={EcommercePage} />
              </Switch>
            </Layout>
          </BrowserRouter>
        ) : (
          <BrowserRouter>
            <Layout>
              <Switch>
                <Route exact path="/recupera" component={RecuperaPass} />
                <Route exact path="/SingUp" component={SingUp} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={Home} />
                {/* Pagina principal al cargar */}
              </Switch>
            </Layout>
          </BrowserRouter>
        )}
      </React.Fragment>
    );
  }
}
//exportamos el BrowserRouter
export default App;
