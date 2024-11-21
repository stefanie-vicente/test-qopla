import { useEffect, useState } from "react";
import { useStore } from "../../context/StoreContext";
import styled from "styled-components";

const CartContainer = styled.div`
  border: 2px solid #777;
  background-color: #121212;
  color: #f5f5f5;
  padding: 16px;
  border-radius: 5px;
`;

const SectionTitle = styled.h3`
  color: #e0e0e0;
`;

const StyledButton = styled.button`
  background-color: #333;
  color: #f5f5f5;
  border: 1px solid #444;
  border-radius: 5px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }

  &:active {
    background-color: #777;
  }
`;

const PayButton = styled(StyledButton)`
  width: 100%;
  margin-top: 12px;
  background-color: #0066cc;

  &:hover {
    background-color: #004085;
  }
`;

const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 12px;
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Flavour = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #f5f5f5;
  margin: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 8px;

  button {
    background-color: #333;
    color: #f5f5f5;
    border: 1px solid #444;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    position: relative;
    transition: background-color 0.3s;

    &:hover {
      background-color: #555;
    }

    &:active {
      background-color: #777;
    }

    &::after {
      content: attr(data-label);
      position: absolute;
      top: -24px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #444;
      color: #f5f5f5;
      font-size: 10px;
      padding: 2px 4px;
      border-radius: 5px;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s;
    }

    &:hover::after {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const ModificationsList = styled.ul`
  margin: 8px 0 0;
  padding: 0;
  list-style: none;

  li {
    font-size: 12px;
    color: #cfcfcf;
    margin-bottom: 8px;
    display: flex;
    flex-direction: row;
  }

  .mod-details {
    font-size: 11px;
    color: #a8a8a8;
  }
`;

const Footer = styled.div`
  margin-top: 16px;
  text-align: center;

  button {
    ${StyledButton}
    width: 100%;
    padding: 8px 16px;
  }
`;

const Total = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  margin: 0;
`;

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
        0
      );
      return total + (basePrice + modificationsPrice) * item.quantity;
    }, 0);
  };

  const totalPrice = calculateTotal().toFixed(2);

  return (
    <CartContainer>
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
    </CartContainer>
  );
};

export default CartLateralBar;
