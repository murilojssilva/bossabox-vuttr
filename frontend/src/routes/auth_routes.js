import React from "react";
import Tools from "../pages/Tools";

import { BrowserRouter, Route, Switch } from "react-router-dom";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Tools}></Route>
      </Switch>
    </BrowserRouter>
  );
}
