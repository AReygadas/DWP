import React, { useEffect, useState } from "react";
import axios from "axios";
import { MDBCol, MDBContainer, MDBRow, MDBCardGroup, MDBInput } from "mdbreact";
import { Item } from "../../components/Products/prodcut";
import {
  Lista,
  Elemento,
  Title,
  SubTitle1,
  Span1,
  Searching,
  Aviso,
} from "../styles";
export const Products = () => {
  const [itemsS, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [noProd, setNoProd] = useState("");
  //Lanza la busqueda al presionar enter.
  const handleKeyPress = (e) => {
    console.log(e.target.value);
    if (e.key === "Enter") {
      setSearch(e.target.value);
    }
  };
  //Controla los checkbox de las categorias
  const handleCategory = (e) => {
    if (e.target.name == "modulo") {
      setSearch(e.target.name);
    }
    if (e.target.name == "paquete") {
      setSearch(e.target.name);
    }
    if (e.target.name == "plan") {
      setSearch(e.target.name);
    }
    if (e.target.name == "servicio") {
      setSearch(e.target.name);
    }
  };
  //lanza el evento de busqueda con los parametros del imput
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(
        "http://35.167.62.109/storeutags/catalogs/items/by_text/" + search
      );
      console.log(result);
      if (result.data.data) {
        setItems(result.data.data.items);
        setIsLoading(false);
        setNoProd(result.data.data.items.length + " Productos Encontrados");
        console.log(itemsS);
      } else {
        setNoProd("No se encontraron productos");
        setItems([]);
      }
    };
    fetchData();
  }, ["http://35.167.62.109/storeutags/catalogs/items/by_text/" + search]);

  return (
    <React.Fragment>
      <br />
      <br />
      <MDBRow center>
        <MDBCol size="6">
          <MDBInput label="Search" icon="search" onKeyDown={handleKeyPress} />
        </MDBCol>
      </MDBRow>
      <MDBRow center>
        {" "}
        <Aviso>{noProd}</Aviso>
      </MDBRow>
      <MDBContainer fluid>
        <MDBRow center>
          <Title>Productos</Title>
        </MDBRow>
        <MDBRow>
          <MDBCol md="2">
            <SubTitle1>Categorias</SubTitle1>
            <input type="checkbox" name="modulo" onChange={handleCategory} />
            <Span1>Modulo</Span1>
            <br />
            <input type="checkbox" name="paquete" onChange={handleCategory} />
            <Span1>Paquete</Span1>
            <br />
            <input type="checkbox" name="plan" onChange={handleCategory} />
            <Span1>Plan</Span1>
            <br />
            <input type="checkbox" name="servicio" onChange={handleCategory} />
            <Span1>Servicio</Span1>
          </MDBCol>
          <MDBCol md="10">
            {isLoading ? (
              <div>Loading ...</div>
            ) : (
              <Lista>
                {
                  //items != null &&
                  itemsS.map((it) => (
                    <Elemento key={it.product_id}>
                      <Item {...it} />
                    </Elemento>
                  ))
                }
              </Lista>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </React.Fragment>
  );
};
