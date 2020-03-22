import React from "react";
import { Layout } from "antd";
import SideBar from "components/Sidebar";

import "./style.scss";

const { Content } = Layout;

export default class OriginLayout extends React.Component {
  render() {
    return (
      <Layout className="root">
        <SideBar />
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {this.props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
