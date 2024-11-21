import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Drink, DrinkCart } from "../interfaces/DrinkInterface";
import { AddonType } from "../interfaces/AddonInterface";
import { ModalDrink, StoreContextType, GroupedResult } from "./StoreTypes";
import {
  filterByDrinkId,
  groupByRefProductId,
  transformDrinkData,
} from "./helpers";

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [drinksTypes, setDrinksTypes] = useState<string[]>([]);
  const [selectedDrinkType, setSelectedDrinkType] = useState<string>("Soda");
  const [cart, setCart] = useState<DrinkCart[]>([]);
  const [addonCategories, setAddonCategories] = useState<AddonType[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalDrink, setModalDrink] = useState<ModalDrink>();

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await fetch("/drinksMock.json");
        const { drinks } = await response.json();

        const types = drinks.map((drink: Drink) => drink.name);

        setDrinksTypes(types);
        setDrinks(drinks);
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

  const removeFromCart = (product: DrinkCart) => {
    setCart((prevCart: DrinkCart[]) => {
      const existingItem: DrinkCart | undefined = prevCart.find(
        (item: any) =>
          item.product.typeId === product.typeId &&
          item.product.flavour === product.flavour &&
          JSON.stringify(item.product.modifications) ===
            JSON.stringify(product.modifications)
      );

      if (existingItem && existingItem.quantity) {
        if (existingItem.quantity > 1) {
          return prevCart.map((item: any) =>
            item.product.typeId === product.typeId &&
            item.product.flavour === product.flavour &&
            JSON.stringify(item.product.modifications) ===
              JSON.stringify(product.modifications)
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          return prevCart.filter(
            (item: any) =>
              !(
                item.product.typeId === product.typeId &&
                item.product.flavour === product.flavour &&
                JSON.stringify(item.product.modifications) ===
                  JSON.stringify(product.modifications)
              )
          );
        }
      }

      return prevCart;
    });
  };

  const addToCart = (product: DrinkCart) => {
    setCart((prevCart: DrinkCart[]) => {
      const existingItem = prevCart.find(
        (item: any) =>
          item.product.typeId === product.typeId &&
          item.product.flavour === product.flavour &&
          JSON.stringify(item.product.modifications) ===
            JSON.stringify(product.modifications)
      );

      if (existingItem) {
        return prevCart.map((item: any) =>
          item.product.typeId === product.typeId &&
          item.product.flavour === product.flavour &&
          JSON.stringify(item.product.modifications) ===
            JSON.stringify(product.modifications)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const productById = groupByRefProductId(addonCategories, drinks);

  const openModalOnClick = (id: string, flavour: string) => {
    const drinkGroup: GroupedResult | undefined = filterByDrinkId(
      productById,
      id
    );
    if (drinkGroup) {
      const transformedData = transformDrinkData(drinkGroup, flavour);
      setModalDrink(transformedData);
      setOpenModal(true);
    } else {
      console.error("Drink group not found for id:", id);
    }
  };

  const closeModalOnClick = () => {
    setOpenModal(false);
    setModalDrink(undefined);
  };

  return (
    <StoreContext.Provider
      value={{
        drinksTypes,
        drinks,
        selectedDrinkType,
        setSelectedDrinkType,
        cart,
        addToCart,
        removeFromCart,
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
