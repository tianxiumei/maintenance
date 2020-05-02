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
  @observable planNum?: number
  @observable recordDate?: number

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
    if (this.planNum) {
      listPlanByPlanNum(this.planNum).then((plans) => {
        this.setPlans(plans)
      })
    } else if (this.recordDate) {
      listPlanRecordDate(this.recordDate).then((plans) => {
        this.setPlans(plans)
      })
    } else {
      listPlans().then((plans) => {
        this.setPlans(plans)
      })
    }
  }

  @bind
  createPlan(plane: IPlan) {
    return project(plane).then(() => {
      this.listPlans()
    })
  }
  @bind
  project(plane: IPlan) {
    return project(plane).then(() => {
      this.listPlans()
    })
  }
  @bind
  updatePlan(plan: IPlan) {
    return updatePlan(plan).then(() => this.listPlans())
  }
}
