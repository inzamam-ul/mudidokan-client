import React from "react";
import { Card } from "react-bootstrap";

const SingleOrder = ({ data }) => {
  const { name, price, weight, imgUrl } = data.orderedProduct;
  return (
    <div className="col-md-3 my-3">
      <Card className="shadow">
        <Card.Body>
          <Card.Title>
            <img style={{ height: 140 }} src={imgUrl} alt="" />
          </Card.Title>
          <Card.Text>{data.date}</Card.Text>
        </Card.Body>
        <Card.Footer className="border-0 bg-white">
          <Card.Title className="text-left text-capitalize fw-bold">
            {name} - {weight}kg
          </Card.Title>

          <div className="d-flex justify-content-between align-items-center">
            <h5 className="text-danger">{price} TK.</h5>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default SingleOrder;
