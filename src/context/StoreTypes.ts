export interface Drink {
  id: string;
  name: string;
  price: number;
  modifications: DrinkModification;
}

export interface DrinkModification {
  size: DrinkModificationOptions[];
  flavours: DrinkModificationOptions[];
}

export interface DrinkModificationOptions {
  name: string;
  addonPrice: number;
}

export interface CartItem {
  product: Drink;
  quantity: number;
}

export interface Addon {
  addon: {
    name: string;
    price: string;
  };
  limit: number;
  sortOrder: number;
}

export interface AddonCategory {
  name: string;
  limit: number;
  sortOrder: number;
  refProductIds: string[];
  addons: Addon[];
}

export interface GroupedResult {
  drinkId: string;
  drinkName: string;
  addons: AddonCategory[];
}

export interface StoreContextType {
  addToCart: (product: Drink) => void;
  addonCategories: AddonCategory[];
  cart: CartItem[];
  changeDrinkType: (type: string) => void;
  closeModalOnClick: () => void;
  filterByDrinkId: (
    groupedResults: GroupedResult[],
    drinkId: string
  ) => GroupedResult | undefined;
  groupByRefProductId: (
    addonsData: AddonCategory[],
    drinksData: Drink[]
  ) => GroupedResult[];
  drinksFlavours: any;
  drinksOptions: Drink[];
  drinksTypes: string[];
  modalDrink: any;
  openModal: boolean;
  openModalOnClick: (option: any) => void;
  removeFromCart: (productId: string) => void;
  selectedDrinkType: string;
  setSelectedDrinkType: (type: string) => void;
}
