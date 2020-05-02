import React from "react";
import { Form, Input, Button, DatePicker } from "antd";
import { isNull } from "lodash";
import moment from "moment";
import { IReport } from "apis/Investment/Report/model";

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
  report: IReport | null;
  onCancle: () => void;
  onSubmit: (report: IReport) => void;
}

export const CreateForm = (props: IFormProps) => {
  const [form] = Form.useForm();
  const { onCancle, onSubmit, report } = props;
  function handleCancle() {
    onCancle();
    form.resetFields();
  }

  function onFinish(values: IReport) {
    onSubmit(values);
    handleCancle();
  }

  return (
    <Form
      form={form}
      initialValues={
        !isNull(report)
          ? {
              ...report,
              recordDate: moment(report.recordDate),
              startDate: moment(report.startDate),
              productDate: moment(report.productDate),
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
        <Input placeholder="请填写名称" disabled />
      </Form.Item>
      <Form.Item {...formItemLayout} name="proCode" label="编码">
        <Input placeholder="请填写编码" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="keyMark" label="重点工程标志">
        <Input placeholder="请填写重点工程标志" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="energysavingMark"
        label="节能环保标志"
      >
        <Input placeholder="请填写节能环保标志" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="plantotalInvest" label="计划总投资">
        <Input type="number" placeholder="计划总投资" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label="请填写自开建至本年累计完成投资"
        name="stotalInvest"
      >
        <Input type="number" placeholder="请填写自开建至本年累计完成投资" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="yplanInvest" label="本年计划投资">
        <Input type="number" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="ytotalInvest"
        label="自年初累计完成投资"
      >
        <Input type="number" />
      </Form.Item>
      <div>
        <div>构建成分</div>
        <Form.Item {...formItemLayout} name="construction" label="(1)构建工程">
          <Input type="number" />
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
      <div>
        <div>用途:</div>
        <Form.Item {...formItemLayout} name="NLYM" label="(1)农林鱼牧业">
          <Input type="number" />
        </Form.Item>
        <Form.Item {...formItemLayout} name="GYJZ" label="(2)工业建筑业">
          <Input type="number" />
        </Form.Item>
        <Form.Item {...formItemLayout} name="SYYS" label="(3)商业运输业">
          <Input type="number" />
        </Form.Item>
        <Form.Item {...formItemLayout} name="ZZ" label="(4)住宅">
          <Input type="number" />
        </Form.Item>
        <Form.Item {...formItemLayout} name="QT" label="(5)其他">
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
        name="houseTotalInvest"
        label="自年初累计完成房屋投资"
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="houseComInvest"
        label="自年初累计完成房屋竣工价值"
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="newFixedAsset"
        label="自年初累计新增固定资产"
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="productiveAsset"
        label="累计新增生产性固定资产"
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="noproductiveInvest"
        label="累计完成不增加固定资产投资"
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="incompleteInvest"
        label="本年底未完成工程累计完成投资"
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="abilityCode" label="能力编码">
        <Input />
      </Form.Item>
      <Form.Item {...formItemLayout} name="countUnit" label="计算单位">
        <Input />
      </Form.Item>
      <Form.Item {...formItemLayout} name="designAbility" label="设计能力">
        <Input />
      </Form.Item>
      <Form.Item {...formItemLayout} name="yearSize" label="本年施工规模">
        <Input />
      </Form.Item>
      <Form.Item {...formItemLayout} name="cumIncrease" label="历年累计新增">
        <Input type="number" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="yearIncrease" label="本年新增">
        <Input />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="doneOtherWork"
        label="自年初累计完成其他实物工作量"
      >
        <Input />
      </Form.Item>
      <Form.Item {...formItemLayout} name="imageProgress" label="形象进度">
        <Input />
      </Form.Item>
      <Form.Item {...formItemLayout} name="proNumber" label="项目批准号">
        <Input />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="increaseProduction"
        label="更新改造直接用途划分"
      >
        <Input />
      </Form.Item>
      <Form.Item {...formItemLayout} name="energySaving" label="节约能源">
        <Input type="number" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="otherSaving" label="其他节约">
        <Input type="number" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="addBreed" label="增加品种">
        <Input type="number" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="increaseQuality"
        label="提高产品质量"
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="sfzl" label="三废治理">
        <Input type="number" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="others" label="其他">
        <Input type="number" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="fundSource" label="资金来源">
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
      <Form.Item {...formItemLayout} name="startDate" label="项目开建年月">
        <DatePicker placeholder="选择项目开建年月" className="date" />
      </Form.Item>
      <Form.Item {...formItemLayout} name="productDate" label="项目投产年月">
        <DatePicker placeholder="项目投产年月" className="date" />
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
