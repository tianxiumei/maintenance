import React from "react";
import { Route, Switch } from "react-router-dom";
import Declare from "./Declare";
import Project from "./Project";
import Plan from "./Plan";

export default class Maintenance extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/main/maintenance/declare" component={Declare} />
        <Route path="/main/maintenance/project" component={Project} />
        <Route path="/main/maintenance/plan" component={Plan} />
      </Switch>
    );
  }
}
