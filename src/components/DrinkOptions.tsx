import styled from "styled-components";

const Options = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  background: #5cb8e4;
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
  background-color: #1d84b5;
  width: 80%;
  height: 80%;

  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }
`;

const DrinkOptions = () => {
  const drinkFlavours: string[] = [
    "Coca",
    "Sprite",
    "Fanta",
    "Coca Zero",
    "Sprite Zero",
    "Fanta Zero",
  ];

  const handleClick = (item: any) => {
    console.log(`You clicked on ${item}`);
  };

  const totalCells = 16;

  const cellsToRender = [
    ...drinkFlavours,
    ...Array(totalCells - drinkFlavours.length).fill(null),
  ];

  return (
    <Options>
      {cellsToRender.map((option: string, index: number) => (
        <Item key={index} onClick={() => handleClick(option)}>
          {option}
        </Item>
      ))}
    </Options>
  );
};

export default DrinkOptions;
