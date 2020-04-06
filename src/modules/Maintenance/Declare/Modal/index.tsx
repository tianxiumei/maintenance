import React from "react";
import Modal from "components/Base/Modal";
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
  handleSubnit(decare: IDecare) {
    if (this.props.decare) {
      this.props
        .update({ ...decare, id: this.props.decare.id })
        .then(() => this.handleCancel());
    } else {
      this.props.create(decare).then(() => this.handleCancel());
    }
  }
  @bind
  handleCancel() {
    this.props.onCancle();
  }
  render() {
    return (
      <Modal
        title="创建"
        width={550}
        footer={null}
        visible={true}
        onCancel={this.handleCancel}
      >
        <CreateForm
          declare={this.props.decare}
          onCancle={this.handleCancel}
          onSubmit={this.handleSubnit}
        />
      </Modal>
    );
  }
}
