import React from 'react';
import { Query } from '@apollo/client/react/components';

import { withRouter } from 'HOC/withRouter';
import { GET_PRODUCT_BY_ID } from 'queries/products';
import { Gallery } from './components/Gallery/Gallery';
import { AddForm } from './components/AddForm/AddForm';
import styles from './Product.module.scss';

class Product extends React.Component {
  render() {
    return (
      <Query query={GET_PRODUCT_BY_ID(this.props.params.id)}>
        {({ loading, error, data }) => {
          if (error) return <h1>Error...</h1>;
          if (loading || !data) return <h1>Loading...</h1>;
          return (
            <main className={styles.product}>
              <Gallery images={data.product.gallery} />
              <AddForm product={data.product} />
            </main>
          );
        }}
      </Query>
    );
  }
}

export const ProductWithRouter = withRouter(Product);
