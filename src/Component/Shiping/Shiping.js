import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { UserContext } from "../../App";
import OrderPlaced from "./OrderPlaced";

const Shiping = () => {
  const { loggedInUser } = useContext(UserContext);
  const { id } = useParams();
  const [orderStatus, setOrderStatus] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  useEffect(() => {
    axios
      .get(`https://mudi-dokan.herokuapp.com/singleProduct/${id}`)
      .then((res) => {
        setSelectedProduct(res.data);
      });
  }, [id]);

  const { register, handleSubmit, errors } = useForm();
  //   console.log(loggedInUser);
  const onSubmit = (data) => {
    const newData = {
      email: loggedInUser.email,
      address: data,
      date: new Date().toUTCString(),
      orderedProduct: selectedProduct,
    };
    const url = "https://mudi-dokan.herokuapp.com/placeOrder";

    axios.post(url, newData).then((res) => {
      console.log(res.data);
      setOrderStatus(true);
    });
  };

  return (
    <>
      {orderStatus ? (
        <OrderPlaced selectedProduct={selectedProduct} />
      ) : (
        <div className="container">
          <h3 className="my-4">Shiping address</h3>
          <div className="bg-light shadow p-3 rounded text-left">
            <form
              className="my-3 p-3 rounded row gy-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="col-6 py-2">
                <label htmlFor="name">City</label>
                <br />
                <input
                  className="form-control"
                  id="city"
                  type="text"
                  name="city"
                  ref={register({ required: true })}
                />
                {errors.city && <p>This field is required</p>}
              </div>
              <div className="col-6 py-2">
                <label htmlFor="price">District</label>
                <br />
                <input
                  className="form-control"
                  id="district"
                  type="text"
                  name="district"
                  ref={register({ required: true })}
                />
                {errors.district && <p>This field is required</p>}
              </div>

              <div className="col-6 py-2">
                <label htmlFor="weight">Address</label>
                <br />
                <input
                  className="form-control"
                  id="address"
                  type="text"
                  name="address"
                  ref={register({ required: true })}
                />
                {errors.address && <p>This field is required</p>}
              </div>

              <div className="col-6 py-2">
                <input
                  className="rouded mt-5 shadow float-right"
                  type="submit"
                  value="Place Order"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Shiping;
