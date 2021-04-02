import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import lodinggif from "../../images/Ring-Loading-1.gif";
import "./AddProduct.css";

const AddProduct = () => {
  const { register, handleSubmit, errors } = useForm();
  const [imgUploaded, setImageUploaded] = useState(null);

  const [imgUrl, setImageUrl] = useState(null);

  const onSubmit = (data, e) => {
    const newData = { ...data, imgUrl };
    console.log(newData);
    const url = "https://mudi-dokan.herokuapp.com/addProduct";

    axios.post(url, newData).then((res) => {
      console.log(res.data);

      e.target.reset();
      setImageUploaded(null);
    });
  };

  const handleImageUpload = (event) => {
    console.log(event.target.files);
    const imageData = new FormData();
    imageData.set("key", "eb6147fa916a481c3d9f2b59dab1909f");
    imageData.append("image", event.target.files[0]);
    setImageUploaded("loading");

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        setImageUrl(response.data.data.display_url);
        setImageUploaded(true);
        this.form.reset();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <h4 className="p-4">Add Product</h4>
      <div className="bg-light p-3 rounded text-left">
        <form
          className="my-3 p-3 rounded row gy-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col-6 py-2">
            <label htmlFor="name">Product name</label>
            <br />
            <input
              className="form-control"
              id="name"
              type="text"
              name="name"
              ref={register({ required: true })}
            />
            {errors.name && <p>This field is required</p>}
          </div>
          <div className="col-6 py-2">
            <label htmlFor="price">Price</label>
            <br />
            <input
              className="form-control"
              id="price"
              type="text"
              name="price"
              ref={register({ required: true })}
            />
            {errors.price && <p>This field is required</p>}
          </div>

          <div className="col-6 py-2">
            <label htmlFor="weight">Weight</label>
            <br />
            <input
              className="form-control"
              id="weight"
              type="text"
              name="weight"
              ref={register({ required: true })}
            />
            {errors.weight && <p>This field is required</p>}
          </div>

          <div className="col-6 py-2">
            <label htmlFor="photo">Add a photo</label>
            <br />
            <input
              onChange={handleImageUpload}
              type="file"
              id="photo"
              name="photo"
            />
            {/* <img src={lodinggif} alt="/" /> */}
            {imgUploaded === true && <span>✔️</span>}
            {imgUploaded === "loading" && (
              <img className="gif-upload" src={lodinggif} alt="/" />
            )}
          </div>

          <div className="p-3">
            <input className="rouded" type="submit" value="SAVE" />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
