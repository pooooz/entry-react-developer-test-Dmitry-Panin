import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { addProduct } from 'store/cart/cart';
import { ReactComponent as CartIcon } from 'icons/cartIcon.svg';
import styles from './ProductItem.module.scss';

const mapStateToProps = (state) => {
  return {
    currencyLabel: state.currency.label,
  };
};

const mapDispatchToProps = {
  addProduct,
};

class ProductItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(product) {
    const attributes = product.attributes.map((attribute) => ({
      ...attribute,
      items: attribute.items.map((item, index) =>
        index === 0 ? { ...item, checked: true } : { ...item, checked: false }
      ),
    }));
    this.props.addProduct({ ...product, attributes });
  }

  render() {
    const product = this.props.product;
    const price = product.prices.find(
      (element) => element.currency.label === this.props.currencyLabel
    );
    return (
      <li className={styles.card}>
        <Link to={`/items/${product.id}`} className={styles.card__product_link}>
          <img
            src={product.gallery[0]}
            alt="Product image"
            className={styles.card__img}
          />
          <div className={styles.card__info}>
            <h3
              className={styles.card__title}
            >{`${product.brand} ${product.name}`}</h3>
            <span className={styles.card__price}>
              {price.currency.symbol + Number(price.amount).toFixed(2)}
            </span>
          </div>
        </Link>
        <button
          className={styles.card__add_button}
          onClick={() => this.handleClick(product)}
        >
          <CartIcon className={styles.card__cart_icon} />
        </button>
      </li>
    );
  }
}

export const ProductItemWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductItem);
