import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBTooltip,
} from "mdbreact";

export const Item = ({
  code,
  category,
  images_small,
  long_description,
  price,
  short_description,
  product_id,
}) => {
  return (
    <React.Fragment>
      <div
        className="p-2 bd-highlight col-example"
        style={{ maxWidth: "14em" }}>
        <MDBCard>
          <MDBCardImage className="img-fluid" src={images_small} waves />
          <MDBCardBody cascade className="text-center">
            <a href="#!" className="text-muted">
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
                  <span>Quick Look</span>
                </MDBTooltip>{" "}
                <MDBTooltip domElement placement="top">
                  <i className="grey-text fa fa-cart-plus" />
                  <span>Add to Whishlist</span>
                </MDBTooltip>
              </span>
            </MDBCardFooter>
          </MDBCardBody>
        </MDBCard>
      </div>
    </React.Fragment>
  );
};
