import bind from 'utils/bind'
import {
  listDecares,
  deleteDecare,
  createDecare,
  updateDecare,
  listDecaresByName,
  listDecaresById,
  toPlane,
} from 'apis/maintenance'
import { observable, action } from 'mobx'
import { message } from 'antd'
import Store from '../../stores/store'
import { IDecare } from '../../apis/maintenance/model'

export class DecareStore extends Store {
  @observable decares: IDecare[] = []
  @observable proName: string = ''
  @observable id?: number

  @bind
  @action
  setProName(proName: string) {
    this.proName = proName
  }

  @bind
  @action
  setProId(id: number) {
    this.id = id
  }

  @bind
  @action
  setDecares(decares: IDecare[]) {
    this.decares = decares
  }

  @bind
  listDecares() {
    if (this.proName) {
      listDecaresByName(this.proName).then((decares) => {
        this.setDecares(decares)
      })
    } else if (this.id) {
      listDecaresById(this.id).then((decares) => {
        this.setDecares(decares)
      })
    } else {
      listDecares().then((decares) => {
        this.setDecares(decares)
      })
    }
  }

  @bind
  handleDelete(id: number) {
    deleteDecare(id).then(() => {
      this.listDecares()
      message.success('删除成功')
    })
  }
  @bind
  createDecare(decare: IDecare) {
    return createDecare(decare).then(() => this.listDecares())
  }
  @bind
  updateDecare(decare: IDecare) {
    return updateDecare(decare).then(() => this.listDecares())
  }
  @bind
  toPlane(decare: IDecare) {
    return toPlane(decare)
  }
}
