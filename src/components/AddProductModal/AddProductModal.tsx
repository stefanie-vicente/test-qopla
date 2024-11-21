import { useEffect, useState } from "react";
import { useStore } from "../../context/StoreContext";
import { DrinkCart } from "../../interfaces/DrinkInterface";
import {
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  ModalSection,
  ModalGroupTitle,
  ModalButton,
  ModalButtonContainer,
  ModalOptionItem,
  ModalOptionList,
} from "../styled-components/Modal";

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
        <ModalOptionList>
          {Object.entries(groupOptions).map(([optionName]) => (
            <ModalOptionItem key={optionName}>
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
            </ModalOptionItem>
          ))}
        </ModalOptionList>
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
