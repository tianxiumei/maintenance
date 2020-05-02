import React from "react";
import Button from "antd/es/button";
import { Form, Input } from "antd";
import bind from "utils/bind";
import { ILoginParams } from "apis/user/model";
import { login } from "apis/user";
import routerStore from "services/router-store";
import { StorageName } from "../../constants";

import "./style.scss";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default class Home extends React.Component {
  @bind
  onFinish(values: ILoginParams) {
    login(values).then((data) => {
      localStorage.setItem(StorageName.RoleID, JSON.stringify(data.roleID));
      routerStore.push("/main/maintenance/declare");
    });
  }
  @bind
  onFinishFailed() {}
  render() {
    return (
      <div className="login">
        <Form
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
    );
  }
}
