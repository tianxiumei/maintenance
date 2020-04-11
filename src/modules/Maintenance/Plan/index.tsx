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

@observer
export default class Plane extends BasicComponent<any, any> {
  @destroy() planStore = new PlanStore();
  @observable editPlan: IPlan | null = null;
  @observable showCreateModal: boolean = false;
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

  @computed
  get dataSource() {
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
            title: "创建",
            onClick: () => this.setShowCreateModal(true),
          }}
          searchFilters={[
            {
              placeholder: "编号",
              value: this.planStore.planNum,
              key: "planNum",
              type: "number",
              onChange: this.planStore.setPlanNum as any,
            },
          ]}
        />
        {this.showCreateModal && (
          <PlaneModal
            onCancle={() => {
              this.setShowCreateModal(false);
              this.setEditPlane(null);
            }}
            create={this.planStore.createPlan}
            update={this.planStore.updatePlan}
            plan={this.editPlan}
          />
        )}
      </div>
    );
  }
}
