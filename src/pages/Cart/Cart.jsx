import React from 'react';
import { connect } from 'react-redux';

import { ProductCard } from 'components/ProductCard/ProductCard';
import styles from './Cart.module.scss';

const mapStateToProps = (state) => {
  return {
    products: state.cart.products,
    currencyLabel: state.currency.label,
  };
};

class Cart extends React.Component {
  render() {
    return (
      <section className={styles.cart}>
        <h1 className={styles.cart__header}>Cart</h1>
        <hr />
        {this.props.products.map((elem) => (
          <div key={elem.id}>
            <ProductCard
              base={'cart'}
              product={elem}
              currencyLabel={this.props.currencyLabel}
            />
            <hr />
          </div>
        ))}
      </section>
    );
  }
}

export const CartWithConnect = connect(mapStateToProps)(Cart);
