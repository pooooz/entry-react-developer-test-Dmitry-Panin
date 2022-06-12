import { gql } from '@apollo/client';

export const GET_PRODUCTS_BY_CATEGORY = (category) => gql`
  query {
  category(input: {title: "${category}"}) {
    name
    products {
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
