import { useState } from "react";
import { useStore } from "../context/StoreContext";
import styled from "styled-components";

// Type definitions
interface Addon {
  name: string;
  price: string;
}

interface AddonGroup {
  name: string;
  addons: {
    addon: Addon;
  }[];
}

interface Drink {
  drinkId: string;
  drinkName: string;
  addons: AddonGroup[];
}

interface TransformedDrink {
  drinkName: string;
  [groupName: string]: string | Record<string, number>;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h3`
  margin-bottom: 20px;
`;

const ModalSection = styled.div`
  margin-bottom: 15px;
`;

const ModalGroupTitle = styled.h4`
  margin-bottom: 10px;
`;

const OptionList = styled.ul`
  list-style: none;
  padding: 0;
`;

const OptionItem = styled.li`
  margin-bottom: 5px;

  label {
    display: flex;
    align-items: center;

    input {
      margin-right: 10px;
    }
  }
`;

const ModalButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background: #0056b3;
  }

  &:last-child {
    background: #6c757d;

    &:hover {
      background: #5a6268;
    }
  }
`;

const Modal = () => {
  const {
    closeModalOnClick,
    openModal,
    addToCart,
    selectedDrinkType,
    modalDrink,
  } = useStore();
  // needs a selected drink flavour and addon limit
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  if (!openModal) return null;
  console.log(selectedDrinkType);

  const handleSelection = (groupName: string, optionName: string) => {
    setSelectedOptions((prev: any) => ({
      ...prev,
      [groupName]: optionName,
    }));
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>{modalDrink.drinkName}</ModalTitle>
        {Object.keys(modalDrink).map((groupName) => {
          if (groupName === "drinkName") return null;

          const groupOptions = modalDrink[groupName] as Record<string, number>;

          return (
            <ModalSection key={groupName}>
              <ModalGroupTitle>{groupName}</ModalGroupTitle>
              <OptionList>
                {Object.keys(groupOptions).map((optionName) => (
                  <OptionItem key={optionName}>
                    <label>
                      <input
                        type="radio"
                        name={groupName}
                        value={optionName}
                        checked={selectedOptions[groupName] === optionName}
                        onChange={() => handleSelection(groupName, optionName)}
                      />
                      {optionName} - {groupOptions[optionName]} kr
                    </label>
                  </OptionItem>
                ))}
              </OptionList>
            </ModalSection>
          );
        })}
        <ModalButton onClick={closeModalOnClick}>Close</ModalButton>
        <ModalButton
          onClick={() => {
            console.log("Selected Options:", selectedOptions);
            closeModalOnClick();
          }}
        >
          Confirm
        </ModalButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
