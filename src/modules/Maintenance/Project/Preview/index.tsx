import React from "react";
import { computed } from "mobx";
import BasicComponent from "components/BasicComponent";
import { observer } from "mobx-react";
import { Table, Button } from "antd";
import Modal from "components/Base/Modal";
import bind from "utils/bind";
import ReactToPrint from "react-to-print";

import "./style.scss";

interface IPreviewModalProps {
  dataSource: any;
  onCancel: () => void;
}

@observer
export default class Preview extends BasicComponent<IPreviewModalProps, any> {
  componentRef: any;
  @computed
  get columns() {
    return [
      {
        dataIndex: "code",
        title: "编码",
        width: 100,
      },
      {
        dataIndex: "reportOrg",
        title: "填报单位",
        width: 120,
      },
      {
        dataIndex: "proName",
        title: "项目名称",
        width: 120,
      },
      {
        dataIndex: "proName",
        title: "项目名称",
        width: 120,
      },
      {
        dataIndex: "planNum",
        title: "计划批号",
        width: 120,
      },
      {
        dataIndex: "expBudget",
        title: "费用概算",
        width: 120,
      },
      {
        dataIndex: "propertyRes",
        title: "资产简历",
        width: 120,
      },
      {
        dataIndex: "fix",
        title: "修理内容",
        width: 120,
      },
      {
        dataIndex: "proof",
        title: "可行性及相关效益",
        width: 250,
      },
      {
        dataIndex: "date1",
        title: "日期",
        width: 200,
      },
    ];
  }

  @bind
  print() {
    window.print();
  }

  render() {
    return (
      <Modal
        width={1400}
        footer={null}
        visible={true}
        onCancel={this.props.onCancel}
      >
        <div className="report">
          <div className="head">
            <h2>
              {new Date().getFullYear()}固定资产修理项目实施情况及调整计划表
            </h2>
            <ReactToPrint
              trigger={() => (
                <Button type="primary" onClick={this.print}>
                  打印
                </Button>
              )}
              content={() => this.componentRef}
            />
          </div>

          <div ref={(el) => (this.componentRef = el)}>
            <Table
              columns={this.columns as any}
              dataSource={this.props.dataSource || []}
              emptyText="暂无数据"
              bordered
              size="large"
            />
          </div>
        </div>
      </Modal>
    );
  }
}
