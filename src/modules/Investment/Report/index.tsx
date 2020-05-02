import React from "react";
import { Button } from "antd";
import { debounce } from "lodash";
import { observer } from "mobx-react";
import { computed, action, observable, reaction } from "mobx";
import BasicComponent, { destroy } from "components/BasicComponent";
import ReportStore from "services/Report";
import { IReport } from "apis/Investment/Report/model";
import AdvancedTable from "../../../components/Base/AdvancedTable";
import bind from "../../../utils/bind";
import ReportModal from "./Modal";
import ReportDetail from "./ReportDetail";

@observer
export default class Report extends BasicComponent<any, any> {
  @destroy() reportStore = new ReportStore();
  @observable editReport: IReport | null = null;
  @observable showCreateModal: boolean = false;
  @observable showReport: boolean = false;
  debounceListEvent = debounce(this.reportStore.listReports, 500);

  @bind
  @action
  setShowReport(showReport: boolean) {
    this.showReport = showReport;
  }

  @bind
  @action
  setShowCreateModal(showCreateModal: boolean) {
    this.showCreateModal = showCreateModal;
  }

  @bind
  @action
  setEditReport(editReport: IReport | null) {
    this.editReport = editReport;
  }

  @computed
  get columns() {
    return [
      {
        dataIndex: "proName",
        title: "编码",
      },
      {
        dataIndex: "proName",
        title: "项目名称",
      },
      {
        dataIndex: "keyMark",
        title: "重点工程标志",
        render: (keyMark: string) => keyMark || "-",
      },
      {
        dataIndex: "plantotalInvest",
        title: "计划总投资",
      },
      {
        dataIndex: "ytotalInvest",
        title: "本年计划投资",
      },
      {
        dataIndex: "toolsPurchase",
        title: "设备采购",
      },
      {
        dataIndex: "proNumber",
        title: "项目批准号",
        render: (proNumber: string) => proNumber || "-",
      },
      {
        dataIndex: "recordDate",
        title: "记录日期",
        render: (recordDate: string) => recordDate || "-",
      },
      {
        dataIndex: "startDate",
        title: "启用日期",
        render: (startDate: string) => startDate || "-",
      },
      {
        title: "操作",
        key: "action",
        render: (report: IReport) => (
          <div>
            <Button
              type="link"
              onClick={() => {
                this.handleEdit(report);
              }}
            >
              编辑
            </Button>
          </div>
        ),
      },
    ];
  }

  @bind
  handleEdit(report: IReport) {
    this.setEditReport(report);
    this.setShowCreateModal(true);
  }

  @computed
  get dataSource() {
    return this.reportStore.reports
      ? this.reportStore.reports.map((report) => ({
          ...report,
          key: report.proName,
        }))
      : [];
  }

  componentDidMount() {
    this.addDisposer(
      reaction(
        () => this.reportStore.proName || this.reportStore.recordDate,
        () => {
          this.debounceListEvent();
        },
        {
          fireImmediately: true,
        }
      )
    );
    this.reportStore.listReports();
  }

  render() {
    return (
      <div className="report">
        <AdvancedTable
          columns={this.columns}
          dataSource={this.dataSource}
          emptyText="暂无数据"
          addBtn={{
            title: "报表显示",
            onClick: () => this.setShowReport(true),
          }}
          searchFilters={[
            {
              placeholder: "名称",
              value: this.reportStore.proName,
              key: "proName",
              type: "string",
              onChange: this.reportStore.setProName as any,
            },
            {
              placeholder: "时间",
              value: this.reportStore.recordDate,
              key: "recordDate",
              type: "date",
              onChange: this.reportStore.setDate as any,
            },
          ]}
        />
        {this.showCreateModal && (
          <ReportModal
            onCancle={() => {
              this.setShowCreateModal(false);
              this.setEditReport(null);
            }}
            update={this.reportStore.updateReport}
            report={this.editReport}
          />
        )}
        {this.showReport && (
          <ReportDetail
            onCancel={() => {
              this.setShowReport(false);
            }}
            dataSource={this.dataSource}
          />
        )}
      </div>
    );
  }
}
