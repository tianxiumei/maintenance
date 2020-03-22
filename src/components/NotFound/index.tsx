import React from "react";
import { Card } from "antd";

import "./style.scss";

export default class NotFound extends React.Component<any, {}> {
  render() {
    return (
      <Card className="notFound">
        <div className="left">
          <h1>404</h1>
        </div>
      </Card>
    );
  }
}
