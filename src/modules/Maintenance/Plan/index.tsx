import React from "react";
import { Button } from "antd";
import { debounce } from "lodash";
import { computed, action, observable, reaction } from "mobx";
import BasicComponent, { destroy } from "components/BasicComponent";
import { IPlan } from "apis/plan/model";
import { PlanStore } from "services/Plan";
import { observer } from "mobx-react";
import AdvancedTable from "../../../components/Base/AdvancedTable";
import bind from "../../../utils/bind";
import { PlaneModal } from "./Modal";
import ReportModal from "./ReportModal";

@observer
export default class Plane extends BasicComponent<any, any> {
  @destroy() planStore = new PlanStore();
  @observable editPlan: IPlan | null = null;
  @observable showCreateModal: boolean = false;
  @observable showReport: boolean = false;
  debounceListEvent = debounce(this.planStore.listPlans, 500);

  @bind
  @action
  setShowCreateModal(showCreateModal: boolean) {
    this.showCreateModal = showCreateModal;
  }

  @bind
  @action
  setEditPlane(editPlane: IPlan | null) {
    this.editPlan = editPlane;
  }

  @bind
  @action
  setShowReport(showReport: boolean) {
    this.showReport = showReport;
  }

  @computed
  get columns() {
    return [
      {
        dataIndex: "planNum",
        title: "编号",
      },
      {
        dataIndex: "proName",
        title: "项目名称",
      },
      {
        dataIndex: "cateName",
        title: "类别名称",
      },
      {
        dataIndex: "reportOrg",
        title: "填报单位",
      },
      {
        dataIndex: "measureUnit",
        title: "计量单位",
      },
      {
        dataIndex: "number",
        title: "数量",
      },
      {
        dataIndex: "fix",
        title: "修理内容",
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
        render: (plan: IPlan) => (
          <div>
            <Button
              type="link"
              onClick={() => {
                this.handleEdit(plan);
              }}
            >
              编辑
            </Button>
            <Button
              type="link"
              onClick={() => {
                this.handleProject(plan);
              }}
            >
              立项
            </Button>
          </div>
        ),
      },
    ];
  }

  @bind
  handleEdit(plan: IPlan) {
    this.setEditPlane(plan);
    this.setShowCreateModal(true);
  }

  @bind
  handleProject(plan: IPlan) {
    this.planStore.project(plan);
  }

  @computed
  get dataSource(): any {
    return this.planStore.plans
      ? this.planStore.plans.map((plan) => ({
          ...plan,
          key: plan.planNum,
        }))
      : [];
  }

  componentDidMount() {
    this.addDisposer(
      reaction(
        () => this.planStore.planNum || this.planStore.recordDate,
        () => {
          this.debounceListEvent();
        },
        {
          fireImmediately: true,
        }
      )
    );
    this.planStore.listPlans();
  }

  render() {
    return (
      <div className="plan">
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
              placeholder: "编号",
              value: this.planStore.planNum,
              key: "planNum",
              type: "number",
              onChange: this.planStore.setPlanNum as any,
            },
            {
              placeholder: "日期",
              value: this.planStore.recordDate,
              key: "recordDate",
              type: "date",
              onChange: this.planStore.setProRecordDate as any,
            },
          ]}
        />
        {this.showCreateModal && (
          <PlaneModal
            onCancle={() => {
              this.setShowCreateModal(false);
              this.setEditPlane(null);
            }}
            update={this.planStore.updatePlan}
            plan={this.editPlan!}
          />
        )}
        {this.showReport && (
          <ReportModal
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
