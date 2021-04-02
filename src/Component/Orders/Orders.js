import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { UserContext } from "../../App";
import SingleOrder from "./SingleOrder";

const Orders = () => {
  const { loggedInUser } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const { email } = loggedInUser;
  useEffect(() => {
    axios
      .get(`http://localhost:5050/orders/${email}`)
      .then((res) => setOrders(res.data));
  }, [email]);
  return (
    <Container>
      <Row>
        {orders.map((order) => {
          return <SingleOrder key={order._id} data={order} />;
        })}
      </Row>
    </Container>
  );
};

export default Orders;
