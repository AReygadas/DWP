import React, { useContext, useState, useEffect } from "react";
import { CItem } from "../../components/CarritoItem/Citem";
import { MDBBtn, MDBCol, MDBRow } from "mdbreact";
import { Resumen, Detalle, Fondo, BtnCar } from "./styles";
import { DataContext } from "../../Context";
import { useHistory, Link } from "react-router-dom";

export const CarItem = () => {
  const [detalles, setDetalles] = useState([]);
  const [compra, setCompra] = useState([]);
  const [actualiza, setActualiza] = useState(0);
  const contxt = useContext(DataContext);
  const hist = useHistory();

  useEffect(
    () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: window.localStorage.getItem("session_id"),
        }),
      };
      fetch("http://35.167.62.109/storeutags/cart/get_details", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setCompra(data.data);
          setDetalles(data.data.items);
        });
    },
    []
    /* console.log(detalles),
    console.log(compra) */
  );

  const handleChange = async (e) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: window.localStorage.getItem("session_id"),
      }),
    };
    await fetch(
      "http://35.167.62.109/storeutags/cart/get_details",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setCompra(data.data);
        setDetalles(data.data.items);
      });
    console.log(compra);
    contxt.contador(0);
  };

  function FormatNumber({ number }) {
    return (
      <Detalle>
        {new Intl.NumberFormat("ES-MX", {
          style: "currency",
          currency: "MXN",
        }).format(number)}
      </Detalle>
    );
  }

  return (
    <React.Fragment>
      <br />
      <br />
      <MDBRow>
        <MDBCol size="9">
          {detalles
            ? detalles.map((det) => (
                <CItem onChanche={handleChange} {...det} key={det.product_id} />
              ))
            : hist.push("/")}
        </MDBCol>
        <MDBCol size="3">
          <Fondo>
            <MDBRow className="d-flex align-items-center justify-content-center">
              <Resumen>Resumen del Carrito</Resumen>
              <MDBCol size="6">
                <Detalle>Sub Total</Detalle>
                <Detalle>IVA</Detalle>
                <Detalle>Total</Detalle>
              </MDBCol>
              <MDBCol size="6">
                <FormatNumber number={compra.sub_total} />
                <FormatNumber number={compra.taxes} />
                <FormatNumber number={compra.total} />
              </MDBCol>
            </MDBRow>
            <br />
            <MDBRow center>
              <Link to="/checkout">
                <BtnCar>Proceder al pago</BtnCar>
              </Link>
            </MDBRow>
          </Fondo>
        </MDBCol>
      </MDBRow>
      )
    </React.Fragment>
  );
};
