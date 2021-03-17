import React, { useContext } from "react";
import { MDBIcon, MDBContainer } from "mdbreact";
import { Couter } from "./styles";
import { DataContext } from "../../Context";
export const CounterCart = () => {
  const contxt = useContext(DataContext);
  return (
    <MDBContainer>
      <MDBIcon icon="cart-arrow-down" size="2x" />
      <Couter className="counter">{contxt.counter}</Couter>
    </MDBContainer>
  );
};
