import bind from 'utils/bind'
import { observable, action } from 'mobx'
import { IReport } from 'apis/Investment/Report/model'
import {
  listReportsByDate,
  listReportsByName,
  listReports,
  updateReport,
} from 'apis/Investment/Report'

import Store from '../../stores/store'

export default class ReportStore extends Store {
  @observable reports: IReport[] = []
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
  setReports(reports: IReport[]) {
    this.reports = reports
  }

  @bind
  listReports() {
    if (this.recordDate) {
      listReportsByDate(this.recordDate).then((report) => {
        this.setReports(report)
      })
    } else if (this.proName) {
      listReportsByName(this.proName).then((reports) => {
        this.setReports(reports)
      })
    } else {
      listReports().then((reports) => {
        this.setReports(reports)
      })
    }
  }

  @bind
  updateReport(report: IReport) {
    return updateReport(report).then(() => this.listReports())
  }
}
