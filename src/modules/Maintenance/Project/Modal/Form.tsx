import React from "react";
import { Form, Input, Button, DatePicker } from "antd";
import { isNull } from "lodash";
import moment from "moment";
import { IProject } from "apis/project/model";
import { dateFormat } from "../../../../constants";

const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface IFormProps {
  project: IProject | null;
  onCancle: () => void;
  onSubmit: (project: IProject) => void;
}

export const CreateForm = (props: IFormProps) => {
  const [form] = Form.useForm();
  const { onCancle, onSubmit, project } = props;
  function handleCancle() {
    onCancle();
    form.resetFields();
  }

  function onFinish(values: IProject) {
    onSubmit(values);
    handleCancle();
  }

  return (
    <Form
      form={form}
      initialValues={
        !isNull(project)
          ? { ...project, date1: moment(project.date1, dateFormat) }
          : undefined
      }
      name="dynamic_rule"
      labelAlign="left"
      onFinish={onFinish as any}
    >
      <Form.Item
        {...formItemLayout}
        name="reportOrg"
        label="填报单位"
        rules={[
          {
            required: true,
            message: "请填写填报单位",
          },
        ]}
      >
        <Input placeholder="请填写填报单位" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        rules={[
          {
            required: true,
            message: "请填写项目名称",
          },
        ]}
        name="proName"
        label="项目名称"
      >
        <Input placeholder="请填写项目名称" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="planNum" label="计划批号">
        <Input placeholder="请填写计划批号" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="expBudget" label="费用概算">
        <Input type="number" placeholder="请填写费用概算" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="propertyRes" label="资产简历">
        <Input.TextArea placeholder="请填写资产简历" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="fix" label="主要修理内容">
        <Input.TextArea placeholder="请填写主要修理内容" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="proof" label="可行性及相关效益论证">
        <Input.TextArea placeholder="请填写可行性及相关效益论证" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="date1"
        label="日期"
        rules={[
          {
            required: true,
            message: "请填写日期",
          },
        ]}
      >
        <DatePicker style={{ width: "350px" }} placeholder="选择日期" />
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
