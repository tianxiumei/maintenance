import * as React from "react";
import * as ReactDOM from "react-dom";
import { Container } from "inversify";
import Store from "stores/store";
import bind from "utils/bind";
import { destroy } from "./decorator";

type IDisposer = () => void;

export * from "./decorator";
export default class BasicComponent<P, S> extends React.Component<P, S> {
  static destroy = destroy;
  /**
   * 用于指定rootRef
   */
  rootRef = React.createRef<any>();
  /**
   * 根DOM的单例
   */
  private _rootDOM: any = null;
  /**
   * 待销毁回调数组
   */
  private _disposers: IDisposer[] = [];
  /**
   * 添加待销毁回调
   * @param disposers 待销毁回调函数
   */
  @bind
  addDisposer(...disposers: IDisposer[]) {
    this._disposers = this._disposers.concat(disposers);
  }

  /**
   * 获取当前组件的根DOM
   */
  @bind
  getRootDOM() {
    if (!this._rootDOM) {
      this._rootDOM = ReactDOM.findDOMNode(this.rootRef.current || this);
    }
    return this._rootDOM;
  }

  dispose() {
    // 销毁container中所有store成员
    // _ioc_container 是装饰器在装饰BasicComponent的时候向prototype中添加的
    const _ioc_container = (this as any)._ioc_container;
    if (_ioc_container instanceof Container) {
      const container = _ioc_container as any;
      container._bindingDictionary._map.forEach((entries: any, key: any) => {
        // 遍历container中的Store单例进行清理
        const instance = entries[0];
        if (instance && instance.activated && instance.cache instanceof Store) {
          try {
            instance.cache.dispose();
          } catch (err) {
            console.log("Dispose error: ", err);
          }
          container.rebind(key).to(instance.implementationType);
        }
      });
    }

    // 销毁资源
    this._disposers.forEach((disposer: IDisposer) => {
      try {
        disposer();
      } catch (err) {
        console.log("Dispose error: ", err);
      }
    });
  }

  componentWillUnmount() {
    this.dispose();
  }
}
