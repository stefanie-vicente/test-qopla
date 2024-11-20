import styled from "styled-components";
import { useStore } from "../context/StoreContext";

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
  border-radius: 5px;

  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }
`;

const DrinksTopBar = () => {
  const { drinksTypes, setSelectedDrinkType } = useStore();

  const handleClick = (item: string) => {
    setSelectedDrinkType(item);
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
