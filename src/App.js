//Importar paginas, componentes y dependencias
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//Paginas
import Layout from "./Layout";
import SingUp from "./pages/SingUp";
import RecuperaPass from "./pages/RecuperaCuenta";
//Componentes
import { DataContext } from "./Context";
import { Login } from "./pages/LogIn";
import { Products } from "./pages/Products";
import { Detail } from "./pages/Details/Detail";
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
                <Route exact path="/" component={Products} />
                <Route exact path="/detail" component={Detail} />
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
                <Route exact path="/detail" component={Detail} />
                <Route exact path="/" component={Products} />
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
