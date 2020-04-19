import React from "react";
import moment from "moment";
import Modal from "components/Base/Modal";
import { IReport } from "apis/Investment/Report/model";
import BasicComponent from "../../../../components/BasicComponent";
import bind from "../../../../utils/bind";
import { IKeyValues } from "../../../../constants";
import { CreateForm } from "./Form";
import "./style.scss";

interface IReportModaleProps {
  report: IReport | null;
  onCancle: () => void;
  create?: (report: IReport) => Promise<any>;
  update: (report: IReport) => Promise<any>;
}

export default class ReportModal extends BasicComponent<
  IReportModaleProps,
  any
> {
  @bind
  handleSubmit(report: IReport) {
    const result = report as IKeyValues;
    Object.keys(result).forEach((key) => {
      result[key] = result[key] || "";
    });
    if (this.props.report) {
      this.props
        .update({
          ...result,
          startDate: moment(report.startDate).valueOf(),
          recordDate: moment(report.recordDate).valueOf(),
        } as any)
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
          report={this.props.report}
          onCancle={this.handleCancel}
          onSubmit={this.handleSubmit}
        />
      </Modal>
    );
  }
}
