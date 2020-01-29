import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { isAuth } from "../auth/helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Create = () => {
  const [values, setValues] = useState({
    name: "iPhone",
    amount: 20,
    category: "Electronics",
    buttonText: "Submit"
  });

  const { name, amount, category, buttonText } = values;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({
      ...values,
      buttonText: "Submitting"
    });

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/inventory/create`,
      data: { name, amount, category }
    })
      .then(response => {
        console.log("INVENTORY CREATION SUCCESS", response);
        setValues({
          ...values,
          name: "",
          amount: 0,
          category: "",
          buttonText: "Submitted"
        });
        toast.success(response.data.message);
      })
      .catch(error => {
        console.log("INVENTORY CREATION ERROR", error.response.data);
        setValues({
          ...values,
          buttonText: "Submit"
        });
        toast.error(error.response.data.error);
      });
  };

  const createInventoryForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Item name</label>
        <input
          onChange={handleChange("name")}
          value={name}
          type='text'
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Amount</label>
        <input
          onChange={handleChange("amount")}
          value={amount}
          type='number'
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Category</label>
        <input
          onChange={handleChange("category")}
          value={category}
          type='text'
          className='form-control'
        />
      </div>
      <div>
        <button className='btn btn-primary' onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className='col-6 mx-auto'>
        <ToastContainer />
        <h1 className='my-3 text-center'>Create New Inventory</h1>
        {createInventoryForm()}
      </div>
    </Layout>
  );
};

export default Create;
