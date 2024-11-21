import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Product } from '../interfaces/ProductInterface';
import { CartProduct } from '../interfaces/CartInterface';
import { AddonType } from '../interfaces/AddonInterface';
import { ModalData, StoreContextType, GroupedResult } from './StoreTypes';
import {
  filterByProductId,
  groupByRefProductId,
  transformProductData,
} from './helpers';

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [drinks, setDrinks] = useState<Product[]>([]);
  const [drinksTypes, setDrinksTypes] = useState<string[]>([]);
  // can be changed according to the default menu item
  const [selectedProductType, setSelectedProductType] =
    useState<string>('Soda');
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [addonCategories, setAddonCategories] = useState<AddonType[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData>();

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await fetch('/drinksMock.json');
        const { drinks } = await response.json();

        const types = drinks.map((drink: Product) => drink.name);

        setDrinksTypes(types);
        setDrinks(drinks);
      } catch (error) {
        console.error('Error fetching drinks:', error);
      }
    };

    fetchDrinks();
  }, []);

  useEffect(() => {
    const fetchAddons = async () => {
      try {
        const response = await fetch('/addonsMock.json');
        const { addons } = await response.json();
        setAddonCategories(addons);
      } catch (error) {
        console.error('Error fetching addons:', error);
      }
    };

    fetchAddons();
  }, []);

  const removeFromCart = (product: CartProduct) => {
    setCart((prevCart: CartProduct[]) => {
      const existingItem: CartProduct | undefined = prevCart.find(
        (item: any) =>
          item.product.id === product.id &&
          item.product.flavour === product.flavour &&
          JSON.stringify(item.product.modifications) ===
            JSON.stringify(product.modifications),
      );

      if (existingItem && existingItem.quantity) {
        if (existingItem.quantity > 1) {
          return prevCart.map((item: any) =>
            item.product.id === product.id &&
            item.product.flavour === product.flavour &&
            JSON.stringify(item.product.modifications) ===
              JSON.stringify(product.modifications)
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          );
        } else {
          return prevCart.filter(
            (item: any) =>
              !(
                item.product.id === product.id &&
                item.product.flavour === product.flavour &&
                JSON.stringify(item.product.modifications) ===
                  JSON.stringify(product.modifications)
              ),
          );
        }
      }

      return prevCart;
    });
  };

  const addToCart = (product: CartProduct) => {
    setCart((prevCart: CartProduct[]) => {
      const existingItem = prevCart.find(
        (item: any) =>
          item.product.id === product.id &&
          item.product.flavour === product.flavour &&
          JSON.stringify(item.product.modifications) ===
            JSON.stringify(product.modifications),
      );

      if (existingItem) {
        return prevCart.map((item: any) =>
          item.product.id === product.id &&
          item.product.flavour === product.flavour &&
          JSON.stringify(item.product.modifications) ===
            JSON.stringify(product.modifications)
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const productById = groupByRefProductId(addonCategories, drinks);

  const openModalOnClick = (id: string, flavour: string) => {
    const productGroup: GroupedResult | undefined = filterByProductId(
      productById,
      id,
    );
    if (productGroup) {
      const transformedData = transformProductData(productGroup, flavour);
      setModalData(transformedData);
      setOpenModal(true);
    } else {
      console.error('Product group not found for id:', id);
    }
  };

  const closeModalOnClick = () => {
    setOpenModal(false);
    setModalData(undefined);
  };

  return (
    <StoreContext.Provider
      value={{
        drinksTypes,
        drinks,
        selectedProductType,
        setSelectedProductType,
        cart,
        addToCart,
        removeFromCart,
        filterByProductId,
        openModal,
        openModalOnClick,
        closeModalOnClick,
        modalData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
