import React from 'react';

import { ReactComponent as CartIcon } from 'icons/cartIcon.svg';
import styles from './ProductItem.module.scss';

export class ProductItem extends React.Component {
  render() {
    return (
      <li className={styles.card}>
        <img
          src={this.props.product.gallery[0]}
          alt="Product image"
          className={styles.card__img}
        />
        <div className={styles.card__info}>
          <h3
            className={styles.card__title}
          >{`${this.props.product.brand} ${this.props.product.name}`}</h3>
          <span className={styles.card__price}>
            {this.props.product.prices[0].currency.symbol +
              Number(this.props.product.prices[0].amount).toFixed(2)}
          </span>
        </div>
        <button className={styles.card__add_button}>
          <CartIcon className={styles.card__cart_icon} />
        </button>
      </li>
    );
  }
}
