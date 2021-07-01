import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoUrlPage from "./components/NoUrlPage";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route component={NoUrlPage} ></Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
