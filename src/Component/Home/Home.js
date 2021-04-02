import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Product from "../Product/Product";
import loadingGif from "../../images/Ring-Loading-1.gif";
import "./Home.css";

const Home = () => {
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    axios
      .get("https://mudi-dokan.herokuapp.com/products")
      .then((response) => setProductData(response.data));
  }, []);
  return (
    <Container className="home">
      {productData.length === 0 && (
        <img className="home-gif" src={loadingGif} alt="" />
      )}
      <Row>
        {productData.map((product) => {
          return <Product key={product._id} data={product} />;
        })}
      </Row>
    </Container>
  );
};

export default Home;
