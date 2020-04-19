import React from "react";
import { Route, Switch } from "react-router-dom";
import Statistical from "./Statistical";
import Report from "./Report";

export default class Investment extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/main/investment/statistical" component={Statistical} />
        <Route path="/main/investment/report" component={Report} />
      </Switch>
    );
  }
}
