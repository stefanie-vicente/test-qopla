import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { vi } from 'vitest';

beforeEach(() => {
  global.fetch = vi.fn().mockImplementation((url) => {
    if (url === '/drinksMock.json') {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            drinks: [
              {
                id: 'a_very_unique_milkshake_id',
                name: 'Milkshake',
                price: 150,
                modifications: {
                  sizes: [
                    { name: 'Small', addonPrice: 0 },
                    { name: 'Medium', addonPrice: 20 },
                    { name: 'Large', addonPrice: 40 },
                  ],
                  flavours: [
                    { name: 'Vanilla', addonPrice: 0 },
                    { name: 'Chocolate', addonPrice: 5 },
                    { name: 'Strawberry', addonPrice: 5 },
                    { name: 'Vanilla (vegan)', addonPrice: 15 },
                    { name: 'Strawberry (vegan)', addonPrice: 15 },
                  ],
                },
              },
            ],
          }),
      });
    }

    if (url === '/addonsMock.json') {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            addons: [
              {
                addon: {
                  name: 'Whipped cream',
                  price: '15',
                },
                limit: 1,
                sortOrder: 1,
              },
              {
                addon: {
                  name: 'Marshmallow',
                  price: '10',
                },
                limit: 1,
                sortOrder: 2,
              },
            ],
          }),
      });
    }

    return Promise.reject(new Error('Unknown URL'));
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});
