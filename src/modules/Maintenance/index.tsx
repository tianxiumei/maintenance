import React from "react";
import { Route, Switch } from "react-router-dom";
import Declare from "./Declare";

export default class Maintenance extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/main/maintenance/declare" component={Declare}></Route>
      </Switch>
    );
  }
}
