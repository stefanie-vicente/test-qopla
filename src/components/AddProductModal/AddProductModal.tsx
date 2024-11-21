import { useEffect, useState } from "react";
import styled from "styled-components";
import { useStore } from "../../context/StoreContext";
import { DrinkCart } from "../../interfaces/DrinkInterface";

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
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>{`${modalDrink.drinkName} - ${modalDrink.drinkFlavour}`}</ModalTitle>
        {renderAddonGroups()}
        <ModalButton onClick={closeModalOnClick}>Close</ModalButton>
        <ModalButton onClick={handleConfirm}>Confirm</ModalButton>
      </ModalContainer>
    </ModalOverlay>
  );
};
export default AddProductModal;
