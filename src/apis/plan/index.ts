import { get, post } from '..'
import { API } from '../constains'
import { IPlan } from './model'

//维修计划列表
export function listPlans(): Promise<IPlan[]> {
  return get(`${API}/plan/view`)
}

// 根据维修计划编号查找列表
export function listPlanByPlanNum(planNum: number): Promise<IPlan[]> {
  return get(`${API}/plan/planNum/${planNum}`)
}

// 根据维修recordDate查找列表
export function listPlanRecordDate(recordDate: number): Promise<IPlan[]> {
  return get(`${API}/plan/recordDate/${recordDate}`)
}

// 立项
export function project(params: IPlan) {
  return post(`${API}/plan/item`, JSON.stringify(params))
}

//修改数据申报
export function updatePlan(plan: IPlan) {
  return post(`${API}/plan/update`, JSON.stringify(plan))
}
