import { useState } from "react";
import styled from "styled-components";
import { useStore } from "../../context/StoreContext";

const Options = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  width: 100%;
  height: 100%;
  align-items: center;
  justify-items: center;
`;

const Item = styled.button<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  font-size: 18px;
  background-color: ${(props: { isSelected: boolean }) =>
    props.isSelected ? "#004b47" : "#006f6a"};
  border-radius: 5px;
  width: 80%;
  height: 80%;
  color: #f5f5f5;
  border: none;
  outline: none;

  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
    outline: 2px solid #ffcc00;
  }
`;
// arrumar
const ProductOptionsTopBar = () => {
  const { drinksTypes, setSelectedProductType, selectedProductType } =
    useStore();
  const [selectedOption, setSelectedOption] = useState<string | null>(
    selectedProductType
  );

  const handleClick = (item: string) => {
    setSelectedOption(item);
    setSelectedProductType(item);
  };

  return (
    <Options>
      {drinksTypes.map((option: string) => (
        <Item
          key={option}
          onClick={() => handleClick(option)}
          isSelected={selectedOption === option}
          aria-label={`Select ${option} drink`}
        >
          {option}
        </Item>
      ))}
    </Options>
  );
};

export default ProductOptionsTopBar;
