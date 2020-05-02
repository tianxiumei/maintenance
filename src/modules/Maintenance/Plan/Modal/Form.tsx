import React from "react";
import { Form, Input, Button, DatePicker, Radio } from "antd";
import { isNull } from "lodash";
import moment from "moment";
import { IPlan } from "apis/plan/model";
import { dateFormat } from "../../../../constants";

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
  plan: IPlan | null;
  onCancle: () => void;
  onSubmit: (plan: IPlan) => void;
}

export const CreateForm = (props: IFormProps) => {
  const [form] = Form.useForm();
  const { onCancle, onSubmit, plan } = props;
  function handleCancle() {
    onCancle();
    form.resetFields();
  }

  function onFinish(values: IPlan) {
    onSubmit(values);
    handleCancle();
  }

  return (
    <Form
      form={form}
      initialValues={
        !isNull(plan)
          ? {
              ...plan,
              doneDate: moment(plan.doneDate, dateFormat),
              implDate: moment(plan.implDate),
              startDate: moment(plan.startDate),
              recordDate: moment(plan.recordDate),
              doneYear: moment(plan.doneYear),
            }
          : undefined
      }
      name="dynamic_rule"
      labelAlign="left"
      onFinish={onFinish as any}
    >
      <Form.Item
        {...formItemLayout}
        name="proName"
        label="项目名称"
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
        name="cateCode"
        label="类别编码"
        rules={[
          {
            required: true,
            message: "请填写类别编码",
          },
        ]}
      >
        <Input placeholder="请填写类别编码" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="cateName"
        label="类别名称"
        rules={[
          {
            required: true,
            message: "请填写类别名称",
          },
        ]}
      >
        <Input placeholder="请填写类别名称" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="reportOrg" label="填报单位">
        <Input placeholder="请填写填报单位" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="measureUnit" label="计量单位">
        <Input placeholder="请填写计量单位" />
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
        name="startDate"
        label="启用日期"
        rules={[
          {
            required: true,
            message: "请填写启用日期",
          },
        ]}
      >
        <DatePicker placeholder="选择启用日期" className="date" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="implDate" label="实施日期">
        <DatePicker placeholder="实施日期" className="date" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="normsType"
        rules={[
          {
            required: true,
            message: "请填写规格型号",
          },
        ]}
        label="规格型号"
      >
        <Input />
      </Form.Item>
      <Form.Item {...formItemLayout} name="deviceID" label="设备编号">
        <Input type="number" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="number" label="数量">
        <Input type="number" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="expBudget" label="概算费用">
        <Input />
      </Form.Item>
      <Form.Item {...formItemLayout} name="serUnit" label="承修单位">
        <Input />
      </Form.Item>
      <Form.Item {...formItemLayout} name="confirm" label="实施确认">
        <Radio.Group>
          <Radio value="false">否</Radio>
          <Radio value="true">是</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item {...formItemLayout} name="plan" label="计划安排">
        <Input />
      </Form.Item>
      <Form.Item {...formItemLayout} name="doneYear" label="结算年度">
        <DatePicker placeholder="结算年度" picker="year" className="date" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="doneCost" label="结算费用">
        <Input type="number" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="doneDate" label="结算日期">
        <DatePicker placeholder="结算日期" className="date" />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "请填写记录日期",
          },
        ]}
        {...formItemLayout}
        name="recordDate"
        label="记录日期"
      >
        <DatePicker placeholder="记录日期" className="date" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="fix" label="修理内容">
        <Input />
      </Form.Item>
      <Form.Item {...formItemLayout} name="remark" label="备注">
        <Input />
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
