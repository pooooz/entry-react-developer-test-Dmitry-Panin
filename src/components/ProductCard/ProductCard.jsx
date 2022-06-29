import React from 'react';

import { ProductAttributes } from 'components/ProductAttributes/ProductAttributes';
import './ProcuctCard.scss';

export class ProductCard extends React.Component {
  render() {
    const base = this.props.base;
    const { brand, name, attributes } = this.props.product;
    const price = this.props.product.prices.find(
      (element) => element.currency.label === this.props.currencyLabel
    );
    return (
      <div className={base}>
        <h3 className={base + '__brand'}>{brand}</h3>
        <h3 className={base + '__name'}>{name}</h3>
        <span className={base + '__price'}>
          {price.currency.symbol + Number(price.amount).toFixed(2)}
        </span>
        <ProductAttributes attributes={attributes} />
      </div>
    );
  }
}
