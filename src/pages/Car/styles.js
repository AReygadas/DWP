import styled from "styled-components";

export const Resumen = styled.h1`
  text-align: center;
  margin-top: 25px;
  font-size: 1.2rem;
  color: #000000;
`;
export const Detalle = styled.h1`
  text-align: center;
  margin-top: 25px;
  font-size: 1rem;
  font-style: oblique;
  color: #000000;
`;
export const Fondo = styled.div`
  margin-top: 7px;
  padding: 15px;
  background-color: RGBA(250, 250, 250, 0.5);
`;
export const BtnCar = styled.button`
  box-shadow: inset 0px 1px 0px 0px #fce2c1;
  background: linear-gradient(to bottom, #ffc477 5%, #fb9e25 100%);
  background-color: #ffc477;
  border-radius: 6px;
  border: 1px solid #eeb44f;
  display: inline-block;
  cursor: pointer;
  color: #000000;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #cc9f52;

  &:hover {
    background: linear-gradient(to bottom, #fb9e25 5%, #ffc477 100%);
    background-color: #fb9e25;
  }
`;
