import React from 'react';

import { ProductItemWithConnect } from './components/ProductItem/ProductItem';
import styles from './ProductList.module.scss';

export class ProductList extends React.Component {
  render() {
    return (
      <ul className={styles.product_list}>
        {this.props.products.map((product) => (
          <ProductItemWithConnect product={product} key={product.id} />
        ))}
      </ul>
    );
  }
}
