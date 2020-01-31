import React, { useEffect, useState } from "react";
import Layout from "./core/Layout";
import axios from "axios";
import InventoryItem from "./inventory/InventoryItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Link, Redirect } from "react-router-dom";

const App = ({ history }) => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    getInventory();
  }, []);

  const getInventory = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/inventory`,
      data: { message: "Works fine" }
    })
      .then(response => {
        console.log("Response", response.data);
        setInventory(response.data);
      })
      .catch(error => console.log("Ups, an error occurred", error));
  };

  const deleteItem = id => {
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API}/inventory`,
      data: { id }
    })
      .then(() => {
        toast.success("You successfully deleted the item");
      })
      .catch(err => {
        toast.success(
          "Ups, you can't delete this item. Make sure you are logged in or try again."
        );
      });

    getInventory();
  };

  const editItem = id => {
    history.push(`/inventory/update/${id}`);
  };

  return (
    <Layout>
      <div className='col-md-10 mx-auto'>
        <h1 className='text-center my-5'>Inventory Overview</h1>
        <ToastContainer />
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Item ID</th>
              <th scope='col'>Item Name</th>
              <th scope='col'>Item Amount</th>
              <th scope='col'>Item Category</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => {
              return (
                <InventoryItem
                  key={item.name}
                  item={item}
                  deleteItem={deleteItem}
                  editItem={editItem}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default App;
