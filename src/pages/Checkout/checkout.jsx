import { MDBRow, MDBCol } from 'mdbreact';
import React, { useState, useEffect } from 'react';
import { Fondo, Titulo4, Subtitulo8, Desc } from './styles';
import PaypalCheckoutButton from '../../components/PaypalButton/PaypalCheckout';
export const Checkout = () => {
  const [detalles, setDetalles] = useState([]);
  const [compra, setCompra] = useState([]);

  useEffect(
    () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: window.localStorage.getItem('session_id'),
        }),
      };
      fetch('http://35.167.62.109/storeutags/cart/get_details', requestOptions)
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

  function FormatNumber({ number }) {
    return (
      <Desc>
        {new Intl.NumberFormat('ES-MX', {
          style: 'currency',
          currency: 'MXN',
        }).format(number)}
      </Desc>
    );
  }
  return (
    <React.Fragment>
      <br />
      <br />
      <br />
      <MDBRow center>
        <Titulo4>Resumen de tu pedido</Titulo4>;
      </MDBRow>
      <MDBRow>
        <MDBCol size="6">
          <Fondo>
            <Subtitulo8>Resumen de productos y servicios</Subtitulo8>
            {detalles.map((det) => (
              <Desc>
                {det.quantity} x {det.short_description}
              </Desc>
            ))}
          </Fondo>
        </MDBCol>
        <MDBCol size="3">
          <Fondo>
            <MDBRow className="d-flex align-items-center justify-content-center">
              <Subtitulo8>Resumen del Carrito</Subtitulo8>
              <MDBCol size="6">
                <Desc>Sub Total</Desc>
                <Desc>IVA</Desc>
                <Desc>Total</Desc>
              </MDBCol>
              <MDBCol size="6">
                <FormatNumber number={compra.sub_total} />
                <FormatNumber number={compra.taxes} />
                <FormatNumber number={compra.total} />
              </MDBCol>
            </MDBRow>
          </Fondo>
        </MDBCol>
        <MDBCol size="3">
          <Fondo>
            <Subtitulo8>Metodos de Pago</Subtitulo8>
            <PaypalCheckoutButton order={compra.total} />
          </Fondo>
        </MDBCol>
      </MDBRow>
    </React.Fragment>
  );
};
