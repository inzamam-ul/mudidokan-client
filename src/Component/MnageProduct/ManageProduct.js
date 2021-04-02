import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadProducts from "./LoadProducts/LoadProducts";
import loadingGif from "../../images/Ring-Loading-1.gif";
const ManageProduct = () => {
  const [productData, setProductData] = useState([]);
  const [productAction, setProductActoin] = useState("");
  useEffect(() => {
    axios
      .get("https://mudi-dokan.herokuapp.com/products")
      .then((response) => setProductData(response.data));
  }, [productAction]);
  return (
    <div>
      <h4 className="p-4">Manage Products</h4>
      {productData.length === 0 && (
        <img className="gif" src={loadingGif} alt="" />
      )}
      <ol id="products" className="list-group p-2 list-group-numbered">
        {productData.map((product) => {
          return (
            <LoadProducts
              key={product._id}
              setProductActoin={setProductActoin}
              data={product}
            />
          );
        })}
      </ol>
    </div>
  );
};

export default ManageProduct;
