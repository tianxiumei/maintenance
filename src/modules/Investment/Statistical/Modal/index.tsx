import React from "react";
import moment from "moment";
import Modal from "components/Base/Modal";
import { IStatistical } from "apis/Investment/Statistical/model";
import BasicComponent from "../../../../components/BasicComponent";
import bind from "../../../../utils/bind";
import { IKeyValues } from "../../../../constants";
import { CreateForm } from "./Form";
import "./style.scss";

interface IStatisticalModaleProps {
  statistical: IStatistical | null;
  type?: string;
  onCancle: () => void;
  toReport: (statistical: IStatistical) => Promise<any>;
  create: (statistical: IStatistical) => Promise<any>;
  update: (statistical: IStatistical) => Promise<any>;
}

export default class StatisticalModal extends BasicComponent<
  IStatisticalModaleProps,
  any
> {
  @bind
  handleSubmit(statistical: IStatistical) {
    const result = statistical as IKeyValues;
    Object.keys(result).forEach((key) => {
      result[key] = result[key] || "";
    });
    if (this.props.type) {
      this.props.toReport({
        ...result,
        startTime: moment(statistical.startTime).valueOf(),
        recordDate: moment(statistical.recordDate).valueOf(),
        doneTime: moment(statistical.doneTime).valueOf(),
      } as any);
    } else if (this.props.statistical) {
      this.props
        .update({
          ...result,
          startTime: moment(statistical.startTime).valueOf(),
          recordDate: moment(statistical.recordDate).valueOf(),
          doneTime: moment(statistical.doneTime).valueOf(),
        } as any)
        .then(() => this.handleCancel());
    } else {
      this.props
        .create({ ...result, transFlag: 0 } as IStatistical)
        .then(() => this.handleCancel());
    }
  }
  @bind
  handleCancel() {
    this.props.onCancle();
  }
  render() {
    return (
      <Modal
        title={"编辑"}
        width={900}
        footer={null}
        visible={true}
        onCancel={this.handleCancel}
      >
        <CreateForm
          type={this.props.type}
          statistical={this.props.statistical}
          onCancle={this.handleCancel}
          onSubmit={this.handleSubmit}
        />
      </Modal>
    );
  }
}
