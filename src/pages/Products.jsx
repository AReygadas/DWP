import React, { useEffect, useState } from "react";
import axios from "axios";
import { MDBCol, MDBContainer, MDBRow, MDBCardGroup, MDBInput } from "mdbreact";
import { Item } from "../components/Products/prodcut";
import { Ddiv } from "./styles";
export const Products = () => {
  const [items, setItems] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleKeyPress = (e) => {
    console.log(e.target.value);
    if (e.key === "Enter") {
      setSearch(e.target.value);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const result = await axios(
        "http://35.167.62.109/storeutags/catalogs/items/by_text/" + search
      );

      setItems(result.data.data.items);
      setIsLoading(false);
      console.log(result);
      console.log(items);
    };

    fetchData();
  }, ["http://35.167.62.109/storeutags/catalogs/items/by_text/" + search]);

  return (
    <React.Fragment>
      <MDBRow center>
        <MDBInput
          label="Material input"
          name="search"
          onKeyDown={handleKeyPress}
        />
      </MDBRow>
      <MDBContainer fluid>
        <MDBRow center>
          <h1>Productos</h1>
        </MDBRow>
        <MDBRow>
          <MDBCol md="2">
            <h1>Cate3gorias</h1>
          </MDBCol>
          <MDBCol md="10">
            <div>
              {isLoading ? (
                <div>Loading ...</div>
              ) : (
                <ul>
                  {items.map((it) => (
                    <li key={it.product_id}>
                      <Item {...it} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </React.Fragment>
  );
};
