import { GroupedResult, InputProduct, OutputProduct } from "./StoreTypes";
import { Product } from "../interfaces/ProductInterface";
import { AddonType } from "../interfaces/AddonInterface";

export const groupByRefProductId = (
  addonsData: AddonType[],
  productsData: Product[]
) => {
  return productsData
    .map((product) => {
      const matchingAddonCategories = addonsData.filter((addonCategory) =>
        addonCategory.refProductIds.includes(product.id)
      );
      return matchingAddonCategories.length > 0
        ? {
            id: product.id,
            name: product.name,
            price: product.price,
            modifications: product.modifications,
            addons: matchingAddonCategories,
          }
        : null;
    })
    .filter((result) => result !== null);
};

export const filterByProductId = (
  groupedResults: GroupedResult[],
  id: string
) => groupedResults.find((group) => group.id === id);

export function transformProductData(
  input: InputProduct,
  flavour: string
): OutputProduct {
  const result: OutputProduct = {
    id: input.id,
    name: input.name,
    flavour: flavour,
    price: input.price,
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
