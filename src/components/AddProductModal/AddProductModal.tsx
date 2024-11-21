import { useEffect, useState } from "react";
import { useStore } from "../../context/StoreContext";
import { CartProduct } from "../../interfaces/CartInterface";
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
  const { openModal, modalData, addToCart, closeModalOnClick } = useStore();

  const [selectedProduct, setSelectedProduct] = useState<CartProduct>({
    id: "",
    flavour: "",
    price: 0,
    modifications: [],
  });

  useEffect(() => {
    if (modalData) {
      setSelectedProduct({
        id: modalData.id,
        flavour: modalData.flavour,
        price: modalData.price,
        modifications: [],
      });
    }
  }, [modalData]);

  if (!openModal || !modalData) return null;

  const handleConfirm = () => {
    addToCart(selectedProduct);
    closeModalOnClick();
  };

  const handleOptionChange = (
    type: string,
    modification: string,
    price: number,
  ) => {
    const newModification = { type, modification, price };
    const modifications = selectedProduct?.modifications?.filter(
      (mod) => mod.type !== type,
    );
    modifications?.push(newModification);
    setSelectedProduct((prev) => ({ ...prev, modifications }));
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
                      groupOptions[optionName],
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
    if (!modalData.addons) return null;

    return Object.entries(modalData.addons).map(([addonName, addon]) =>
      renderAddonOptions(addon, addonName),
    );
  };

  return (
    <ModalOverlay
      role="dialog"
      aria-labelledby="modal-title"
      aria-hidden={!openModal}
    >
      <ModalContainer role="document">
        <ModalTitle id="modal-title">{`${modalData.name} - ${modalData.flavour}`}</ModalTitle>
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
