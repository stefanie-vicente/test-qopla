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

// Type definitions
interface Addon {
  name: string;
  price: string;
}

interface AddonGroup {
  name: string;
  addons: {
    addon: Addon;
  }[];
}

export interface DrinkModal {
  drinkId: string;
  drinkName: string;
  addons: AddonGroup[];
}

interface TransformedDrink {
  drinkName: string;
  [groupName: string]: string | Record<string, number>;
}

// Function to transform data
export const transformDrinkData = (drink: DrinkModal): TransformedDrink => {
  let transformedData: TransformedDrink = {
    drinkName: drink.drinkName,
  };

  drink.addons.forEach((addonGroup) => {
    const groupName = addonGroup.name;

    // Convert add-ons into a key-value pair of name and price
    transformedData[groupName] = addonGroup.addons.reduce((acc, addon) => {
      acc[addon.addon.name] = parseFloat(addon.addon.price); // Convert price to a number
      return acc;
    }, {} as Record<string, number>);
  });

  return transformedData;
};
