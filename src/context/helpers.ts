import { GroupedResult, InputDrink, OutputDrink } from "./StoreTypes";
import { Drink } from "../interfaces/DrinkInterface";
import { AddonType } from "../interfaces/AddonInterface";

export const groupByRefProductId = (
  addonsData: AddonType[],
  drinksData: Drink[]
) => {
  return drinksData
    .map((drink) => {
      const matchingAddonCategories = addonsData.filter((addonCategory) =>
        addonCategory.refProductIds.includes(drink.id)
      );
      return matchingAddonCategories.length > 0
        ? {
            drinkId: drink.id,
            drinkName: drink.name,
            drinkPrice: drink.price,
            modifications: drink.modifications,
            addons: matchingAddonCategories,
          }
        : null;
    })
    .filter((result) => result !== null);
};

export const filterByDrinkId = (
  groupedResults: GroupedResult[],
  drinkId: string
) => groupedResults.find((group) => group.drinkId === drinkId);

export function transformDrinkData(
  input: InputDrink,
  drinkFlavour: string
): OutputDrink {
  const result: OutputDrink = {
    drinkId: input.drinkId,
    drinkName: input.drinkName,
    drinkFlavour: drinkFlavour,
    drinkPrice: input.drinkPrice,
    addons: {},
  };

  for (const addonCategory of input.addons) {
    const types: { [key: string]: number } = {};

    for (const addon of addonCategory.addons) {
      types[addon.addon.name] = addon.addon.price;
    }

    result.addons[addonCategory.name] = {
      limit: addonCategory.limit,
      types,
    };
  }

  return result;
}
