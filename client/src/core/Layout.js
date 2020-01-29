import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signout } from "../auth/helpers";

const Layout = ({ children, match, history }) => {
  const isActive = path => {
    if (match.path === path) {
      return { color: "#000" };
    } else {
      return { color: "#fff" };
    }
  };

  const nav = () => (
    <ul className='nav nav-tabs bg-secondary'>
      <li className='nav-item'>
        <Link to='/' className='nav-link' style={isActive("/")}>
          Home
        </Link>
      </li>

      {!isAuth() && (
        <Fragment>
          <li className='nav-item'>
            <Link to='/signin' className='nav-link' style={isActive("/signin")}>
              Signin
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/signup' className='nav-link' style={isActive("/signup")}>
              Signup
            </Link>
          </li>
        </Fragment>
      )}

      {isAuth() && isAuth().role === "admin" && (
        <li className='nav-item'>
          <Link to='/admin' style={isActive("/admin")} className='nav-link'>
            {isAuth().name}
          </Link>
        </li>
      )}

      {isAuth() && isAuth().role === "subscriber" && (
        <li className='nav-item'>
          <Link to='/private' style={isActive("/private")} className='nav-link'>
            {isAuth().name}
          </Link>
        </li>
      )}

      {isAuth() && (
        <li className='nav-item'>
          <span
            className='nav-link'
            onClick={() => {
              signout(() => history.push("/"));
            }}
            style={{ cursor: "pointer", color: "#fff" }}
          >
            Signout
          </span>
        </li>
      )}

      {isAuth() && isAuth().role === "admin" && (
        <li className='nav-item'>
          <Link
            to='/inventory/create'
            style={isActive("/inventory/create")}
            className='nav-link'
          >
            New Inventory
          </Link>
        </li>
      )}
    </ul>
  );

  return (
    <Fragment>
      {nav()}
      <div className='container'>{children}</div>
    </Fragment>
  );
};

export default withRouter(Layout);
