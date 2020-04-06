import React from "react";
import { Form, Input, Button, DatePicker } from "antd";
import { isNull } from "lodash";
import moment from "moment";
import { IDecare } from "../../../../apis/maintenance/model";

const dateFormat = "YYYY-MM-DD";

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 15,
  },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface IFormProps {
  declare: IDecare | null;
  onCancle: () => void;
  onSubmit: (declare: IDecare) => void;
}

export const CreateForm = (props: IFormProps) => {
  const [form] = Form.useForm();
  const { onCancle, onSubmit, declare } = props;
  function handleCancle() {
    onCancle();
    form.resetFields();
  }

  function onFinish(values: IDecare) {
    onSubmit(values);
    handleCancle();
  }

  return (
    <Form
      form={form}
      initialValues={
        !isNull(declare)
          ? { ...declare, regDate: moment(declare.regDate, dateFormat) }
          : undefined
      }
      name="dynamic_rule"
      labelAlign="left"
      onFinish={onFinish as any}
    >
      <Form.Item
        {...formItemLayout}
        name="proName"
        label="名称"
        rules={[
          {
            required: true,
            message: "请填写名称",
          },
        ]}
      >
        <Input placeholder="请填写名称" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="reportOrg"
        label="填报单位
        "
        rules={[
          {
            required: true,
            message: "请填写填报单位",
          },
        ]}
      >
        <Input
          placeholder="请填写填报单位
"
        />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="measureUnit"
        label="计量单位"
        rules={[
          {
            required: true,
            message: "请填写计量单位",
          },
        ]}
      >
        <Input placeholder="请填写计量单位" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="typeName"
        label="类别名称"
        rules={[
          {
            required: true,
            message: "请填写类别名称!",
          },
        ]}
      >
        <Input placeholder="请填写类别名称" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="superClass"
        label="父类"
        rules={[
          {
            required: true,
            message: "请填写名称",
          },
        ]}
      >
        <Input placeholder="请填写名称" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="subClass"
        label="子类名称"
        rules={[
          {
            required: true,
            message: "请填写子类名称",
          },
        ]}
      >
        <Input placeholder="请填写计量单位" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="regDate"
        label="日期"
        rules={[
          {
            required: true,
            message: "请填写日期",
          },
        ]}
      >
        <DatePicker placeholder="选择日期" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="fix" label="修理内容">
        <Input />
      </Form.Item>
      <Form.Item {...formItemLayout} name="remark" label="备注">
        <Input />
      </Form.Item>

      <Form.Item {...formItemLayout} name="nowOrg" label="当前处理部门">
        <Input type="number" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="beforeOrg" label="之前处理部门">
        <Input type="number" />
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
