import styled from "styled-components";

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border: 1px solid black;
  border-radius: 8px;
  height: 100%;
  background-color: #ebce56;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-align: center;
  background: #e6c229;
  padding: 30px;
  cursor: pointer;
  border: 1px;
  border-radius: 8px;

  &:hover {
    transform: scale(1.1);
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
