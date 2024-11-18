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
        <DrinkOptions type="Soda" />
      </Options>
      <RightBar>
        <CartLateralBar />
      </RightBar>
    </Page>
  );
};

export default Drinks;
