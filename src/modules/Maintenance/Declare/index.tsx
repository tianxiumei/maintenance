import React from "react";
import { observable, action } from "mobx";
import { IDecare } from "apis/maintenance/model";
import bind from "utils/bind";
import { listDecares } from "apis/maintenance";

export default class Declare extends React.Component {
  @observable declares: IDecare[] = [];
  @bind
  @action
  setDeclares(declares: IDecare[]) {
    this.declares = declares;
  }
  componentDidMount() {
    listDecares().then(res => {
      console.log(res);
    });
  }
  render() {
    return <div>维修申报</div>;
  }
}
