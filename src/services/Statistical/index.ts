import bind from 'utils/bind'
import { observable, action } from 'mobx'
import {
  listStatisticals,
  listStatisticalsByName,
  listStatisticalsByDate,
  createStatistical,
  toReport,
  updateStatistical,
} from 'apis/Investment/Statistical'
import { IStatistical } from 'apis/Investment/Statistical/model'
import Store from '../../stores/store'

export default class StatisticalStore extends Store {
  @observable statisticals: IStatistical[] = []
  @observable proName: string = ''
  @observable recordDate?: number

  @bind
  @action
  setProName(proName: string) {
    this.proName = proName
  }

  @bind
  @action
  setDate(recordDate: number) {
    this.recordDate = recordDate
  }

  @bind
  @action
  setStatisticals(statisticals: IStatistical[]) {
    this.statisticals = statisticals
  }

  @bind
  listStatisticals() {
    if (this.proName) {
      listStatisticalsByName(this.proName).then((statisticals) => {
        this.setStatisticals(statisticals)
      })
    } else if (this.recordDate) {
      listStatisticalsByDate(this.recordDate).then((statisticals) => {
        this.setStatisticals(statisticals)
      })
    } else {
      listStatisticals().then((statisticals) => {
        this.setStatisticals(statisticals)
      })
    }
  }

  @bind
  createStatistical(statistical: IStatistical) {
    return createStatistical(statistical).then(() => {
      this.listStatisticals()
    })
  }
  @bind
  updateStatistical(statistical: IStatistical) {
    return updateStatistical(statistical).then(() => this.listStatisticals())
  }

  @bind
  toReport(statistical: IStatistical) {
    return toReport(statistical)
  }
}
