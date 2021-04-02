import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadProducts from "./LoadProducts/LoadProducts";

const ManageProduct = () => {
  const [productData, setProductData] = useState([]);
  const [productAction, setProductActoin] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5050/products")
      .then((response) => setProductData(response.data));
  }, [productAction]);
  return (
    <div>
      <h4 className="p-4">Manage Products</h4>
      <ol id="products" className="list-group list-group-numbered">
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
