import React from "react";
import Login from "../pages/Login";

import { BrowserRouter, Route, Switch } from "react-router-dom";

export default function AuthRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Login}></Route>
      </Switch>
    </BrowserRouter>
  );
}
