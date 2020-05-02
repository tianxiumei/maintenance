import React from "react";
import Button from "antd/es/button";
import { Form, Input } from "antd";
import { computed } from "mobx";
import bind from "utils/bind";
import { ILoginParams } from "apis/user/model";
import { login } from "apis/user";
import routerStore from "services/router-store";
import home from "images/home.jpg";
import { StorageName } from "../../constants";

import "./style.scss";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default class Home extends React.Component {
  @computed
  get user() {
    const localeUser = localStorage.getItem(StorageName.User);
    return localeUser ? JSON.parse(localeUser) : null;
  }
  @bind
  onFinish(values: ILoginParams) {
    login(values).then((data) => {
      localStorage.setItem(StorageName.User, JSON.stringify(data));
      routerStore.push("/main/maintenance/declare");
    });
  }
  @bind
  onFinishFailed() {}
  render() {
    return (
      <div className="login">
        <div className="heade">
          <h2>输油公司维修投资计划信息管理系统</h2>
        </div>
        <div className="content" style={{ background: `url(${home})` }}>
          <Form
            className="form"
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish as any}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: "请填写用户名!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请填写密码" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="footer">
          <div className="top">
            <div className="features-left-item">
              <h3>多平台融合</h3>
              <p>
                身份认证安全
                <br />
                多系统数据一站式浏览
              </p>
            </div>
            <div className="features-left-item">
              <h3>统一登录</h3>
              <p>
                一个登录入口
                <br />
                一个网址，一个账号，一次登录
              </p>
            </div>
            <div className="features-left-item">
              <h3>流程引擎</h3>
              <p>
                一站式申请
                <br />
                审批、办结、办事流程便捷高效
              </p>
            </div>
            <div className="features-left-item">
              <h3>一站式服务</h3>
              <p>
                数据多跑路
                <br />
                人员少跑腿，一键式办理
              </p>
            </div>
          </div>
          <div className="right">
            <div>
              <a href="http://www.cnpc.com.cn/cnpc/index.shtml">
                中国石油天然气集团有限公司
              </a>
            </div>
            <div>
              <a href="http://www.sinopec.com">中国石油化工集团有限公司</a>
            </div>
            <div>
              <a href="https://www.cnooc.com.cn/">中国海洋石油集团有限公司</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
