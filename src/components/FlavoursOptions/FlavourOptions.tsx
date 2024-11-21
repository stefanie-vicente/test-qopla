import styled from "styled-components";
import { useStore } from "../../context/StoreContext";
import { Drink, DrinkFlavour } from "../../interfaces/DrinkInterface";

const Options = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  height: 100%;
  align-items: center;
  justify-items: center;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  background-color: #76abae;
  border-radius: 5px;
  width: 80%;
  height: 80%;

  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }
`;

// change selectedDrinkType to id
const FlavourOptions = () => {
  const { drinks, selectedDrinkType, openModalOnClick } = useStore();

  const filteredDrink = drinks.filter(
    (drink: Drink) => drink.name === selectedDrinkType
  );

  const drinkFlavours =
    filteredDrink.length > 0 ? filteredDrink[0]?.modifications?.flavours : [];

  const test = (flavour: string) => {
    openModalOnClick(filteredDrink[0].id, flavour);
  };

  return (
    <Options>
      {drinkFlavours?.map((flavour: DrinkFlavour) => (
        <Item key={flavour?.name} onClick={() => test(flavour.name)}>
          {flavour?.name}
        </Item>
      ))}
    </Options>
  );
};

export default FlavourOptions;
