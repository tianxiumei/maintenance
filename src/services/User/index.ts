import bind from 'utils/bind'
import { observable, action } from 'mobx'
import { IUser } from 'apis/user/model'
import {
  listUsersByealName,
  listUsers,
  addUser,
  updateUser,
  deleteUser,
  resetUser,
} from 'apis/user'
import Store from '../../stores/store'
import { message } from 'antd'

export default class UserStore extends Store {
  @observable users: IUser[] = []
  @observable realname: string = ''

  @bind
  @action
  setRealname(realname: string) {
    this.realname = realname
  }

  @bind
  @action
  setuser(users: IUser[]) {
    this.users = users
  }

  @bind
  listUsers() {
    if (this.realname) {
      listUsersByealName(this.realname).then((users) => {
        this.setuser(users)
      })
    } else {
      listUsers().then((users) => {
        this.setuser(users)
      })
    }
  }

  @bind
  addUser(user: IUser) {
    return addUser(user).then(() => {
      this.listUsers()
    })
  }
  @bind
  updateUser(statistical: IUser) {
    return updateUser(statistical).then(() => this.listUsers())
  }

  @bind
  deleteUser(userName: string) {
    return deleteUser(userName).then(() => {
      this.listUsers()
      message.success('删除成功')
    })
  }

  @bind
  resetUser(user: IUser) {
    return resetUser(user).then(() => {
      this.listUsers()
    })
  }
}
