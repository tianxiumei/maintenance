import { message } from 'antd'
import bind from 'utils/bind'
import { observable, action } from 'mobx'
import { IPlan } from 'apis/plan/model'
import {
  listPlanByPlanNum,
  listPlanRecordDate,
  listPlans,
  updatePlan,
  project,
} from 'apis/plan'
import Store from '../../stores/store'

export class PlanStore extends Store {
  @observable plans: IPlan[] = []
  @observable planNum: number = -1
  @observable recordDate: number = -1

  @bind
  @action
  setPlanNum(planNum: number) {
    this.planNum = planNum
  }

  @bind
  @action
  setProRecordDate(recordDate: number) {
    this.recordDate = recordDate
  }

  @bind
  @action
  setPlans(plans: IPlan[]) {
    this.plans = plans
  }

  @bind
  listPlans() {
    if (this.planNum !== -1) {
      listPlanByPlanNum(this.planNum).then(plans => {
        this.setPlans(plans)
      })
    } else if (this.recordDate !== -1) {
      listPlanRecordDate(this.recordDate).then(plans => {
        this.setPlans(plans)
      })
    } else {
      listPlans().then(plans => {
        this.setPlans(plans)
      })
    }
  }

  @bind
  createPlan(plane: IPlan) {
    return project(plane).then(() => {
      this.listPlans()
      message.success('创建成功')
    })
  }
  @bind
  updatePlan(plan: IPlan) {
    return updatePlan(plan).then(() => this.listPlans())
  }
}
