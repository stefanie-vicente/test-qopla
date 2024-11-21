import { Product } from "../interfaces/ProductInterface";
import { CartProduct } from "../interfaces/CartInterface";
import { Addon, AddonType } from "../interfaces/AddonInterface";
export interface GroupedResult {
  id: string;
  name: string;
  price: number;
  addons: AddonType[];
}

export interface ModalData {
  id: string;
  name: string;
  flavour: string;
  price: number;
  addons?: any;
}
export type InputAddon = {
  name: string;
  limit: number;
  sortOrder: number;
  refProductIds: string[];
  addons: Addon[];
};

export type InputProduct = {
  id: string;
  name: string;
  price: number;
  addons: InputAddon[];
};

export type OutputProduct = {
  id: string;
  name: string;
  flavour: string;
  price: number;
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
  addToCart: (product: CartProduct) => void;
  cart: CartProduct[];
  closeModalOnClick: () => void;
  filterByProductId: (
    groupedResults: GroupedResult[],
    id: string,
  ) => GroupedResult | undefined;
  drinks: Product[];
  drinksTypes: string[];
  modalData?: ModalData;
  openModal: boolean;
  openModalOnClick: (id: string, flavour: string) => void;
  removeFromCart: (product: CartProduct) => void;
  selectedProductType: string;
  setSelectedProductType: (type: string) => void;
}
