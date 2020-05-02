import React from "react";
import { Layout, Button } from "antd";
import { computed } from "mobx";
import { isNull } from "lodash";
import SideBar from "components/Sidebar";
import bind from "utils/bind";
import routerStore from "services/router-store";
import { StorageName } from "../../../constants";

import "./style.scss";

const { Content, Footer } = Layout;

export default class OriginLayout extends React.Component {
  @computed
  get user() {
    const localeUser = localStorage.getItem(StorageName.User);
    return isNull(localeUser) ? null : JSON.parse(localeUser);
  }
  @bind
  logOut() {
    routerStore.push("/");
  }
  render() {
    const date = new Date();
    const time = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    return (
      <Layout className="root">
        <SideBar />
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              className="site-layout-background"
              style={{ padding: 10, minHeight: 360 }}
            >
              <div className="heade">
                <div>
                  输油公司维修投资计划信息管理系统
                  <span>
                    {isNull(this.user)
                      ? ""
                      : `   欢迎(${this.user.realname}) ${
                          this.user.roleID === 597 ? "管理员" : "普通用户"
                        }`}
                  </span>
                  <span className="time">现在是:{time}</span>
                </div>
                <div className="logout">
                  <Button
                    className="button"
                    type="primary"
                    onClick={this.logOut}
                  >
                    登出
                  </Button>
                </div>
              </div>
              {this.props.children}
            </div>
          </Content>
          <Footer className="footer">联系我们 关于我们 2020@输油公司”</Footer>
        </Layout>
      </Layout>
    );
  }
}
