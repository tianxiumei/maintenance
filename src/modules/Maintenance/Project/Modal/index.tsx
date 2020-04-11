import React from "react";
import moment from "moment";
import Modal from "components/Base/Modal";
import { IProject } from "apis/project/model";
import { IKeyValues } from "models/base";
import BasicComponent from "../../../../components/BasicComponent";
import bind from "../../../../utils/bind";
import { CreateForm } from "./Form";

interface IProjectModaleProps {
  project: IProject | null;
  onCancle: () => void;
  create: (project: IProject) => Promise<any>;
  update: (project: IProject) => Promise<any>;
}

export class ProjectModal extends BasicComponent<IProjectModaleProps, any> {
  @bind
  handleSubmit(project: IProject) {
    const result = project as IKeyValues;
    Object.keys(result).forEach((key) => {
      result[key] = result[key] || "";
    });
    if (this.props.project) {
      this.props
        .update({
          ...result,
          code: this.props.project.code,
          date1: moment(result.date1).valueOf(),
        } as IProject)
        .then(() => this.handleCancel());
    } else {
      this.props
        .create({
          ...result,
          date1: moment(result.date1).valueOf(),
        } as IProject)
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
        title="创建"
        width={600}
        footer={null}
        visible={true}
        onCancel={this.handleCancel}
      >
        <CreateForm
          project={this.props.project}
          onCancle={this.handleCancel}
          onSubmit={this.handleSubmit}
        />
      </Modal>
    );
  }
}
