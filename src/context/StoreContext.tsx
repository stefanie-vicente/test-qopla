import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  Drink,
  CartItem,
  AddonCategory,
  StoreContextType,
  GroupedResult,
} from "./StoreTypes";
import {
  filterByDrinkId,
  groupByRefProductId,
  transformDrinkData,
} from "./helpers";

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedDrinkType, setSelectedDrinkType] = useState<string>("Soda");
  const [drinksTypes, setDrinksTypes] = useState<string[]>([]);
  const [drinksOptions, setDrinksOptions] = useState<Drink[]>([]);
  const [drinksFlavours, setDrinksFlavours] = useState<any[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addonCategories, setAddonCategories] = useState<AddonCategory[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalDrink, setModalDrink] = useState<any>(null);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await fetch("/drinksMock.json");
        const { drinks } = await response.json();

        const types = drinks.map((drink: Drink) => drink.name);
        const flavours = drinks.map((drink: Drink) => ({
          id: drink.id,
          drink: drink.name,
          flavours: drink.modifications.flavours,
        }));

        setDrinksTypes(types);
        setDrinksOptions(drinks);
        setDrinksFlavours(flavours);
      } catch (error) {
        console.error("Error fetching drinks:", error);
      }
    };

    fetchDrinks();
  }, []);

  useEffect(() => {
    const fetchAddons = async () => {
      try {
        const response = await fetch("/addonsMock.json");
        const { addons } = await response.json();
        setAddonCategories(addons);
      } catch (error) {
        console.error("Error fetching addons:", error);
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

  const productById = groupByRefProductId(addonCategories, drinksOptions);

  const openModalOnClick = (id: string) => {
    const drinkGroup: GroupedResult | undefined = filterByDrinkId(
      productById,
      id
    );
    if (drinkGroup) {
      const transformedData = transformDrinkData(drinkGroup);
      setModalDrink(transformedData);
      setOpenModal(true);
    } else {
      console.error("Drink group not found for id:", id);
    }
  };

  const closeModalOnClick = () => {
    setOpenModal(false);
    setModalDrink(null);
  };

  return (
    <StoreContext.Provider
      value={{
        drinksTypes,
        drinksFlavours,
        drinksOptions,
        selectedDrinkType,
        setSelectedDrinkType,
        cart,
        addToCart,
        removeFromCart,
        changeDrinkType: (type: string) => setSelectedDrinkType(type),
        addonCategories,
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
