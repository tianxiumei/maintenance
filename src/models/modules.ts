export enum Modules {
  Maintenance = "maintenance",
  Investment = "investment",
  user = "User"
}

export const getAllModules = () => {
  return Object.keys(Modules).map(key => (Modules as any)[key]);
};
