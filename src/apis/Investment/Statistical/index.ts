import { get, post } from 'apis'
import { API } from 'apis/constains'
import { IStatistical } from './model'

//数据统计列表
export function listStatisticals(): Promise<IStatistical[]> {
  return get(`${API}/invest/view`) as any
}

// 根据项目名称查找列表
export function listStatisticalsByName(
  proName: string,
): Promise<IStatistical[]> {
  return get(`${API}/invest/view/proName/${proName}`) as any
}

// 根据项目date查找列表
export function listStatisticalsByDate(date: number): Promise<IStatistical[]> {
  return get(`${API}/invest/view/date/${date}`) as any
}

//创建统计
export function createStatistical(params: IStatistical) {
  return post(`${API}/invest/add`, JSON.stringify(params)) as any
}

//修改统计
export function updateStatistical(statistical: IStatistical) {
  return post(`${API}/invest/update`, JSON.stringify(statistical)) as any
}

// 转入到报告表
export function toReport(statistical: IStatistical) {
  return post(`${API}/invest/toReport`, JSON.stringify(statistical)) as any
}
