import React, { useState, useContext } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBTooltip,
} from "mdbreact";
import { DataContext } from "../../Context";

export const Item = ({
  code,
  category,
  images_small,
  long_description,
  price,
  short_description,
  product_id,
}) => {
  const contxt = useContext(DataContext);
  const history = useHistory();

  const handleClick = () => {
    contxt.idProducto(product_id);
    console.log(product_id);
    history.push("/detail");
  };

  return (
    <React.Fragment>
      <div
        className="p-2 bd-highlight col-example"
        style={{ maxWidth: "20em" }}>
        <MDBCard>
          <div onClick={handleClick}>
            <MDBCardImage className="img-fluid" src={images_small} waves />
          </div>
          <MDBCardBody cascade className="text-center">
            <a className="text-muted">
              <h5>{category}</h5>
            </a>
            <MDBCardTitle>
              <strong>
                <a href="#!">{code}</a>
              </strong>
            </MDBCardTitle>
            <MDBCardText>{long_description}</MDBCardText>
            <MDBCardFooter className="px-1">
              <span className="float-left font-weight-bold">
                <strong>${price}</strong>
              </span>
              <span className="float-right">
                <MDBTooltip domElement placement="top">
                  <i className="grey-text fa fa-eye mr-3" />
                  <span>Vistazo rápido</span>
                </MDBTooltip>{" "}
                <MDBTooltip domElement placement="top">
                  <i className="grey-text fa fa-cart-plus" />
                  <span>Agragar al carito</span>
                </MDBTooltip>
              </span>
            </MDBCardFooter>
          </MDBCardBody>
        </MDBCard>
      </div>
    </React.Fragment>
  );
};
