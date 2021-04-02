import axios from "axios";
import React, { useState } from "react";
import Update from "../Update/Update";
import "./LoadProducts.css";

const LoadProducts = (props) => {
  const [currentData, setCurrentData] = useState(props.data);
  const { name, price, weight, imgUrl, _id } = currentData;
  const [updateStatus, setUpdatestatus] = useState(false);

  const setProductActoin = props.setProductActoin;

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:5050/deleteProduct/${id}`).then((res) => {
      console.log(res.data);
      setProductActoin(id);
    });
  };
  const loadSingleProduct = (id) => {
    setUpdatestatus(true);
    console.log(id);
  };
  return (
    <>
      <li className="list-group-item rounded border mt-1 d-flex justify-content-between align-items-start">
        {!updateStatus ? (
          <>
            <img className="manage-image" src={imgUrl} alt="" />
            <div className="ms-2 text-left me-auto">
              <h6 className="fw-bold text-capitalize">{name}</h6>
              <p className="fw-bold m-0">Price: {price} tk</p>
              <p className="fw-bold">Weight: {weight} kg</p>
            </div>
            <div className="ms-auto text-right">
              <p className="m-0">
                <button
                  id="delete"
                  onClick={() => deleteProduct(`${_id}`)}
                  className="btn mx-3 btn-warning"
                >
                  Delete
                </button>
                <button
                  id="update"
                  onClick={() => loadSingleProduct(`${_id}`)}
                  className="btn btn-success"
                >
                  Update
                </button>
              </p>
            </div>
          </>
        ) : (
          <Update
            setProductActoin={setProductActoin}
            setCurrentData={setCurrentData}
            setUpdatestatus={setUpdatestatus}
            id={_id}
          />
        )}
      </li>
    </>
  );
};

export default LoadProducts;
