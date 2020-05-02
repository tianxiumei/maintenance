import React from "react";
import BasicComponent, { destroy } from "components/BasicComponent";
import { observer } from "mobx-react";
import { Popconfirm, Button } from "antd";
import { debounce } from "lodash";
import { computed, action, observable, reaction } from "mobx";
import { IProject } from "apis/project/model";
import ProjectStore from "services/Project";
import { API } from "apis/constains";
import AdvancedTable from "../../../components/Base/AdvancedTable";
import bind from "../../../utils/bind";
import { ProjectModal } from "./Modal";
import Preview from "./Preview";

@observer
export default class Project extends BasicComponent<any, any> {
  @destroy() projectStore = new ProjectStore();
  @observable editProject: IProject | null = null;
  @observable showCreateModal: boolean = false;
  @observable preview: boolean = false;
  debounceListEvent = debounce(this.projectStore.listProject, 500);

  @bind
  @action
  setShowCreateModal(showCreateModal: boolean) {
    this.showCreateModal = showCreateModal;
  }

  @bind
  @action
  setEditDecare(editProject: IProject | null) {
    this.editProject = editProject;
  }

  @bind
  @action
  setPreview(preview: boolean) {
    this.preview = preview;
  }

  @bind
  save() {
    window.open(`${API}/item/view/save`);
  }

  @computed
  get columns() {
    return [
      {
        dataIndex: "code",
        title: "编码",
      },
      {
        dataIndex: "reportOrg",
        title: "填报单位",
      },
      {
        dataIndex: "proName",
        title: "项目名称",
      },
      {
        dataIndex: "planNum",
        title: "计划批号",
      },
      {
        dataIndex: "expBudget",
        title: "费用概算",
      },
      {
        dataIndex: "propertyRes",
        title: "资产简历",
      },
      {
        dataIndex: "date1",
        title: "日期",
      },
      {
        title: "操作",
        key: "action",
        render: (project: IProject) => (
          <>
            <Button
              type="link"
              onClick={() => {
                this.handleEdit(project);
              }}
            >
              编辑
            </Button>
            <Button
              type="link"
              onClick={() => {
                this.save();
              }}
            >
              保存
            </Button>
            <Popconfirm
              title={`确定删除${project.code}?`}
              okText="确认"
              cancelText="取消"
              onConfirm={() => this.projectStore.handleDelete(project.code)}
            >
              <Button type="link">删除</Button>
            </Popconfirm>
          </>
        ),
      },
    ];
  }

  @bind
  handleEdit(project: IProject) {
    this.setEditDecare(project);
    this.setShowCreateModal(true);
  }

  @computed
  get dataSource() {
    return this.projectStore.projects
      ? this.projectStore.projects.map((project) => ({
          ...project,
          key: project.code,
        }))
      : [];
  }

  componentDidMount() {
    this.addDisposer(
      reaction(
        () => this.projectStore.code || this.projectStore.date,
        () => {
          this.debounceListEvent();
        },
        {
          fireImmediately: true,
        }
      )
    );
    this.projectStore.listProject();
  }

  render() {
    return (
      <div className="declare">
        <AdvancedTable
          columns={this.columns}
          dataSource={this.dataSource}
          emptyText="暂无数据"
          addBtn={{
            title: "创建",
            onClick: () => this.setShowCreateModal(true),
          }}
          preview={{
            title: "预览",
            onClick: () => this.setPreview(true),
          }}
          searchFilters={[
            {
              placeholder: "编码",
              value: this.projectStore.code,
              key: "display",
              type: "string",
              onChange: this.projectStore.setCode as any,
            },
            {
              placeholder: "日期",
              value: this.projectStore.date,
              key: "display",
              type: "date",
              onChange: this.projectStore.setDate as any,
            },
          ]}
        />
        {this.showCreateModal && (
          <ProjectModal
            onCancle={() => {
              this.setShowCreateModal(false);
              this.setEditDecare(null);
            }}
            create={this.projectStore.createProject}
            update={this.projectStore.updateProject}
            project={this.editProject}
          />
        )}
        {this.preview && (
          <Preview
            dataSource={this.dataSource}
            onCancel={() => {
              this.setPreview(false);
            }}
          />
        )}
      </div>
    );
  }
}
