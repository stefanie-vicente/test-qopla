import { useEffect, useState } from "react";
import { IDrink } from "../interfaces/DrinkInterface";
import { IAddonType } from "../interfaces/AddonInterface";
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

const Drinks = () => {
  const [drinks, setDrinks] = useState<IDrink[]>([]);
  const [addons, setAddons] = useState<IAddonType[]>([]);

  console.log(drinks, addons);

  useEffect(() => {
    fetch("/drinksMock.json")
      .then((response) => response.json())
      .then(({ drinks }) => {
        setDrinks(drinks);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  useEffect(() => {
    fetch("/addonsMock.json")
      .then((response) => response.json())
      .then(({ addons }) => {
        setAddons(addons);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

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
        <p>test</p>
      </RightBar>
    </Page>
  );
};

export default Drinks;
