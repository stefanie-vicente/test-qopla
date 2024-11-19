import { Drink, AddonCategory, GroupedResult } from "./StoreTypes";

export const groupByRefProductId = (
  addonsData: AddonCategory[],
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
