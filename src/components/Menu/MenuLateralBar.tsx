import { useState } from "react";
import styled from "styled-components";

//  Components with the $isInactive prop are styled in this way because the functionality for these items is not implemented.
export const Sidebar = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(1, 1fr);
  height: 100%;
  align-items: center;
  justify-items: center;
`;

export const MenuItem = styled.div<{
  $isInactive?: boolean;
  $isSelected?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  font-size: 18px;
  background: ${(props) => {
    if (props.$isSelected) return "#9F7BB3";
    if (props.$isInactive) return "#555";
    return "#6c4f3d";
  }};
  color: ${(props) => (props.$isInactive ? "#aaa" : "#f5f5f5")};
  width: 80%;
  height: 80%;
  border-radius: 5px;
  border: none;
  outline: none;
  transition: background-color 0.3s, transform 0.2s, opacity 0.3s;

  &:hover {
    opacity: 0.9;
    ${(props) => !props.$isInactive && "transform: scale(1.05);"}
    outline: 2px solid #ffcc00;
  }

  &:active {
    background-color: ${(props) => (props.$isSelected ? "#7a39b6" : "#6c4f3d")};
  }
`;

const MenuLateralBar = () => {
  // move this to store to render other components
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const menuOptions: string[] = [
    "Meals",
    "Sides",
    "Drinks", // The only active option, others are inactive for this test purpose
    "Desserts",
    "Sauces",
  ];

  const handleClick = (item: string) => {
    setSelectedOption(item);
  };

  return (
    <Sidebar role="navigation" aria-label="Main Menu">
      {menuOptions.map((option: string) => (
        <MenuItem
          key={option}
          onClick={() => handleClick(option)}
          $isInactive={option !== "Drinks"}
          $isSelected={option === "Drinks"}
          role="menuitem"
          aria-selected={option === selectedOption}
          aria-disabled={option !== "Drinks"}
        >
          {option !== "Drinks" ? `${option} is inactive` : "Drinks"}
        </MenuItem>
      ))}
    </Sidebar>
  );
};

export default MenuLateralBar;
