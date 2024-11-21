import { describe, it, expect } from 'vitest';
import {
  groupByRefProductId,
  filterByProductId,
  transformProductData,
} from '../context/helpers';
import { AddonType } from '../interfaces/AddonInterface';
import { Product } from '../interfaces/ProductInterface';
import { InputProduct, OutputProduct } from '../context/StoreTypes';

const addonsData: AddonType[] = [
  {
    name: 'Extra toppings',
    limit: 2,
    sortOrder: 1,
    refProductIds: ['a_very_unique_milkshake_id'],
    addons: [
      { addon: { name: 'Whipped cream', price: 15 }, limit: 1, sortOrder: 1 },
      { addon: { name: 'Marshmallow', price: 10 }, limit: 1, sortOrder: 2 },
    ],
  },
  {
    name: 'Sugar level',
    limit: 1,
    sortOrder: 0,
    refProductIds: ['a_very_unique_smoothie_id'],
    addons: [
      { addon: { name: 'Regular', price: 0 }, limit: 1, sortOrder: 1 },
      { addon: { name: 'Extra sweet', price: 0 }, limit: 1, sortOrder: 2 },
    ],
  },
];

const productsData: Product[] = [
  {
    id: 'a_very_unique_milkshake_id',
    name: 'Milkshake',
    price: 150,
    modifications: { size: [{ name: 'Small', addonPrice: 0 }], flavours: [] },
  },
  {
    id: 'a_very_unique_smoothie_id',
    name: 'Smoothie',
    price: 120,
    modifications: { size: [{ name: 'Small', addonPrice: 0 }], flavours: [] },
  },
  {
    id: 'a_very_unique_juice_id',
    name: 'Juice',
    price: 100,
    modifications: { size: [{ name: 'Small', addonPrice: 0 }], flavours: [] },
  },
];

const inputProduct: InputProduct = {
  id: '1',
  name: 'Test Product',
  price: 50,
  addons: [
    {
      name: 'Extra toppings',
      limit: 2,
      addons: [
        {
          addon: { name: 'Whipped cream', price: 15 },
          limit: 1,
          sortOrder: 1,
        },
        { addon: { name: 'Marshmallow', price: 10 }, limit: 1, sortOrder: 2 },
      ],
      sortOrder: 1,
      refProductIds: ['a_very_unique_milkshake_id'],
    },
  ],
};

const flavour = 'Chocolate';

describe('groupByRefProductId', () => {
  it('should correctly group products by refProductId', () => {
    const result = groupByRefProductId(addonsData, productsData);

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('a_very_unique_milkshake_id');
    expect(result[0].addons).toHaveLength(1);
    expect(result[0].addons[0].name).toBe('Extra toppings');
  });

  it('should return an empty array if no products match', () => {
    const newAddonsData: AddonType[] = [
      {
        name: 'Non-matching',
        limit: 1,
        sortOrder: 0,
        refProductIds: ['non_matching_product_id'],
        addons: [
          { addon: { name: 'Addon', price: 10 }, limit: 1, sortOrder: 1 },
        ],
      },
    ];
    const result = groupByRefProductId(newAddonsData, productsData);
    expect(result).toHaveLength(0);
  });
});

describe('filterByProductId', () => {
  it('should return the correct grouped result based on product id', () => {
    const groupedResults = groupByRefProductId(addonsData, productsData);
    const result = filterByProductId(
      groupedResults,
      'a_very_unique_milkshake_id',
    );

    expect(result).toBeDefined();
    expect(result?.id).toBe('a_very_unique_milkshake_id');
    expect(result?.name).toBe('Milkshake');
  });

  it('should return undefined if no matching product id is found', () => {
    const groupedResults = groupByRefProductId(addonsData, productsData);
    const result = filterByProductId(groupedResults, 'non_existing_id');
    expect(result).toBeUndefined();
  });
});

describe('transformProductData', () => {
  it('should correctly transform product data with addons', () => {
    const result: OutputProduct = transformProductData(inputProduct, flavour);

    expect(result.id).toBe(inputProduct.id);
    expect(result.name).toBe(inputProduct.name);
    expect(result.flavour).toBe(flavour);
    expect(result.price).toBe(inputProduct.price);
    expect(result.addons).toHaveProperty('Extra toppings');
    expect(result.addons['Extra toppings']).toHaveProperty('limit', 2);
    expect(result.addons['Extra toppings']).toHaveProperty('types');
    expect(result.addons['Extra toppings'].types['Whipped cream']).toBe(15);
  });

  it('should return an empty addons object if no addons are provided', () => {
    const noAddonsProduct: InputProduct = {
      id: 'a_very_unique_smoothie_id',
      name: 'Test No Addons',
      price: 60,
      addons: [],
    };
    const result: OutputProduct = transformProductData(
      noAddonsProduct,
      flavour,
    );

    expect(result.addons).toEqual({});
  });
});
