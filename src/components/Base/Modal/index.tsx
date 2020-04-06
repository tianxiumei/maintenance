import * as React from "react";
import classnames from "classnames";
import { Modal as BaseModal } from "antd";
import { ModalProps } from "antd/lib/modal";
import bind from "utils/bind";

import "./style.scss";

export default class Modal extends React.Component<ModalProps, any> {
  containerRef: HTMLElement | null = null;

  @bind
  setContainerRef(ref: any) {
    this.containerRef = ref;
  }
  @bind
  childrenGetPopupContainer() {
    return this.containerRef || document.body;
  }

  render() {
    const {
      wrapClassName,
      children,
      bodyStyle,
      title,
      ...otherProps
    } = this.props;
    return (
      <BaseModal
        wrapClassName={classnames("modal", wrapClassName, {
          noFooter: otherProps.footer === null,
        })}
        maskClosable={false}
        {...otherProps}
        title={title}
      >
        {children}
      </BaseModal>
    );
  }
}
