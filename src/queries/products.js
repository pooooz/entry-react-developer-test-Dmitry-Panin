import { gql } from '@apollo/client';

export const GET_PRODUCTS_BY_CATEGORY = (category) => gql`
  query {
    category(input: {title: "${category}"}) {
      name
      products {
        brand
        name
        id
        inStock
        gallery
        prices {
          currency {
            symbol
            label
          }
          amount
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = (id) => gql`
  query {
    product(id: "${id}") {
      gallery
      brand
      name
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          symbol
          label
        }
        amount
      }
      inStock
      description
    }
  }
`;
