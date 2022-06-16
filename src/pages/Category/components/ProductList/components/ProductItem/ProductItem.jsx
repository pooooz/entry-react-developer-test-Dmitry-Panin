import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as CartIcon } from 'icons/cartIcon.svg';
import styles from './ProductItem.module.scss';

export class ProductItem extends React.Component {
  render() {
    const product = this.props.product;
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
              {product.prices[0].currency.symbol +
                Number(product.prices[0].amount).toFixed(2)}
            </span>
          </div>
        </Link>
        <button className={styles.card__add_button}>
          <CartIcon className={styles.card__cart_icon} />
        </button>
      </li>
    );
  }
}
