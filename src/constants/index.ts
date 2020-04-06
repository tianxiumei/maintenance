export enum StorageName {
  RoleID = "roleID",
}

export interface IKeyValues<T = any> {
  [key: string]: T;
}
