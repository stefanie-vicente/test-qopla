import MenuLateralBar from "../components/Menu/MenuLateralBar";
import ProductOptionsTopBar from "../components/Menu/ProductOptionsTopBar";
import FlavourOptions from "../components/FlavoursOptions/FlavourOptions";
import {
  Page,
  LeftBar,
  TopBar,
  Options,
  RightBar,
} from "../components/StyledComponents";
import CartLateralBar from "../components/Cart/CartLateralBar";
import AddProductModal from "../components/AddProductModal/AddProductModal";

const Menu = () => {
  return (
    <Page>
      <LeftBar>
        <MenuLateralBar />
      </LeftBar>
      <TopBar>
        <ProductOptionsTopBar />
      </TopBar>
      <Options>
        <FlavourOptions />
      </Options>
      <RightBar>
        <CartLateralBar />
      </RightBar>
      <AddProductModal />
    </Page>
  );
};

export default Menu;
