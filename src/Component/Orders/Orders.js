import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { UserContext } from "../../App";
import SingleOrder from "./SingleOrder";
import loadingGif from "../../images/Ring-Loading-1.gif";

const Orders = () => {
  const { loggedInUser } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const { email } = loggedInUser;
  useEffect(() => {
    axios
      .get(`https://mudi-dokan.herokuapp.com/orders/${email}`)
      .then((res) => setOrders(res.data));
  }, [email]);
  return (
    <Container>
      {orders.length === 0 && (
        <img className="home-gif" src={loadingGif} alt="" />
      )}
      <Row>
        {orders.map((order) => {
          return <SingleOrder key={order._id} data={order} />;
        })}
      </Row>
    </Container>
  );
};

export default Orders;
