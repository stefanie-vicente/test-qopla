import styled from "styled-components";
import { useStore } from "../StoreContext";

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
  width: 80%;
  height: 80%;

  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }
`;

const DrinkOptions = (props: { type: string }) => {
  const { drinksFlavours } = useStore();

  const filteredDrink = drinksFlavours.filter(
    (item: { flavours: any; drink: string }) => item.drink === props.type
  );

  const drinkFlavours = filteredDrink.length
    ? filteredDrink.at(-1)?.flavours
    : [];

  const handleClick = (item: any) => {
    console.log(`You clicked on ${item}`);
  };

  return (
    <Options>
      {drinkFlavours.map((option: any) => (
        <Item key={option?.name} onClick={() => handleClick(option?.name)}>
          {option?.name}
        </Item>
      ))}
    </Options>
  );
};

export default DrinkOptions;
