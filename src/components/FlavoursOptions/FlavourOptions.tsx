import styled from "styled-components";
import { useStore } from "../../context/StoreContext";
import { Product, ProductFlavour } from "../../interfaces/ProductInterface";

const Options = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  width: 100%;
  height: 100%;
  align-items: center;
  justify-items: center;
`;

const Item = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  font-size: 18px;
  background-color: #d14d6a;
  border-radius: 5px;
  width: 80%;
  height: 80%;
  color: #f5f5f5;
  border: none;
  outline: none;

  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
    outline: 2px solid #ffcc00;
  }
`;

const FlavourOptions = () => {
  const { drinks, selectedProductType, openModalOnClick } = useStore();

  const filteredDrink = drinks.filter(
    (drink: Product) => drink.name === selectedProductType
  );

  const drinkFlavours =
    filteredDrink.length > 0 ? filteredDrink[0]?.modifications?.flavours : [];

  const handleFlavourSelect = (flavour: string) => {
    openModalOnClick(filteredDrink[0].id, flavour);
  };

  return (
    <Options>
      {drinkFlavours?.map((flavour: ProductFlavour) => (
        <Item
          key={flavour?.name}
          onClick={() => handleFlavourSelect(flavour.name)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleFlavourSelect(flavour.name);
            }
          }}
          aria-label={`Select flavour: ${flavour.name}`}
          role="button"
          tabIndex={0}
        >
          {flavour?.name}
        </Item>
      ))}
    </Options>
  );
};

export default FlavourOptions;
