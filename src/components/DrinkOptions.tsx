import styled from "styled-components";
import { useStore } from "../context/StoreContext";

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

const DrinkOptions = () => {
  const { drinksFlavours, selectedDrinkType, openModalOnClick } = useStore();

  const filteredDrink = drinksFlavours.filter(
    (item: { flavours: any; drink: string; id: string }) =>
      item.drink === selectedDrinkType
  );

  const drinkFlavours = filteredDrink.length ? filteredDrink.at(-1) : [];

  const test = () => {
    openModalOnClick(filteredDrink[0].id);
  };

  return (
    <Options>
      {drinkFlavours?.flavours?.map((option: any) => (
        <Item key={option?.name} onClick={test}>
          {option?.name}
        </Item>
      ))}
    </Options>
  );
};

export default DrinkOptions;
