import React from "react";
import { Button } from "antd";
import { debounce } from "lodash";
import { observer } from "mobx-react";
import { computed, action, observable, reaction } from "mobx";
import BasicComponent, { destroy } from "components/BasicComponent";
import UserStore from "services/User";
import { IUser } from "apis/user/model";
import bind from "../../utils/bind";
import AdvancedTable from "../../components/Base/AdvancedTable";
import UserModal from "./Modal";

@observer
export default class User extends BasicComponent<any, any> {
  @destroy() userStore = new UserStore();
  @observable editUser: IUser | null = null;
  @observable showCreateModal: boolean = false;
  debounceListEvent = debounce(this.userStore.listUsers, 500);

  @bind
  @action
  setShowCreateModal(showCreateModal: boolean) {
    this.showCreateModal = showCreateModal;
  }

  @bind
  @action
  setEditUser(editUser: IUser | null) {
    this.editUser = editUser;
  }

  @computed
  get columns() {
    return [
      {
        dataIndex: "username",
        title: "用户名",
      },
      {
        dataIndex: "realname",
        title: "真名",
      },
      {
        dataIndex: "password",
        title: "密码",
      },
      {
        dataIndex: "partment",
        title: "部门",
      },
      {
        dataIndex: "roleID",
        title: "角色ID",
      },
      {
        dataIndex: "status",
        title: "状态",
      },
      {
        title: "操作",
        key: "action",
        render: (user: IUser) => (
          <div>
            <Button
              type="link"
              onClick={() => {
                this.handleEdit(user);
              }}
            >
              编辑
            </Button>
            <Button
              type="link"
              onClick={() => {
                this.userStore.resetUser(user);
              }}
            >
              重置密码
            </Button>
            <Button
              type="link"
              onClick={() => {
                this.userStore.deleteUser(user.username);
              }}
            >
              删除
            </Button>
          </div>
        ),
      },
    ];
  }

  @bind
  handleEdit(user: IUser) {
    this.setEditUser(user);
    this.setShowCreateModal(true);
  }

  @computed
  get dataSource() {
    return this.userStore.users
      ? this.userStore.users.map((user) => ({
          ...user,
          key: user.username,
        }))
      : [];
  }

  componentDidMount() {
    this.addDisposer(
      reaction(
        () => this.userStore.realname,
        () => {
          this.debounceListEvent();
        },
        {
          fireImmediately: true,
        }
      )
    );
    this.userStore.listUsers();
  }

  render() {
    return (
      <div className="user">
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
              placeholder: "真实名称",
              value: this.userStore.realname,
              key: "realname",
              type: "string",
              onChange: this.userStore.setRealname as any,
            },
          ]}
        />
        {this.showCreateModal && (
          <UserModal
            onCancle={() => {
              this.setShowCreateModal(false);
              this.setEditUser(null);
            }}
            add={this.userStore.addUser}
            update={this.userStore.updateUser}
            user={this.editUser}
          />
        )}
      </div>
    );
  }
}
