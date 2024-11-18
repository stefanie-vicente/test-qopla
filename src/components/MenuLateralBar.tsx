import styled from "styled-components";

const Sidebar = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(1, 1fr);
  background: #ebce56;
  height: 100%;
  align-items: center;
  justify-items: center;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-align: center;
  background: #e6c229;
  cursor: pointer;
  width: 80%;
  height: 80%;

  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }
`;

const MenuLateralBar = () => {
  const menuOptions: string[] = [
    "Meals",
    "Sides",
    "Drinks",
    "Desserts",
    "Sauces",
  ];

  const handleClick = (item: string) => {
    console.log(`You clicked on ${item}`);
  };

  return (
    <Sidebar>
      {menuOptions.map((option: string) => (
        <MenuItem key={option} onClick={() => handleClick(option)}>
          {option}
        </MenuItem>
      ))}
    </Sidebar>
  );
};

export default MenuLateralBar;
