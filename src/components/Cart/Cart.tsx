import { useEffect, useState } from "react";
import { useStore } from "../../context/StoreContext";
import {
  Container,
  SectionTitle,
  ProductItem,
  ProductHeader,
  Flavour,
  ActionButtons,
  ModificationsList,
  Footer,
  Total,
  PayButton,
} from "../styled-components/Cart";

const CartLateralBar = () => {
  const { cart, addToCart, removeFromCart } = useStore();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    setProducts(cart);
  }, [cart]);

  const calculateTotal = () => {
    return products.reduce((total, item) => {
      const basePrice = item.product.price;
      const modificationsPrice = item.product.modifications.reduce(
        (sum: number, mod: any) => sum + parseFloat(mod.price),
        0,
      );
      return total + (basePrice + modificationsPrice) * item.quantity;
    }, 0);
  };

  const totalPrice = calculateTotal().toFixed(2);

  return (
    <Container>
      <SectionTitle>Order</SectionTitle>
      <div>
        {products?.map(({ product, quantity }, i: number) => (
          <ProductItem key={i}>
            <ProductHeader>
              <Flavour>
                {product.flavour} {product.price} kr
              </Flavour>
              <ActionButtons>
                <Flavour>{quantity}</Flavour>
                <button
                  onClick={() => addToCart(product)}
                  data-label="Add product"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(product)}
                  data-label="Remove product"
                >
                  -
                </button>
              </ActionButtons>
            </ProductHeader>
            <ModificationsList>
              {product.modifications.map((mod: any, index: number) => (
                <li key={index}>
                  <span className="mod-details">
                    {mod.modification} (+${mod.price})
                  </span>
                </li>
              ))}
            </ModificationsList>
          </ProductItem>
        ))}
      </div>
      <Footer>
        <Total>
          <strong>Total: {totalPrice} kr</strong>
        </Total>
        {/* This alert serves as a placeholder since the payment functionality has not been implemented. */}
        <PayButton onClick={() => alert(`${totalPrice}kr paid`)}>
          Pay Now
        </PayButton>
      </Footer>
    </Container>
  );
};

export default CartLateralBar;
