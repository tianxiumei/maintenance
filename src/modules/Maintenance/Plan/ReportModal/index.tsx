import React from "react";
import { computed } from "mobx";
import BasicComponent from "components/BasicComponent";
import { observer } from "mobx-react";
import { Table } from "antd";
import Modal from "components/Base/Modal";
import { IPlan } from "apis/plan/model";

interface IReportModalProps {
  dataSource: any;
  onCancel: () => void;
}

@observer
export default class ReportModal extends BasicComponent<
  IReportModalProps,
  any
> {
  @computed
  get columns() {
    return [
      {
        title: "编号",
        dataIndex: "planNum",
        key: "planNum",
        width: 80,
        fixed: "left",
      },
      {
        title: "名称",
        children: [
          {
            title: "项目名称",
            dataIndex: "proName",
            key: "proName",
            width: 150,
          },
          {
            title: "类别名称",
            dataIndex: "cateName",
            key: "cateName",
            width: 150,
          },
          {
            title: "类别编码",
            dataIndex: "cateCode",
            key: "cateCode",
            width: 150,
          },
        ],
      },
      {
        title: "计算数量",
        children: [
          {
            title: "数量",
            dataIndex: "number",
            key: "number",
            width: 150,
          },
          {
            title: "计量单位",
            dataIndex: "measureUnit",
            key: "measureUnit",
            width: 200,
          },
          {
            title: "概算费用(万元)",
            dataIndex: "expBudget",
            key: "expBudget",
            sorter: (a: IPlan, b: IPlan) => a.expBudget - b.expBudget,
          },
        ],
      },
      {
        title: "设备",
        children: [
          {
            title: "设备编号",
            dataIndex: "deviceID",
            key: "deviceID",
            width: 150,
          },
          {
            title: "规格型号",
            dataIndex: "normsType",
            key: "normsType",
            width: 200,
          },
        ],
      },
      {
        title: "维修计划",
        children: [
          {
            title: "启用日期",
            dataIndex: "startDate",
            key: "startDate",
            width: 150,
          },
          {
            title: "计划安排",
            dataIndex: "plan",
            key: "plan",
            width: 200,
          },
          {
            title: "修理内容",
            dataIndex: "fix",
            key: "fix",
            width: 200,
          },
          {
            title: "实施日期",
            dataIndex: "implDate",
            key: "implDate",
            width: 200,
          },
          {
            title: "承修单位",
            dataIndex: "serUnit",
            key: "serUnit",
            width: 200,
          },
          {
            title: "实施确认",
            dataIndex: "confirm",
            key: "confirm",
            width: 200,
          },
        ],
      },
      {
        title: "结算",
        children: [
          {
            title: "结算年度",
            dataIndex: "doneYear",
            key: "doneYear",
            width: 150,
          },
          {
            title: "结算费用(万元)",
            dataIndex: "doneCost",
            key: "doneCost",
            width: 200,
          },
          {
            title: "结算日期",
            dataIndex: "doneDate",
            key: "doneDate",
            width: 200,
          },
        ],
      },
      {
        title: "备注",
        dataIndex: "remarks",
        key: "remarks",
        width: 80,
        fixed: "right",
      },
      {
        title: "记录日期",
        dataIndex: "recordDate",
        key: "recordDate",
        width: 120,
        fixed: "right",
      },
    ];
  }

  render() {
    return (
      <Modal
        width={1000}
        footer={null}
        visible={true}
        onCancel={this.props.onCancel}
      >
        <div className="report">
          <Table
            columns={this.columns as any}
            dataSource={this.props.dataSource || []}
            emptyText="暂无数据"
            scroll={{ x: "calc(700px + 50%)", y: 240 }}
            bordered
            size="large"
          />
        </div>
      </Modal>
    );
  }
}
