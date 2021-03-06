import React from "react";
import moment from "moment";
import Modal from "components/Base/Modal";
import { IKeyValues } from "models/base";
import BasicComponent from "../../../../components/BasicComponent";
import bind from "../../../../utils/bind";
import { IDecare } from "../../../../apis/maintenance/model";
import { CreateForm } from "./Form";

interface IDecareModaleProps {
  decare: IDecare | null;
  onCancle: () => void;
  create: (decare: IDecare) => Promise<any>;
  update: (decare: IDecare) => Promise<any>;
}

export class DeclareModal extends BasicComponent<IDecareModaleProps, any> {
  @bind
  handleSubmit(decare: IDecare) {
    const result = decare as IKeyValues;
    if (this.props.decare) {
      this.props
        .update({
          ...result,
          id: this.props.decare.id,
          regDate: moment(result.regDate).valueOf(),
        } as IDecare)
        .then(() => this.handleCancel());
    } else {
      this.props
        .create({
          ...result,
          regDate: moment(result.regDate).valueOf(),
        } as IDecare)
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
        title={this.props.decare ? "编辑" : "创建"}
        width={700}
        footer={null}
        visible={true}
        onCancel={this.handleCancel}
      >
        <CreateForm
          declare={this.props.decare}
          onCancle={this.handleCancel}
          onSubmit={this.handleSubmit}
        />
      </Modal>
    );
  }
}
