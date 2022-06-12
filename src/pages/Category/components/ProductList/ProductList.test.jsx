import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ProductList } from './ProductList';

describe('ProductList test', () => {
  it('Render test', () => {
    render(
      <ProductList
        products={[
          {
            gallery: [
              'https://store.storeimages.cdn-apple.com/4982/as-im…?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000',
            ],
            id: 'apple-airtag',
            inStock: true,
            name: 'AirTag',
            prices: [
              {
                currency: { __typename: 'Currency', symbol: '$', label: 'USD' },
                amount: 120.57,
              },
            ],
          },
        ]}
      />
    );
    expect(screen.getByText(/AirTag/)).toBeInTheDocument();
  });
});
