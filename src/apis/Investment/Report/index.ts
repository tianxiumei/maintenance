import { API } from 'apis/constains'
import { get, post } from 'apis'
import { IReport } from './model'

//月报列表
export function listReports(): Promise<IReport[]> {
  return get(`${API}/report/view`) as any
}

// 根据项目名称查找列表
export function listReportsByName(proName: string): Promise<IReport[]> {
  return get(`${API}/report/view/proName/${proName}`) as any
}

// 根据项目id查找列表
export function listReportsByDate(date: number): Promise<IReport[]> {
  return get(`${API}/report/view/date/${date}`) as any
}

//修改月报
export function updateReport(decare: IReport) {
  return post(`${API}/report/update`, JSON.stringify(decare)) as any
}
