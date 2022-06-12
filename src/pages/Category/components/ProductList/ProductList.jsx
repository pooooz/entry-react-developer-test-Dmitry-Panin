import React from 'react';

import { ProductItem } from './components/ProductItem/ProductItem';
import styles from './ProductList.module.scss';

export class ProductList extends React.Component {
  render() {
    return (
      <ul className={styles.product_list}>
        {this.props.products.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </ul>
    );
  }
}
