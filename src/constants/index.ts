export enum StorageName {
  User = 'user',
}

export interface IKeyValues<T = any> {
  [key: string]: T
}

export const dateFormat = 'YYYY-MM-DD'
