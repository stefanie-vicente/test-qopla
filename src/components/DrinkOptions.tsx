import styled from "styled-components";

const Options = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 0px;
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
        <div
          style={{ border: "2px solid black", padding: "10px" }}
          key={index}
          onClick={() => handleClick(option)}
        >
          <p style={{ fontSize: 20 }}>{option}</p>
        </div>
      ))}
    </Options>
  );
};

export default DrinkOptions;
