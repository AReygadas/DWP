import React, { useState } from "react";
import { MDBRow, MDBCol } from "mdbreact";
import { Imagen, Titulo, Parrafo, Precios, Fondo, Input } from "./styles";

export const CItem = ({
  images_small,
  long_description,
  price,
  product_id,
  quantity,
  short_description,
  sub_total,
  taxes,
  total,
  onChanche,
}) => {
  const [cantidad, setCantidad] = useState();

  function FormatNumber({ number }) {
    return (
      <Precios>
        {new Intl.NumberFormat("ES-MX", {
          style: "currency",
          currency: "MXN",
        }).format(number)}
      </Precios>
    );
  }

  const eliminarProducto = async (e) => {
    //si esta autenticado agraga el producto
    let data = {
      session_id: window.localStorage.getItem("session_id"),
      item_id: product_id,
    };
    try {
      let config = {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      let res = await fetch(
        "http://35.167.62.109/storeutags/cart/remove_item ",
        config
      );
      let json = await res.json();
      //console.log(json);
      if (json.status === "success") {
        onChanche();
      } else {
        swal({
          title: "Error",
          text: "Code not found !! " + json.error_code,
          icon: "error",
          buttons: "OK",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const actualizaProd = async (e) => {
    if (e.target.value == 0) {
      eliminarProducto();
    } else {
      let data = {
        session_id: window.localStorage.getItem("session_id"),
        item_id: product_id,
        item_quantity: e.target.value,
      };
      try {
        let config = {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
        let res = await fetch(
          "http://35.167.62.109/storeutags/cart/update_item",
          config
        );
        let json = await res.json();
        //console.log(json);
        if (json.status === "success") {
          onChanche();
        } else {
          swal({
            title: "Error",
            text: "Code not found !! " + json.error_code,
            icon: "error",
            buttons: "OK",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <React.Fragment>
      <Fondo>
        <MDBRow>
          <MDBCol size="auto">
            <Imagen src={images_small} />
          </MDBCol>
          <MDBCol>
            <Titulo>{short_description}</Titulo>
            <Parrafo>{long_description}</Parrafo>
          </MDBCol>
          <MDBCol
            //className="d-flex align-items-center justify-content-center"
            size="auto">
            <FormatNumber number={price} />
          </MDBCol>
          <MDBCol
            //className="d-flex align-items-center justify-content-center"
            size="auto">
            <Input
              type="number"
              onChange={actualizaProd}
              defaultValue={quantity}
            />
          </MDBCol>
          <MDBCol size="auto">
            <FormatNumber number={sub_total} />
            <br />
            <br />
            <button onClick={eliminarProducto}>Eliminar</button>
          </MDBCol>
        </MDBRow>
      </Fondo>
    </React.Fragment>
  );
};
