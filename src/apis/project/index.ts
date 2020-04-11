import { get, post } from '..'
import { API } from '../constains'
import { IProject } from './model'

//数据立项表
export function listProjects(): Promise<IProject[]> {
  return get(`${API}/item/view`)
}

// 根据code查找列表
export function listProjectCode(code: string): Promise<IProject[]> {
  return get(`${API}/item/view/code/${code}`)
}

// 根据date查找列表
export function listProjectByDate(date: string): Promise<IProject[]> {
  return get(`${API}/item/view/date/${date}`)
}

//创建立项
export function createProject(params: IProject) {
  return post(`${API}/item/add`, JSON.stringify(params))
}

//删除立项
export function deleteProject(code: string) {
  return get(`${API}/item/del/${code}`)
}

//修改数据申报
export function updateProject(project: IProject) {
  return post(`${API}/item/update`, JSON.stringify(project)) as any
}
