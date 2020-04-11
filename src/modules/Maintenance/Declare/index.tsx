import React from "react";
import { observer } from "mobx-react";
import { Popconfirm, Button } from "antd";
import { debounce } from "lodash";
import BasicComponent, { destroy } from "components/BasicComponent";
import { DecareStore } from "services/Decare";
import { computed, action, observable, reaction } from "mobx";
import { IDecare } from "apis/maintenance/model";
import AdvancedTable from "../../../components/Base/AdvancedTable";
import bind from "../../../utils/bind";
import { DeclareModal } from "./Modal";

@observer
export default class Declare extends BasicComponent<any, any> {
  @destroy() decareStore = new DecareStore();
  @observable editDecare: IDecare | null = null;
  @observable showCreateModal: boolean = false;
  debounceListEvent = debounce(this.decareStore.listDecares, 500);

  @bind
  @action
  setShowCreateModal(showCreateModal: boolean) {
    this.showCreateModal = showCreateModal;
  }

  @bind
  @action
  setEditDecare(editDecare: IDecare | null) {
    this.editDecare = editDecare;
  }

  @computed
  get columns() {
    return [
      {
        dataIndex: "proName",
        title: "名称",
      },
      {
        dataIndex: "typeName",
        title: "类别名称",
      },
      {
        dataIndex: "superClass",
        title: "父类别",
      },
      {
        dataIndex: "subClass",
        title: "子类别",
      },
      {
        dataIndex: "reportOrg",
        title: "填报单位",
      },
      {
        dataIndex: "measureUnit",
        title: "计量单位",
      },
      {
        dataIndex: "number",
        title: "数量",
      },
      {
        dataIndex: "fix",
        title: "修理内容",
      },
      {
        dataIndex: "remark",
        title: "备注",
      },
      {
        dataIndex: "regDate",
        title: "日期",
      },
      {
        title: "操作",
        key: "action",
        render: (declare: IDecare) => (
          <div>
            <Button
              type="link"
              onClick={() => {
                this.handleEdit(declare);
              }}
            >
              编辑
            </Button>
            <Popconfirm
              title={`确定删除${declare.proName}?`}
              okText="确认"
              cancelText="取消"
              onConfirm={() => this.decareStore.handleDelete(declare.id)}
            >
              <Button type="link">删除</Button>
            </Popconfirm>
          </div>
        ),
      },
    ];
  }

  @bind
  handleEdit(decares: IDecare) {
    this.setEditDecare(decares);
    this.setShowCreateModal(true);
  }

  @computed
  get dataSource() {
    return this.decareStore.decares
      ? this.decareStore.decares.map((decare) => ({
          ...decare,
          key: decare.id,
        }))
      : [];
  }

  componentDidMount() {
    this.addDisposer(
      reaction(
        () => this.decareStore.proName,
        () => {
          this.debounceListEvent();
          console.log(this.decareStore.proName);
        },
        {
          fireImmediately: true,
        }
      )
    );
    this.decareStore.listDecares();
  }

  render() {
    return (
      <div className="declare">
        <AdvancedTable
          columns={this.columns}
          dataSource={this.dataSource}
          emptyText="暂无数据"
          addBtn={{
            title: "创建申报",
            onClick: () => this.setShowCreateModal(true),
          }}
          searchFilters={[
            {
              placeholder: "id",
              value: this.decareStore.proName,
              key: "display",
              type: "string",
              onChange: this.decareStore.setProName as any,
            },
            {
              placeholder: "名称",
              value: this.decareStore.proName,
              key: "display",
              type: "string",
              onChange: this.decareStore.setProName as any,
            },
          ]}
        />
        {this.showCreateModal && (
          <DeclareModal
            onCancle={() => {
              this.setShowCreateModal(false);
              this.setEditDecare(null);
            }}
            create={this.decareStore.createDecare}
            update={this.decareStore.updateDecare}
            decare={this.editDecare}
          />
        )}
      </div>
    );
  }
}
