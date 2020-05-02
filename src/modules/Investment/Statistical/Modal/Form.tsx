import React from "react";
import { Form, Input, Button, DatePicker } from "antd";
import { isNull } from "lodash";
import moment from "moment";
import { IStatistical } from "apis/Investment/Statistical/model";

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
  statistical: IStatistical | null;
  type?: string;
  onCancle: () => void;
  onSubmit: (report: IStatistical) => void;
}

export const CreateForm = (props: IFormProps) => {
  const [form] = Form.useForm();
  const { onCancle, onSubmit, statistical } = props;
  function handleCancle() {
    onCancle();
    form.resetFields();
  }

  function onFinish(values: IStatistical) {
    onSubmit(values);
    handleCancle();
  }

  return (
    <Form
      form={form}
      initialValues={
        !isNull(statistical)
          ? {
              ...statistical,
              recordDate: moment(statistical.recordDate),
              startTime: moment(statistical.startTime),
              doneTime: moment(statistical.doneTime),
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
        <Input placeholder="请填写名称" disabled={!isNull(statistical)} />
      </Form.Item>
      <Form.Item {...formItemLayout} name="proSize" label="规模">
        <Input placeholder="请填写规模" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="yplanInvest"
        label="本年计划投资"
        rules={[
          {
            required: true,
            message: "请填写本年计划投资",
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="mplanInvest"
        label="本月计划投资"
        rules={[
          {
            required: true,
            message: "请填写本月计划投资",
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        {...formItemLayout}
        name="totalInvest"
        label="本年累计完成投资合计"
        rules={[
          {
            required: true,
            message: "本年累计完成投资合计",
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <div>
        <div>构建成分</div>
        <Form.Item {...formItemLayout} name="construction" label="(1)构建工程">
          <Input />
        </Form.Item>
        <Form.Item {...formItemLayout} name="installation" label="(2)安装工程">
          <Input type="number" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="toolsPurchase"
          label="(3)设备工具购置"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item {...formItemLayout} name="otherCost" label="(4)其他费用">
          <Input type="number" />
        </Form.Item>
      </div>
      <Form.Item
        {...formItemLayout}
        name="doneWork"
        label="本年累计完成事物工作量"
      >
        <Input />
      </Form.Item>
      <Form.Item {...formItemLayout} name="constructionUnit" label="施工单位">
        <Input />
      </Form.Item>
      <Form.Item {...formItemLayout} name="mananger" label="现场管理人">
        <Input />
      </Form.Item>
      <Form.Item {...formItemLayout} name="imageProgress" label="形象进度">
        <Input />
      </Form.Item>
      <Form.Item {...formItemLayout} name="constructionArea" label="施工面积">
        <Input type="number" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="houseCon" label="住宅（施工）">
        <Input type="number" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="completesArea" label="竣工面积">
        <Input type="number" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="houseCom" label="住宅（竣工）">
        <Input type="number" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="recordUnit" label="填报单位">
        <Input />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        rules={[
          {
            required: true,
            message: "请填写记录日期",
          },
        ]}
        name="recordDate"
        label="记录日期"
      >
        <DatePicker placeholder="记录日期" className="date" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="startTime"
        label="启用日期"
        rules={[
          {
            required: true,
            message: "请填写记录日期",
          },
        ]}
      >
        <DatePicker placeholder="选择启用日期" className="date" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="doneTime"
        label="竣工日期"
        rules={[
          {
            required: true,
            message: "请填写记录日期",
          },
        ]}
      >
        <DatePicker placeholder="竣工日期" className="date" />
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
