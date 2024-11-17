import { useEffect, useState } from "react";
import { IDrink } from "../interfaces/DrinkInterface";
import { IAddonType } from "../interfaces/AddonInterface";
import MenuLateralBar from "../components/MenuLateralBar";
import DrinksTopBar from "../components/DrinksTopBar";
import DrinkOptions from "../components/DrinkOptions";

const Drinks = () => {
  const [drinks, setDrinks] = useState<IDrink[]>([]);
  const [addons, setAddons] = useState<IAddonType[]>([]);

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
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        height: "80%",
      }}
    >
      <div style={{ flexBasis: "20%", flexShrink: 0 }}>
        <MenuLateralBar />
      </div>
      <div style={{ flexGrow: 1, border: "2px solid black" }}>
        <DrinksTopBar />
        <DrinkOptions />
      </div>
    </div>
  );
};

export default Drinks;
