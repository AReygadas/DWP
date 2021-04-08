import React from 'react';
import ReactDOM from 'react-dom';
import swal from 'sweetalert';

const PayPalButton = paypal.Buttons.driver('react', { React, ReactDOM });

export default class PaypalCheckoutButton extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  state = {};

  createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: Math.round(this.props.order),
          },
        },
      ],
    });
  }

  handleSubmit = async (details) => {
    console.log(details);
    let requestBody = {
      session_id: window.localStorage.getItem('session_id'),
      paypal_payment_details: details,
    };
    console.log(requestBody);
    try {
      let config = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      };
      let res = await fetch(
        'http://35.167.62.109/storeutags/order/create',
        config
      );
      let json = await res.json();
      if (json.status == 'success') {
        console.log('www', json);
        window.location = '/pedidos';
      }
    } catch (error) {
      console.log(error);
    }
  };
  async onError(data, actions) {
    swal({
      title: 'Error',
      text: 'Ocurrio un error vuelve a intentarlo!!',
      icon: 'error',
      buttons: 'Aceptar',
    });
  }
  async onApprove(data, actions) {
    let DetalleC;
    swal({
      title: 'Pago Aplicado',
      text: 'El pago se proceso exitosamente!!',
      icon: 'success',
      buttons: 'Aceptar',
    });
    const datos = await actions.order.capture().then(function (details) {
      DetalleC = details;
    });
    this.handleSubmit(DetalleC);
  }

  render() {
    return (
      <PayPalButton
        createOrder={(data, actions) => this.createOrder(data, actions)}
        onApprove={(data, actions) => this.onApprove(data, actions)}
        onError={(data, actions) => this.onError(data, actions)}
      />
    );
  }
}
