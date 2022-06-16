import React from 'react';
import { Query } from '@apollo/client/react/components';

import { withRouter } from 'HOC/withRouter';
import { GET_PRODUCT_BY_ID } from 'queries/products';

class Product extends React.Component {
  render() {
    console.log(this.props.params.id);
    return (
      <Query query={GET_PRODUCT_BY_ID(this.props.params.id)}>
        {({ loading, error, data }) => {
          if (error) return <h1>Error...</h1>;
          if (loading || !data) return <h1>Loading...</h1>;
          console.log(data);
          return <h1>{data.product.name}</h1>;
        }}
      </Query>
    );
  }
}

export const ProductWithRouter = withRouter(Product);
