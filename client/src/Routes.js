import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={App} />
        <Route path='/signup' component={Signup} />
        <Route path='/signin' component={Signin} />
      </Switch>
    </Router>
  );
};

export default Routes;
