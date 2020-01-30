import React, { Fragment } from "react";
import "../styles/InventoryOverview.css";

const InventoryItem = props => {
  return (
    <Fragment>
      <tr>
        <th scope='row' className='font-weight-normal'>
          {props.item._id}
        </th>
        <td>{props.item.name}</td>
        <td>{props.item.amount}</td>
        <td>{props.item.category}</td>
        <td>
          <i
            className='far fa-trash-alt af-icon'
            onClick={() => props.deleteItem(props.item._id)}
          ></i>
        </td>
        <td>
          <i className='far fa-edit af-icon'></i>
        </td>
      </tr>
    </Fragment>
  );
};

export default InventoryItem;
