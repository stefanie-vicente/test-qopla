import { useEffect, useState } from "react";
import styled from "styled-components";
import { useStore } from "../../context/StoreContext";
import { DrinkCart } from "../../interfaces/DrinkInterface";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
`;

export const ModalContainer = styled.div`
  background: #1f1f1f;
  color: #e0e0e0;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  outline: none;
  display: flex;
  flex-direction: column;
`;

export const ModalTitle = styled.h3`
  margin-bottom: 20px;
  font-weight: bold;
  color: #e0e0e0;
`;

export const ModalSection = styled.div`
  margin-bottom: 15px;
`;

export const ModalGroupTitle = styled.h4`
  margin-bottom: 10px;
  font-size: 16px;
  color: #b0b0b0;
`;

export const OptionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const OptionItem = styled.li`
  margin-bottom: 5px;

  label {
    display: flex;
    align-items: center;
    color: #b0b0b0;

    input {
      margin-right: 10px;
      background-color: #333;
      border: 1px solid #444;
      color: #fff;
      border-radius: 5px;
      padding: 5px;
      font-size: 14px;
    }
  }
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const ModalButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;
  outline: none;

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

const AddProductModal = () => {
  const { openModal, modalDrink, addToCart, closeModalOnClick } = useStore();

  const [selectedDrink, setSelectedDrink] = useState<DrinkCart>({
    typeId: "",
    flavour: "",
    price: 0,
    modifications: [],
  });

  useEffect(() => {
    if (modalDrink) {
      setSelectedDrink({
        typeId: modalDrink.drinkId,
        flavour: modalDrink.drinkFlavour,
        price: modalDrink.drinkPrice,
        modifications: [],
      });
    }
  }, [modalDrink]);

  if (!openModal || !modalDrink) return null;

  const handleConfirm = () => {
    addToCart(selectedDrink);
    closeModalOnClick();
  };

  const handleOptionChange = (
    type: string,
    modification: string,
    price: number
  ) => {
    const newModification = { type, modification, price };
    const modifications = selectedDrink?.modifications?.filter(
      (mod) => mod.type !== type
    );
    modifications?.push(newModification);
    setSelectedDrink((prev) => ({ ...prev, modifications }));
  };

  const renderAddonOptions = (addon: any, addonName: string) => {
    const groupOptions = addon.types;
    return (
      <ModalSection key={addonName}>
        <ModalGroupTitle>{addonName}</ModalGroupTitle>
        <OptionList>
          {Object.entries(groupOptions).map(([optionName]) => (
            <OptionItem key={optionName}>
              <label>
                <input
                  type="radio"
                  name={addonName}
                  value={optionName}
                  onChange={() =>
                    handleOptionChange(
                      addonName,
                      optionName,
                      groupOptions[optionName]
                    )
                  }
                />
                {optionName} - {groupOptions[optionName]} kr
              </label>
            </OptionItem>
          ))}
        </OptionList>
      </ModalSection>
    );
  };

  const renderAddonGroups = () => {
    if (!modalDrink.addons) return null;

    return Object.entries(modalDrink.addons).map(([addonName, addon]) =>
      renderAddonOptions(addon, addonName)
    );
  };

  return (
    <ModalOverlay
      role="dialog"
      aria-labelledby="modal-title"
      aria-hidden={!openModal}
    >
      <ModalContainer role="document">
        <ModalTitle id="modal-title">{`${modalDrink.drinkName} - ${modalDrink.drinkFlavour}`}</ModalTitle>
        {renderAddonGroups()}
        <ModalButtonContainer>
          <ModalButton
            onClick={handleConfirm}
            aria-label="Confirm the product selection"
          >
            Confirm
          </ModalButton>
          <ModalButton onClick={closeModalOnClick} aria-label="Close the modal">
            Close
          </ModalButton>
        </ModalButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};
export default AddProductModal;
