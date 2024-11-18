import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Drink {
  id: number;
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

interface StoreContextType {
  drinksTypes: string[];
  drinksFlavours: any;
  drinksOptions: Drink[];
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (productId: any) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [drinksTypes, setDrinksTypes] = useState<string[]>([]);
  const [drinksOptions, setDrinksOptions] = useState<Drink[]>([]);
  const [drinksFlavours, setDrinksFlavours] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/drinksMock.json");

        const { drinks } = await response.json();

        const types = drinks.map((item: Drink) => item.name);
        const flavours = drinks.map((item: Drink) => {
          return {
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
    const fetchProducts = async () => {
      try {
        const response = await fetch("/addonsMock.json");

        const { addons } = await response.json();

        // console.log(addons);
      } catch (error) {
        console.error("Error fetching addons:", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product: any) => {
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

  const removeFromCart = (productId: number) => {
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

  return (
    <StoreContext.Provider
      value={{
        drinksTypes,
        drinksFlavours,
        drinksOptions,
        cart,
        addToCart,
        removeFromCart,
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
