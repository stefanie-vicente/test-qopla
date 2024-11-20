import { DrinkId } from "./DrinkInterface";

export interface AddonType {
  name: string;
  limit: number;
  sortOrder: number;
  refProductIds: DrinkId[];
  addons: Addon[];
}

export interface Addon {
  addon: AddonDetails;
  limit: number;
  sortOrder: number;
}

export interface AddonDetails {
  name: string;
  price: number;
}

export interface AddonGroup {
  name: string;
  addons: {
    addon: Addon;
  }[];
}
