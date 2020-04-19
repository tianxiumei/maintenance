import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import NotFound from "components/NotFound";
import OriginLayout from "./Layout";

const AsyncMaintenance = lazy(() => import(`modules/Maintenance`));
const AsyncInvestment = lazy(() => import(`modules/Investment`));
export default class Main extends React.Component {
  render() {
    return (
      <OriginLayout>
        <Suspense fallback={<div className="pageLoading">加载中</div>} />
        <Switch>
          {/* <Route path="/main" component={AsyncMaintenance} /> */}
          <Route path="/main/maintenance" component={AsyncMaintenance} />

          <Route path="/main/investment" component={AsyncInvestment} />
          <Route path="/main" component={NotFound} />
        </Switch>
      </OriginLayout>
    );
  }
}
