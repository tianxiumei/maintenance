import { get } from "..";
import { API } from "../constains";
import { IDecare } from "./model";

export function listDecares(): Promise<IDecare[]> {
  return get(`${API}demo/reg/findall`) as any;
}
