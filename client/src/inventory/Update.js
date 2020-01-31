import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Update = ({ match, history }) => {
  const [values, setValues] = useState({
    name: "",
    amount: 0,
    category: "",
    buttonText: "Submit"
  });
  const { id } = match.params;

  useEffect(() => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/inventory/update`,
      data: { id }
    })
      .then(response => {
        setValues({
          ...values,
          name: response.data.name,
          amount: response.data.amount,
          category: response.data.category
        });
      })
      .catch(error => {
        console.log("Error when getting items from database", error);
      });
  }, []);

  const { name, amount, category, buttonText } = values;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const redirectToHome = () => {
    history.push("/");
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({
      ...values,
      buttonText: "Submitting"
    });

    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/inventory/update`,
      data: { id, name, amount, category }
    })
      .then(response => {
        console.log("INVENTORY UPDATE SUCCESS", response);
        setValues({
          ...values,
          name: "",
          amount: 0,
          category: "",
          buttonText: "Submitted"
        });
        toast.success(
          response.data.message + ". You will be redirected to home"
        );
        setTimeout(redirectToHome, 3500);
      })
      .catch(error => {
        console.log("INVENTORY UPDATE ERROR", error.response.data);
        setValues({
          ...values,
          buttonText: "Submit"
        });
        toast.error(error.response.data.error);
      });
  };

  const updateInventoryForm = () => (
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
        <h1 className='my-3 text-center'>Update Item Inventory</h1>
        {updateInventoryForm()}
      </div>
    </Layout>
  );
};

export default Update;
