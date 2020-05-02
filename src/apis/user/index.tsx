import { formatURL } from "utils/url";
import { ILoginParams, ILoginRespone, IUser } from "./model";
import { API } from "../constains";
import { get, post } from "..";

export function login(params: ILoginParams): Promise<ILoginRespone> {
  return get(formatURL(`${API}/login`, params));
}
export function listUsers(): Promise<IUser[]> {
  return get(formatURL(`${API}/user/view/all`));
}

export function listUsersByealName(realName: string): Promise<IUser[]> {
  return get(formatURL(`${API}/user/view/realname/${realName}`));
}

//添加用户
export function addUser(params: IUser) {
  return post(`${API}/user/add`, JSON.stringify(params));
}

//修改用户
export function updateUser(params: IUser) {
  return post(`${API}/user/update`, JSON.stringify(params));
}

//重置密码
export function resetUser(params: IUser) {
  return post(`${API}/user/reset`, JSON.stringify(params));
}

//重置密码
export function deleteUser(username: string) {
  return get(`${API}/user/del/${username}`);
}
