import React from "react";
import { Form, Input, Button } from "antd";
import { isNull } from "lodash";
import { IUser } from "apis/user/model";

const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 15,
  },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface IFormProps {
  user: IUser | null;
  onCancle: () => void;
  onSubmit: (user: IUser) => void;
}

export const CreateForm = (props: IFormProps) => {
  const [form] = Form.useForm();
  const { onCancle, onSubmit, user } = props;
  function handleCancle() {
    onCancle();
    form.resetFields();
  }

  function onFinish(values: IUser) {
    onSubmit(values);
    handleCancle();
  }

  return (
    <Form
      form={form}
      initialValues={
        !isNull(user)
          ? {
              ...user,
            }
          : undefined
      }
      name="dynamic_rule"
      labelAlign="left"
      onFinish={onFinish as any}
    >
      <Form.Item
        {...formItemLayout}
        name="username"
        label="用户名"
        rules={[
          {
            required: true,
            message: "请填写用户名",
          },
        ]}
      >
        <Input disabled={!!props.user} placeholder="请填写用户名" />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "请填写真名",
          },
        ]}
        {...formItemLayout}
        name="realname"
        label="真名"
      >
        <Input placeholder="请填写真名" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: "请填写密码",
          },
        ]}
      >
        <Input placeholder="请填写密码" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="partment"
        label="部门"
        rules={[
          {
            required: true,
            message: "请填写部门",
          },
        ]}
      >
        <Input placeholder="请填写部门" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="roleID"
        label="角色ID"
        rules={[
          {
            required: true,
            message: "请填写角色ID",
          },
        ]}
      >
        <Input type="number" placeholder="角色ID" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label="状态"
        name="status"
        rules={[
          {
            required: true,
            message: "请填写状态",
          },
        ]}
      >
        <Input placeholder="请填写状态" />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          确认
        </Button>
        <Button
          style={{ marginLeft: "10px" }}
          htmlType="button"
          onClick={handleCancle}
        >
          取消
        </Button>
      </Form.Item>
    </Form>
  );
};
