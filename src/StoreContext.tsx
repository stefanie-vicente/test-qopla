import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Drink {
  id: string;
  name: string;
  price: number;
  modifications: DrinkModification;
}

interface DrinkModification {
  size: DrinkModificationOptions[];
  flavours: DrinkModificationOptions[];
}

interface DrinkModificationOptions {
  name: string;
  addonPrice: number;
}

interface CartItem {
  product: Drink;
  quantity: number;
}

type Addon = {
  addon: {
    name: string;
    price: string;
  };
  limit: number;
  sortOrder: number;
};

type AddonCategory = {
  name: string;
  limit: number;
  sortOrder: number;
  refProductIds: string[];
  addons: Addon[];
};

type GroupedResult = {
  drinkId: string;
  drinkName: string;
  addons: AddonCategory[];
};

interface StoreContextType {
  drinksTypes: string[];
  drinksFlavours: any;
  drinksOptions: Drink[];
  selectedDrinkType: string;
  setSelectedDrinkType: (type: string) => void;
  cart: CartItem[];
  addToCart: (product: Drink) => void;
  removeFromCart: (productId: string) => void;
  changeDrinkType: (type: string) => void;
  groupByRefProductId: (
    addonsData: { addons: AddonCategory[] }[],
    drinksData: { drinks: Drink[] }
  ) => GroupedResult[];
  filterByDrinkId: (
    groupedResults: GroupedResult[],
    drinkId: string
  ) => GroupedResult | undefined;
  openModal: Boolean;
  openModalOnClick: any;
  closeModalOnClick: any;
  modalDrink: any;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedDrinkType, setSelectedDrinkType] = useState<string>("Soda");
  const [drinksTypes, setDrinksTypes] = useState<string[]>([]);
  const [drinksOptions, setDrinksOptions] = useState<Drink[]>([]);
  const [drinksFlavours, setDrinksFlavours] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addon, setAddon] = useState<AddonCategory[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalDrink, setModalDrink] = useState<any>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/drinksMock.json");

        const { drinks } = await response.json();

        const types = drinks.map((item: Drink) => item.name);
        const flavours = drinks.map((item: Drink) => {
          return {
            id: item.id,
            drink: item.name,
            flavours: item.modifications.flavours,
          };
        });
        setDrinksTypes(types);
        setDrinksOptions(drinks);
        setDrinksFlavours(flavours);
      } catch (error) {
        console.error("Error fetching drinks:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchAddons = async () => {
      try {
        const response = await fetch("/addonsMock.json");

        const { addons } = await response.json();

        setAddon(addons);
      } catch (error) {
        console.error("Error fetching drinks:", error);
      }
    };

    fetchAddons();
  }, []);

  const addToCart = (product: Drink) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const changeDrinkType = (type: string) => setSelectedDrinkType(type);

  const openModalOnClick = (option: React.SetStateAction<undefined>) => {
    setModalDrink(option);
    setOpenModal(true);
  };

  const closeModalOnClick = () => {
    setOpenModal(false);
    setModalDrink([]);
  };

  // Function to group add-ons by refProductId
  const groupByRefProductId = (
    addonsData: { addons: AddonCategory[] }[],
    drinksData: { drinks: Drink[] }
  ) => {
    const groupedResults: GroupedResult[] = [];

    // Iterate over each drink in the drinks data
    drinksData.drinks.forEach((drink) => {
      const drinkId = drink.id;
      const drinkName = drink.name;

      // Filter the addon categories that match the drink's refProductId
      const matchingAddonCategories = addonsData
        .flatMap((addonCategory) => addonCategory.addons)
        .filter((addonCategory) =>
          addonCategory.refProductIds.includes(drinkId)
        );

      if (matchingAddonCategories.length > 0) {
        groupedResults.push({
          drinkId: drinkId,
          drinkName: drinkName,
          addons: matchingAddonCategories,
        });
      }
    });

    return groupedResults;
  };

  // Function to filter the grouped results by drinkId
  const filterByDrinkId = (
    groupedResults: GroupedResult[],
    drinkId: string
  ): GroupedResult | undefined => {
    // Find the group that matches the given drinkId
    return groupedResults.find((group) => group.drinkId === drinkId);
  };

  return (
    <StoreContext.Provider
      value={{
        drinksTypes,
        drinksFlavours,
        drinksOptions,
        cart,
        selectedDrinkType,
        setSelectedDrinkType,
        changeDrinkType,
        addToCart,
        removeFromCart,
        groupByRefProductId,
        filterByDrinkId,
        openModal,
        openModalOnClick,
        closeModalOnClick,
        modalDrink,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
