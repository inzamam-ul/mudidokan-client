import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = (props) => {
  const { name, price, weight, imgUrl, _id } = props.data;
  return (
    <div className="col-md-4 my-3">
      <Card className="shadow">
        <Card.Body>
          <Card.Title>
            <img className="product-img" src={imgUrl} alt="" />
          </Card.Title>
        </Card.Body>
        <Card.Footer className="border-0 bg-white">
          <Card.Title className="text-left text-capitalize fw-bold">
            {name} - {weight}kg
          </Card.Title>

          <div className="d-flex justify-content-between align-items-center">
            <h5 className="text-danger">{price} TK.</h5>
            <Link to={`/buy/${name}/${_id}`}>
              <button className="btn btn-danger">Buy Now</button>
            </Link>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Product;
