import React, { useContext, useEffect, useState } from "react"; //libreria de reac y hooks para el control de el state y estado de la pagina
import { useHistory } from "react-router-dom"; //useHistory nos permite utilizar el arbol de navegacion del usuario
import { DataContext } from "../../Context"; //Importamos el context con las variables globales
import { MDBRow, MDBCol, MDBView } from "mdbreact";
import axios from "axios"; //axios nos ayuda a realizar peticiones al servidor donde no enviamos parametros
import {
  Html_Details,
  Titulo3,
  Parrafo,
  Presio,
  BtnCar,
  Cantidad,
  Miniatura,
  Titulo2,
} from "./styles"; //importamos los estilos personalizados de los componentes del styles.js
import swal from "sweetalert"; //nos permite lanzar alertas en formna de modal ya estilizadas

export const Detail = () => {
  const contxt = useContext(DataContext); //asignamos el contexto auna variable que podamos consumir
  const [isLoading, setIsLoading] = useState(false); // state para el control de carga de peticiones al servidor
  const [details, setDetails] = useState([]); //aqui almacenamos toda el json de la respuesta del servidor
  const [cantidad, setCantidad] = useState(1); // este state controla la cantidad que podemos comprar del mismo producto
  const [image, setImage] = useState("");
  const hist = useHistory(); //asignamos el useHistory a una variable que podamos consumir

  //funcion de control de carga y estado de la aplicaciondonde hacemos la peticion al servidor de los detalles del producto
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(
        "http://35.167.62.109/storeutags/catalogs/item_details/" + contxt.itemId
      );
      console.log(result);

      setDetails(result.data.data.items);
      setIsLoading(false);
      console.log(details);
    };
    fetchData();
  }, [
    "http://35.167.62.109/storeutags/catalogs/item_details/" + contxt.itemId,
  ]);
  //funcion que actualiza la cantidad cada vez que cambiamos el input de cantidad
  const hancleChange = (e) => {
    setCantidad(e.target.value);
  };
  //Funcion que agrega el producto al carrito
  const handleClick = async (e) => {
    if (contxt.IsAuth) {
      //si esta autenticado agraga el producto
      e.preventDefault();
      let data = {
        session_id: window.localStorage.getItem("session_id"),
        item_id: contxt.itemId,
        item_quantity: cantidad,
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
          "http://35.167.62.109/storeutags/cart/add_item",
          config
        );
        let json = await res.json();
        console.log(json);
        if (json.status === "success") {
          swal({
            title: "Item add",
            text: "Item add to cart !!",
            icon: "success",
            buttons: "OK",
          }).then((respuesta) => {
            hist.push("/");
          });
        } else {
          swal({
            title: "Error",
            text: "Code not found !! " + json.error_code,
            icon: "error",
            buttons: "OK",
          }).then((respuesta) => {});
        }
      } catch (error) {
        console.log(error);
      }
      contxt.contador(0);
    } else {
      //si no esta autenticado nos manda al loguin
      hist.push("/login");
    }
  };
  //variable que controla la imagen que se muestra
  const handleImage = (e) => {
    console.log(e);
    setImage(e);
  };
  //variable para la asignacion de key al map de la galeria del producto
  var z = 1;
  console.log(details);
  return (
    <React.Fragment>
      <br />
      <MDBRow center>
        <Titulo2>Detalles del Producto</Titulo2>
      </MDBRow>
      <br />
      {
        /* items != null && */
        details.map((it) => (
          <div key={it.product_id}>
            <MDBRow>
              <MDBCol md="1">
                {/*Aqui se mapean las imagenes miniatura del producto */}
                {it.images_gallery.map((gal) => (
                  <div key={(z = z + 1)}>
                    <Miniatura
                      src={gal.image}
                      alt="aligment"
                      onClick={() => handleImage(gal.image)}
                    />
                  </div>
                ))}
              </MDBCol>
              <MDBCol md="4">
                {/* Aqui se muestra la imagen principal del detalle del producto*/}
                <MDBView waves>
                  {image == "" ? (
                    <img src={it.images_large} className="img-fluid" alt="" />
                  ) : (
                    <img src={image} className="img-fluid" alt="" />
                  )}
                </MDBView>
              </MDBCol>
              {/* aqui se muestra el titulo y la descripcon del producto */}
              <MDBCol md="5">
                <Titulo3>{it.short_description}</Titulo3>
                <Parrafo>{it.long_description}</Parrafo>
                {/* Aqui se pinta el html del detalle a traves de    dangerouslySetInnerHTM  */}
                <Html_Details
                  dangerouslySetInnerHTML={{
                    __html: it.html_details,
                  }}></Html_Details>
              </MDBCol>
              {/* Esta columna muestra la cantidad, presio y botones del producto */}
              <MDBCol md="2">
                <Presio>$ {it.price * cantidad}</Presio>
                <Html_Details>Cantidad</Html_Details>
                <Cantidad
                  type="number"
                  name=""
                  value={cantidad}
                  id=""
                  onChange={hancleChange}
                />
                <br /> <br />
                <BtnCar onClick={handleClick}>Agregar al carrito</BtnCar>
                <br /> <br />
                <BtnCar>Comprar Ahora</BtnCar>
              </MDBCol>
            </MDBRow>
          </div>
        ))
      }
    </React.Fragment>
  );
};
