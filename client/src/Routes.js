import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import Activate from "./auth/Activate";
import Private from "./core/Private";
import Admin from "./core/Admin";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Forgot from "./auth/Forgot";
import Reset from "./auth/Reset";
import CreateInventory from "./inventory/Create";
import UpdateInventory from "./inventory/Update";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={App} />
        <Route path='/signup' component={Signup} />
        <Route path='/signin' component={Signin} />
        <Route path='/auth/activate/:token' component={Activate} />
        <PrivateRoute path='/private' component={Private} />
        <AdminRoute path='/admin' component={Admin} />
        <Route path='/auth/password/forgot' component={Forgot} />
        <Route path='/auth/password/reset/:token' component={Reset} />

        <AdminRoute path='/inventory/create' component={CreateInventory} />
        <AdminRoute path='/inventory/update/:id' component={UpdateInventory} />
      </Switch>
    </Router>
  );
};

export default Routes;
