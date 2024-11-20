export interface Drink {
  id: DrinkId;
  name: string;
  price: number;
  modifications?: Modifications;
}
export interface Modifications {
  size: ModificationOption[];
  flavours: ModificationOption[];
}

export interface ModificationOption {
  name: string;
  addonPrice: number;
}

export interface Modification {
  sizes: DrinkSize;
  flavours: DrinkFlavour;
}

export interface DrinkSize {
  name: string;
  addonPrice: number;
}

export interface DrinkFlavour {
  name: string;
  addonPrice: number;
}

export type DrinkId =
  | "a_very_unique_soda_id"
  | "a_very_unique_smoothie_id"
  | "a_very_unique_milkshake_id"
  | "a_very_unique_juice_id";
