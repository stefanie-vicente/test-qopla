import styled from "styled-components";

const Drinks = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(1, 1fr);
  gap: 0px;
`;

const DrinksTopBar = () => {
  const drinkTypes: string[] = ["Juice", "Soda", "Smoothie", "Milkshake"];

  const handleClick = (item: any) => {
    console.log(`You clicked on ${item}`);
  };

  return (
    <Drinks>
      {drinkTypes.map((option: string) => (
        <div
          style={{ border: "2px solid black", padding: "10px" }}
          key={option}
          onClick={() => handleClick(option)}
        >
          <p style={{ fontSize: 20 }}>{option}</p>
        </div>
      ))}
    </Drinks>
  );
};

export default DrinksTopBar;
