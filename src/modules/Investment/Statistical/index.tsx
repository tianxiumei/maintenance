import React from "react";
import { Button } from "antd";
import { debounce } from "lodash";
import { observer } from "mobx-react";
import { computed, action, observable, reaction } from "mobx";
import BasicComponent, { destroy } from "components/BasicComponent";
import statisticaltoretore from "services/Statistical";
import AdvancedTable from "../../../components/Base/AdvancedTable";
import bind from "../../../utils/bind";
import StatisticalModal from "./Modal";
import { IStatistical } from "apis/Investment/Statistical/model";

@observer
export default class Statistical extends BasicComponent<any, any> {
  @destroy() statisticaltoretore = new statisticaltoretore();
  @observable editStatistical: IStatistical | null = null;
  @observable showCreateModal: boolean = false;
  @observable type: string = "";

  debounceListEvent = debounce(this.statisticaltoretore.listStatisticals, 500);

  @bind
  @action
  setShowCreateModal(showCreateModal: boolean) {
    this.showCreateModal = showCreateModal;
  }

  @bind
  @action
  setEditStatistical(editStatistical: IStatistical | null) {
    this.editStatistical = editStatistical;
  }

  @bind
  @action
  setEditType(type: string) {
    this.type = type;
  }

  @computed
  get columns() {
    return [
      {
        dataIndex: "proName",
        title: "编号",
      },
      {
        dataIndex: "proSize",
        title: "工程规模",
      },
      {
        dataIndex: "construction",
        title: "建筑工程",
        render: (construction: string) => construction || "-",
      },
      {
        dataIndex: "installation",
        title: "安装工程",
        render: (installation: string) => installation || "-",
      },
      {
        dataIndex: "toolsPurchase",
        title: "设备采购",
      },
      {
        dataIndex: "recordDate",
        title: "记录日期",
        render: (recordDate: string) => recordDate || "-",
      },
      {
        dataIndex: "startTime",
        title: "启用日期",
        render: (startDate: string) => startDate || "-",
      },
      {
        dataIndex: "doneTime",
        title: "竣工日期",
        render: (doneTime: string) => doneTime || "-",
      },
      {
        title: "操作",
        key: "action",
        render: (statistical: IStatistical) => (
          <div>
            <Button
              type="link"
              onClick={() => {
                this.handleEdit(statistical);
              }}
            >
              编辑
            </Button>
            <Button
              type="link"
              disabled={statistical.transFlag === 0}
              onClick={() => {
                this.setEditType("toReport");
                this.handleEdit(statistical);
              }}
            >
              转入到报表
            </Button>
          </div>
        ),
      },
    ];
  }

  @bind
  handleEdit(Statistical: IStatistical) {
    this.setEditStatistical(Statistical);
    this.setShowCreateModal(true);
  }

  @computed
  get dataSource() {
    return this.statisticaltoretore.statisticals
      ? this.statisticaltoretore.statisticals.map((statistical) => ({
          ...statistical,
          key: statistical.proName,
        }))
      : [];
  }

  componentDidMount() {
    this.addDisposer(
      reaction(
        () =>
          this.statisticaltoretore.proName ||
          this.statisticaltoretore.recordDate,
        () => {
          this.debounceListEvent();
        },
        {
          fireImmediately: true,
        }
      )
    );
    this.statisticaltoretore.listStatisticals();
  }

  render() {
    return (
      <div className="Statistical">
        <AdvancedTable
          columns={this.columns}
          dataSource={this.dataSource}
          emptyText="暂无数据"
          addBtn={{
            title: "创建",
            onClick: () => this.setShowCreateModal(true),
          }}
          searchFilters={[
            {
              placeholder: "名称",
              value: this.statisticaltoretore.proName,
              key: "proName",
              type: "string",
              onChange: this.statisticaltoretore.setProName as any,
            },
            {
              placeholder: "时间",
              value: this.statisticaltoretore.recordDate,
              key: "recordDate",
              type: "date",
              onChange: this.statisticaltoretore.setDate as any,
            },
          ]}
        />
        {this.showCreateModal && (
          <StatisticalModal
            onCancle={() => {
              this.setShowCreateModal(false);
              this.setEditStatistical(null);
            }}
            type={this.type}
            toReport={this.statisticaltoretore.toReport}
            create={this.statisticaltoretore.createStatistical}
            update={this.statisticaltoretore.updateStatistical}
            statistical={this.editStatistical}
          />
        )}
      </div>
    );
  }
}
