import React from 'react';
import { Query } from '@apollo/client/react/components';

import { GET_PRODUCTS_BY_CATEGORY } from 'queries/products';
import { ProductList } from './components/ProductList/ProductList';
import styles from './Category.module.scss';

export class Category extends React.Component {
  render() {
    return (
      <section className={styles.category}>
        <h1 className={styles.category__header}>{this.props.category}</h1>
        <section>
          <Query query={GET_PRODUCTS_BY_CATEGORY(this.props.category)}>
            {({ loading, error, data }) => {
              if (error) return <h1>Error...</h1>;
              if (loading || !data) return <h1>Loading...</h1>;

              return <ProductList products={data.category.products} />;
            }}
          </Query>
        </section>
      </section>
    );
  }
}
