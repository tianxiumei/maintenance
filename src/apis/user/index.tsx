import { formatURL } from "utils/url";
import { ILoginParams, ILoginRespone } from "./model";
import { API } from "../constains";
import { get } from "..";

export function login(params: ILoginParams): Promise<ILoginRespone> {
  return get(formatURL(`${API}/login`, params));
}
