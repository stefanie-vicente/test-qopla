import styled from "styled-components";

const Drinks = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(1, 1fr);
  background: #fc8744;
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
  background-color: #f75c03;
  width: 80%;
  height: 80%;

  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }
`;

const DrinksTopBar = () => {
  const drinkTypes: string[] = ["Juice", "Soda", "Smoothie", "Milkshake"];

  const handleClick = (item: any) => {
    console.log(`You clicked on ${item}`);
  };

  return (
    <Drinks>
      {drinkTypes.map((option: string) => (
        <DrinkItem key={option} onClick={() => handleClick(option)}>
          {option}
        </DrinkItem>
      ))}
    </Drinks>
  );
};

export default DrinksTopBar;
