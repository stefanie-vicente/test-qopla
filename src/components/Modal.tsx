import { useStore } from "../StoreContext";
import styled from "styled-components";

const ModalCard = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  min-width: 300px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Modal = () => {
  const { closeModalOnClick, openModal } = useStore();

  if (!openModal) return null;

  return (
    <ModalCard>
      <ModalContent>
        <h2>Modifications and addons</h2>
        <Button onClick={() => console.log("add")}>Add to Cart</Button>
        <Button onClick={closeModalOnClick}>Cancel</Button>
      </ModalContent>
    </ModalCard>
  );
};

export default Modal;
