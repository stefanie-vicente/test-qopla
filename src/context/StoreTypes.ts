import { Drink } from "../interfaces/DrinkInterface";
import { Addon, AddonType } from "../interfaces/AddonInterface";

export interface CartItem {
  product: Drink;
  quantity: number;
}

export interface GroupedResult {
  drinkId: string;
  drinkName: string;
  addons: AddonType[];
}

export interface ModalDrink {
  drinkId: string;
  drinkName: string;
  drinkFlavour: string;
  drinkPrice: number;
  addons?: any;
}
export type InputAddon = {
  name: string;
  limit: number;
  sortOrder: number;
  refProductIds: string[];
  addons: Addon[];
};

export type InputDrink = {
  drinkId: string;
  drinkName: string;
  addons: InputAddon[];
};

export type OutputDrink = {
  drinkId: string;
  drinkName: string;
  drinkFlavour: string;
  drinkPrice: number;
  addons: {
    [key: string]: {
      limit: number;
      types: {
        [addonName: string]: number;
      };
    };
  };
};

export interface StoreContextType {
  addToCart: (product: Drink) => void;
  cart: CartItem[];
  closeModalOnClick: () => void;
  filterByDrinkId: (
    groupedResults: GroupedResult[],
    drinkId: string
  ) => GroupedResult | undefined;
  drinks: Drink[];
  drinksTypes: string[];
  modalDrink?: ModalDrink;
  openModal: boolean;
  openModalOnClick: (id: string, flavour: string) => void;
  removeFromCart: (productId: string) => void;
  selectedDrinkType: string;
  setSelectedDrinkType: (type: string) => void;
}
