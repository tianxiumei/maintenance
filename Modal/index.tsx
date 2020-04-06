import React from "react";
import { Modal } from "antd";
import BasicComponent from "../../../../components/BasicComponent";
import bind from "../../../../utils/bind";

export class DeclareModal extends BasicComponent<any, any> {
  @bind
  handleOk() {}
  @bind
  handleCancel() {}
  render() {
    return (
      <Modal
        title="创建"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    );
  }
}
