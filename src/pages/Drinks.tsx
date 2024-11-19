import MenuLateralBar from "../components/MenuLateralBar";
import DrinksTopBar from "../components/DrinksTopBar";
import DrinkOptions from "../components/DrinkOptions";
import {
  Page,
  LeftBar,
  TopBar,
  Options,
  RightBar,
} from "../components/StyledComponents";
import CartLateralBar from "../components/CartLateralBar";
import Modal from "../components/Modal";

const Drinks = () => {
  return (
    <Page>
      <LeftBar>
        <MenuLateralBar />
      </LeftBar>
      <TopBar>
        <DrinksTopBar />
      </TopBar>
      <Options>
        <DrinkOptions />
      </Options>
      <RightBar>
        <CartLateralBar />
      </RightBar>
      <Modal />
    </Page>
  );
};

export default Drinks;
