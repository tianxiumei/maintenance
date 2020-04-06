import { get, post } from "..";
import { API } from "../constains";
import { IDecare } from "./model";

//数据申报列表
export function listDecares(): Promise<IDecare[]> {
  return get(`${API}/reg/view`) as any;
}

// 根据项目名称查找列表
export function listDecaresByName(proName: string): Promise<IDecare[]> {
  return get(`${API}/reg/proName/${proName}`) as any;
}

//创建数据申报
export function createDecare(params: IDecare) {
  return post(`${API}/reg/add`, JSON.stringify(params)) as any;
}

//删除数据申报
export function deleteDecare(id: number) {
  return get(`${API}/reg/del/${id}`) as any;
}

//修改数据申报
export function updateDecare(decare: IDecare) {
  return post(`${API}/reg/update`, JSON.stringify(decare)) as any;
}

//查找数据申报
export function findleDecare(id: string): Promise<IDecare> {
  return get(`${API}/reg/view/Id/${id}`) as any;
}
