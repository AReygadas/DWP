import { MDBRow, MDBCol } from 'mdbreact';
import React, { useState, useEffect } from 'react';
import { Detalle, Fondo, Subti, Detalle2, Titulo2 } from './styles';
export const Pedidos = () => {
  const [detalles, setDetalles] = useState([]);

  useEffect(
    () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: window.localStorage.getItem('session_id'),
        }),
      };
      fetch('http://35.167.62.109/storeutags/order/get_orders', requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setDetalles(data.data.orders);
          console.log(data);
        });
    },
    [],

    console.log(detalles)
  );
  function FormatNumber({ number }) {
    return (
      <Detalle>
        {new Intl.NumberFormat('ES-MX', {
          style: 'currency',
          currency: 'MXN',
        }).format(number)}
      </Detalle>
    );
  }

  function FechaF({ fecha }) {
    var d = new Date(fecha);
    var options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return <Detalle>{d.toLocaleDateString('es-ES', options)}</Detalle>;
  }

  return (
    <React.Fragment>
      <br />
      <br />
      <br />
      <br />
      <MDBRow center>
        <Titulo2>Resumen de pedidos</Titulo2>
      </MDBRow>
      <MDBRow>
        <MDBCol size="2">
          <Subti>Fecha de Compra</Subti>
        </MDBCol>
        <MDBCol size="2">
          <Subti>Total</Subti>
        </MDBCol>
        <MDBCol size="2">
          <Subti>Método de pago</Subti>
        </MDBCol>
        <MDBCol size="1">
          <Subti>Estatus</Subti>
        </MDBCol>
        <MDBCol size="3">
          <Subti>Pedido</Subti>
        </MDBCol>
        <MDBCol size="2">
          <Subti>Detalles</Subti>
        </MDBCol>
      </MDBRow>

      {detalles.map((det) => (
        <Fondo key={det.order_id}>
          <MDBRow>
            <MDBCol size="2">
              <FechaF fecha={det.date_order} />
            </MDBCol>
            <MDBCol size="2">
              <FormatNumber number={det.total} />
            </MDBCol>
            <MDBCol size="2">
              <Detalle>PayPal</Detalle>
            </MDBCol>
            <MDBCol size="1">
              <Detalle>{det.status}</Detalle>
            </MDBCol>
            <MDBCol size="3">
              <Detalle>{det.paypal_order_id}</Detalle>
            </MDBCol>
            <MDBCol size="2">
              <Detalle2>Ver detalles</Detalle2>
            </MDBCol>
          </MDBRow>
        </Fondo>
      ))}
    </React.Fragment>
  );
};
