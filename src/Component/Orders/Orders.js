import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { UserContext } from "../../App";
import SingleOrder from "./SingleOrder";
import loadingGif from "../../images/Ring-Loading-1.gif";

const Orders = () => {
  const { loggedInUser } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loding, setLoading] = useState(false);
  const { email } = loggedInUser;
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://mudi-dokan.herokuapp.com/orders/${email}`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      });
  }, [email]);
  return (
    <Container>
      <h4 className="text-left p-3">You orderd: {orders.length} product</h4>
      {loding && <img className="home-gif" src={loadingGif} alt="" />}
      <Row>
        {orders.map((order) => {
          return <SingleOrder key={order._id} data={order} />;
        })}
      </Row>
    </Container>
  );
};

export default Orders;
