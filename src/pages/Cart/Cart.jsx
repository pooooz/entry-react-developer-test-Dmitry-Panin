import React from 'react';
import { connect } from 'react-redux';

import { ProductCard } from 'components/ProductCard/ProductCard';
import { Carousel } from './Carousel/Carousel';
import { changeQuantity, order } from 'store/cart/cart';
import styles from './Cart.module.scss';

const mapStateToProps = (state) => {
  return {
    products: state.cart.products,
    currencyLabel: state.currency.label,
    currencySymbol: state.currency.symbol,
    productsCount: state.cart.productsCount,
  };
};

const mapDispatchToProps = {
  changeQuantity,
  order,
};

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  countTotal() {
    return this.props.products.reduce(
      (sum, elem) =>
        sum +
        elem.prices.find(
          (element) => element.currency.label === this.props.currencyLabel
        ).amount *
          elem.quantity,
      0
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.order();
  }

  render() {
    const total = this.countTotal();
    return (
      <section className={styles.cart}>
        <h1 className={styles.cart__header}>Cart</h1>
        <hr />
        {this.props.productsCount === 0 ? (
          <h3>Cart is empty</h3>
        ) : (
          this.props.products.map((elem, index) => (
            <div key={elem.id + index}>
              <div className={styles.cart__element}>
                <ProductCard
                  product={elem}
                  currencyLabel={this.props.currencyLabel}
                  changeQuantity={this.props.changeQuantity}
                />
                <Carousel images={elem.gallery} />
              </div>
              <hr style={{ margin: '32px 0 24px 0' }} />
            </div>
          ))
        )}
        <form className={styles.cart__summary} onSubmit={this.handleSubmit}>
          <h4 className={styles.cart__summary_item}>Tax 21%: </h4>
          <span className={styles.cart__summary_item_value}>
            {this.props.currencySymbol + (total * 0.21).toFixed(2)}
          </span>
          <h4 className={styles.cart__summary_item}>Quantity: </h4>
          <span className={styles.cart__summary_item_value}>
            {this.props.productsCount}
          </span>
          <h4 className={styles.cart__summary_item}>Total: </h4>
          <span className={styles.cart__summary_item_value}>
            {this.props.currencySymbol + total.toFixed(2)}
          </span>
          <button className={styles.cart__summary_button}>Order</button>
        </form>
      </section>
    );
  }
}

export const CartWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
