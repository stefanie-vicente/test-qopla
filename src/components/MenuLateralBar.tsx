import { useState } from "react";
import styled from "styled-components";

const Sidebar = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(1, 1fr);
  height: 100%;
  align-items: center;
  justify-items: center;
`;

const MenuItem = styled.div<{ isInactive?: boolean; isSelected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-align: center;
  background: ${(props) => {
    if (props.isSelected) return "#ff7f50";
    return props.isInactive ? "#e0e0e0" : "#d4904f";
  }};
  cursor: pointer;
  width: 80%;
  height: 80%;
  border-radius: 5px;

  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }
`;

const MenuLateralBar = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const menuOptions: string[] = [
    "Meals",
    "Sides",
    "Drinks", // The only active option, others are inactive for this test purpose
    "Desserts",
    "Sauces",
  ];

  const handleClick = (item: string) => {
    console.log(`You selected the option ${selectedOption}`);
    setSelectedOption(item);
  };

  return (
    <Sidebar>
      {menuOptions.map((option: string) => (
        <MenuItem
          key={option}
          onClick={() => handleClick(option)}
          isInactive={option !== "Drinks"} // Indicating that all options except "Drinks" are inactive for this test purpose
          isSelected={option === "Drinks"}
          // isSelected={option === selectedOption}
        >
          {/* {option} */}
          {option !== "Drinks" ? `${option} is inactive` : "Drinks"}
        </MenuItem>
      ))}
    </Sidebar>
  );
};

export default MenuLateralBar;
