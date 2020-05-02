import React from "react";
import Modal from "components/Base/Modal";
import { IUser } from "apis/user/model";
import BasicComponent from "../../../components/BasicComponent";
import bind from "../../../utils/bind";
import { IKeyValues } from "../../../constants";
import { CreateForm } from "./Form";
import "./style.scss";

interface IUserModaleProps {
  user: IUser | null;
  onCancle: () => void;
  add: (user: IUser) => Promise<any>;
  update: (user: IUser) => Promise<any>;
}

export default class UserModal extends BasicComponent<IUserModaleProps, any> {
  @bind
  handleSubmit(user: IUser) {
    const result = user as IKeyValues;
    Object.keys(result).forEach((key) => {
      result[key] = result[key] || "";
    });
    if (this.props.user) {
      this.props.update(result as any).then(() => this.handleCancel());
    } else {
      this.props.add(user);
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
          user={this.props.user}
          onCancle={this.handleCancel}
          onSubmit={this.handleSubmit}
        />
      </Modal>
    );
  }
}
