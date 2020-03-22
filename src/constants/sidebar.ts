import { Modules } from "models/modules";
import maintenance from "./maintenance.png";

export interface ISideBarItem {
  key: string;
  icon?: string;
  name: string;
  link?: string;
  explain?: string;
  children?: ISideBarItem[];
}

export const originSidebarList: ISideBarItem[] = [
  {
    key: Modules.Maintenance,
    name: "维修",
    icon: maintenance
  }
];
