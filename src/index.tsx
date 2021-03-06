import React, { lazy, Suspense } from "react";
import { createBrowserHistory } from "history";
import ReactDOM from "react-dom";
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider } from "antd";
import { syncHistoryWithStore } from "mobx-react-router";
import { Router, Switch, Route } from "react-router-dom";
import routerStore from "services/router-store";
import * as serviceWorker from "./serviceWorker";

import "./index.scss";

const history = syncHistoryWithStore(createBrowserHistory(), routerStore);
const AsyncStartPage = lazy(() => import(`modules/Home`));
const AsyncStartMain = lazy(() => import(`modules/Main`));

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <Suspense fallback={<div>Loading...</div>}>
            <AsyncStartPage />
          </Suspense>
        </Route>
        <Route path="/main">
          <Suspense fallback={<div>Loading...</div>}>
            <AsyncStartMain />
          </Suspense>
        </Route>
      </Switch>
    </Router>
  </ConfigProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
