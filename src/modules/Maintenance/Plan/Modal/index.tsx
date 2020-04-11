import React from "react";
import moment from "moment";
import Modal from "components/Base/Modal";
import { IPlan } from "apis/plan/model";
import BasicComponent from "../../../../components/BasicComponent";
import bind from "../../../../utils/bind";
import { IKeyValues } from "../../../../constants";
import { CreateForm } from "./Form";
import "./style.scss";

interface IPlaneModaleProps {
  plan: IPlan | null;
  onCancle: () => void;
  create: (plan: IPlan) => Promise<any>;
  update: (plan: IPlan) => Promise<any>;
}

export class PlaneModal extends BasicComponent<IPlaneModaleProps, any> {
  @bind
  handleSubmit(plan: IPlan) {
    const result = plan as IKeyValues;
    Object.keys(result).forEach((key) => {
      result[key] = result[key] || "";
    });
    if (this.props.plan) {
      this.props
        .update({
          ...result,
          doneDate: moment(plan.doneDate).valueOf(),
          implDate: moment(plan.implDate).valueOf(),
          startDate: moment(plan.startDate).valueOf(),
          recordDate: moment(plan.recordDate).valueOf(),
          doneYear: moment(plan.doneYear).valueOf(),
          planNum: this.props.plan.planNum,
        } as IPlan)
        .then(() => this.handleCancel());
    } else {
      this.props.create({ ...result } as IPlan).then(() => this.handleCancel());
    }
  }
  @bind
  handleCancel() {
    this.props.onCancle();
  }
  render() {
    return (
      <Modal
        title={this.props.plan ? "编辑" : "创建"}
        width={700}
        footer={null}
        visible={true}
        onCancel={this.handleCancel}
      >
        <CreateForm
          plan={this.props.plan}
          onCancle={this.handleCancel}
          onSubmit={this.handleSubmit}
        />
      </Modal>
    );
  }
}
