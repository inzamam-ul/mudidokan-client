import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Product from "../Product/Product";

const Home = () => {
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5050/products")
      .then((response) => setProductData(response.data));
  }, []);
  return (
    <Container className="home">
      <Row>
        {productData.map((product) => {
          return <Product key={product._id} data={product} />;
        })}
      </Row>
    </Container>
  );
};

export default Home;
