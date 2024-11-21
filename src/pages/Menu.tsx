import MenuLateralBar from "../components/Menu/MenuLateralBar";
import ProductOptionsTopBar from "../components/Menu/ProductOptionsTopBar";
import FlavourOptions from "../components/FlavoursOptions/FlavourOptions";
import {
  Page,
  LeftBar,
  TopBar,
  Options,
  RightBar,
} from "../components/styled-components/MenuPage";
import Cart from "../components/Cart/Cart";
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
        <Cart />
      </RightBar>
      <AddProductModal />
    </Page>
  );
};

export default Menu;
