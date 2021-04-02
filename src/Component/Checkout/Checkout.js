import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const Checkout = () => {
  const productdetails = useParams();
  const productId = productdetails.id;
  const [checkout, setCheckout] = useState({});
  useEffect(() => {
    axios
      .get(`https://mudi-dokan.herokuapp.com/singleProduct/${productId}`)
      .then((res) => {
        setCheckout(res.data);
      });
  }, [productId]);
  const { name, price, weight, _id } = checkout;
  return (
    <div className="container text-left">
      <h3 className="mt-5">Checkout</h3>
      <table className="table table-light shadow text-left my-3 rounded bg-light">
        <thead className="table-secondary">
          <tr className="table-secondary">
            <th scope="col">Description</th>
            <th scope="col">Weight</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="text-capitalize" scope="row">
              {name}
            </th>
            <td>{weight}</td>
            <td>{price} Tk</td>
          </tr>

          <tr>
            <th colSpan="2" scope="row">
              Total
            </th>

            <td>
              <h6>{price} Tk</h6>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <Link to={`/checkout/${name}/${_id}`}>
          <button
            className="btn btn-outline-secondary float-right mt-3 cancle"
            type="button"
          >
            Cheackout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
