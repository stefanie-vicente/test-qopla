import styled from "styled-components";
import { useStore } from "../StoreContext";

const Drinks = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(1, 1fr);
  height: 100%;
  align-items: center;
  justify-items: center;
`;

const DrinkItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  background-color: #76abae;
  width: 80%;
  height: 80%;

  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }
`;

const DrinksTopBar = () => {
  const { drinksTypes, changeDrinkType } = useStore();

  const handleClick = (item: string) => {
    changeDrinkType(item);
    console.log(`You clicked on ${item}`);
  };

  return (
    <Drinks>
      {drinksTypes.map((option: string) => (
        <DrinkItem key={option} onClick={() => handleClick(option)}>
          {option}
        </DrinkItem>
      ))}
    </Drinks>
  );
};

export default DrinksTopBar;
