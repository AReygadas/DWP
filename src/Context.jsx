//Clase que maneja las variables globales y el Session Storage
import React, { createContext, useState, useEffect } from "react";
//Creo el contexto
export const DataContext = createContext();
//Funcion del contexto
export const DataProvider = ({ children }) => {
  const sessionValidate = async (e) => {
    let status = false; // Controla el estatus de logueo del usuario
    //asigno a una variable la session del Session Storage
    let id;
    if (IsChek) {
      console.log(IsChek);
      id = { session_id: window.localStorage.getItem("session_id") };
    } else {
      console.log(IsChek);
      id = { session_id: window.sessionStorage.getItem("session_id") };
    }

    try {
      //Configuracion para la peticion
      let config = {
        method: "POST", //metodo de la llamada a la API
        headers: {
          //Headers de la llamada estos nunca cambian
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id), //contenido json de la llamada. {"session_id":"654654894321" }
      };
      // Fetch de la llamada a la API
      let res = await fetch(
        "http://35.167.62.109/storeutags/security/ping",
        config
      );
      //Recibes la respuesta del fetch con los datos.
      let json = await res.json();
      //Imprime Json en consola
      console.log(json);
      // Valida si la respuesta fue exitosa
      if (json.status === "success") {
        //Cambia el estatus de logueo del usuario
        status = true;
        //Ventana modal con el mensaje de confirmacion
        /*  swal({
          title: "Welcome!!",
          text: json.data.customer.full_name,
          icon: "info",
          buttons: "Ok",
        }); */
      } else {
        //Enb caso de que la api mande mensaje de error regresa el modal de error
        swal({
          title: "Error",
          text: "An error has occurred !! - " + json.error_code,
          icon: "error",
          buttons: "Ok",
        });
      }
    } catch (error) {
      //Atrapa cualquier error no controlado por la api
      //Imprime en consola el error
      console.log(error);
    }
    //Actualiza el estatus de logueo del usuario
    setIsAuth(status);
  };
  //Hook para validar si se recordara al usuario
  const [IsChek, setIsChek] = useState(() => {
    if (window.localStorage.getItem("check") === null) {
      return false;
    } else {
      return window.localStorage.getItem("check");
    }
  });
  //Hook para controlar el estado del usuario
  const [IsAuth, setIsAuth] = useState(() => {
    //Aqui actualizas el estado del usuario.
    if (localStorage.getItem("session_id") === null) {
      console.log("wx,y,z");
    } else {
      return sessionValidate();
    }
  });
  //Hook para controlar y tomar el nombre del usuario del SessionStorage
  const [name, setName] = useState(() => {
    //Regreso el valor del nombre del sessionStorage
    if (IsChek) {
      return window.localStorage.getItem("full_name");
    } else {
      return window.sessionStorage.getItem("full_name");
    }
  });
  //Hook del state para controlar el producto seleccionado
  const [itemId, setItemId] = useState("");
  //Hook para controlar el contador de productos en el carrito
  const [counter, setCounter] = useState(0);
  // Son la variables globales que vamos en la aplicacion

  //Esta es la funcion que actualiza el carrito de compras y agrega el numero de items al icono
  useEffect(async () => {
    let data = {
      session_id: window.localStorage.getItem("session_id"),
    };
    try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      let res = await fetch(
        "http://35.167.62.109/storeutags/cart/get_details",
        config
      );
      let json = await res.json();
      console.log(json);
      if (json.status === "success") {
        setCounter(json.data.items_quantity);
      }
    } catch (error) {
      console.log(error);
    }
  });
  // llamada al ping de la API

  //estas son las variables y funciones que el usuario compartira de forma global
  const value = {
    //Variable del nombre de usuario
    name,
    //Metodo para guardar el nombre en sessionStorage
    activateName: (nam) => {
      setName(nam);
      //Guarda el nombre en sessionSotage
      if (IsChek) {
        return window.localStorage.setItem("full_name", nam);
      } else {
        return window.sessionStorage.setItem("full_name", nam);
      }
    },
    //Variable para validar si el usuario esta logueado
    IsAuth,
    //Metodo para guardar el session_id en sessionStorage
    activateAuth: (session_id) => {
      setIsAuth(true);
      if (IsChek) {
        return window.localStorage.setItem("session_id", session_id);
      } else {
        return window.sessionStorage.setItem("session_id", session_id);
      }
    },
    //Metodo para cerrar sesion
    removeAuth: () => {
      //Cambia el estado del usuario a false
      setIsAuth(false);
      //Borra el sessionStorage
      if (IsChek) {
        window.localStorage.removeItem("session_id");
        window.localStorage.removeItem("full_name");
        window.localStorage.removeItem("check");
      } else {
        window.sessionStorage.removeItem("session_id");
        window.sessionStorage.removeItem("full_name");
        window.sessionStorage.removeItem("check");
      }
    },
    //
    IsChek,
    acticateChek: (val) => {
      setIsChek(val);
      window.localStorage.setItem("check", val);
    },
    //Aqui se guarda el id del item seleccionado en la pantalla de productos
    itemId,
    idProducto: (product_id) => {
      setItemId(product_id);
    },
    //Esta variable controla el contador de items en el carrito
    counter,
    contador: (count) => {
      setCounter(count);
    },
  };
  //regresamos el Data Provider que envuelve a la aplicacion
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
