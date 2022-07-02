import React from 'react';
import styled, { css } from 'styled-components';

import { ProductAttributes } from 'components/ProductAttributes/ProductAttributes';
import styles from './ProcuctCard.module.scss';

const Brand = styled.h3`
  ${(props) =>
    props.theme === 'overlay' &&
    css`
      font-size: 16px;
      line-height: 26px;
      font-weight: 300;
    `}
`;

const Name = styled.h3`
  ${(props) =>
    props.theme === 'overlay' &&
    css`
      margin: 0 0 4px 0;
      font-size: 16px;
      line-height: 26px;
      font-weight: 300;
    `}
`;

const Price = styled.span`
  ${(props) =>
    props.theme === 'overlay' &&
    css`
      font-size: 16px;
      line-height: 26%;
      font-weight: 500;
    `}
`;

const QuantityButton = styled.button`
  ${(props) =>
    props.theme === 'overlay' &&
    css`
      width: 24px;
      height: 24px;
      font-size: 20px;
    `}
`;

export class ProductCard extends React.Component {
  render() {
    const { brand, name, attributes, quantity } = this.props.product;
    const price = this.props.product.prices.find(
      (element) => element.currency.label === this.props.currencyLabel
    );
    return (
      <section className={styles.product}>
        <div className={styles.product__info}>
          <Brand className={styles.product__brand} theme={this.props.theme}>
            {brand}
          </Brand>
          <Name className={styles.product__name} theme={this.props.theme}>
            {name}
          </Name>
          <Price className={styles.product__price} theme={this.props.theme}>
            {price.currency.symbol + Number(price.amount).toFixed(2)}
          </Price>
          <ProductAttributes
            theme={this.props.theme}
            attributes={attributes}
            change={() => null}
          />
        </div>
        <div className={styles.product__quantity}>
          <QuantityButton
            className={styles.product__quantity_button}
            theme={this.props.theme}
          >
            +
          </QuantityButton>
          {quantity}
          <QuantityButton
            className={styles.product__quantity_button}
            theme={this.props.theme}
          >
            -
          </QuantityButton>
        </div>
      </section>
    );
  }
}
