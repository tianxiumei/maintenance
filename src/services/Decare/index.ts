import bind from "utils/bind";
import {
  listDecares,
  deleteDecare,
  createDecare,
  updateDecare,
  listDecaresByName,
} from "apis/maintenance";
import { observable, action } from "mobx";
import Store from "../../stores/store";
import { IDecare } from "../../apis/maintenance/model";
import { message } from "antd";

export class DecareStore extends Store {
  @observable decares: IDecare[] = [];
  @observable proName: string = "";

  @bind
  @action
  setProName(proName: string) {
    console.log("proName", proName);
    this.proName = proName;
  }

  @bind
  @action
  setDecares(decares: IDecare[]) {
    this.decares = decares;
  }

  @bind
  listDecares() {
    if (this.proName) {
      listDecaresByName(this.proName).then((decares) => {
        this.setDecares(decares);
      });
    } else {
      listDecares().then((decares) => {
        this.setDecares(decares);
      });
    }
  }

  @bind
  handleDelete(id: number) {
    deleteDecare(id).then(
      () => this.listDecares(),
      message.success("删除成功")
    );
  }
  @bind
  createDecare(decare: IDecare) {
    return createDecare(decare).then(() => this.listDecares());
  }
  @bind
  updateDecare(decare: IDecare) {
    return updateDecare(decare).then(() => this.listDecares());
  }
}
