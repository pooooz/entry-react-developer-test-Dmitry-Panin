import React from 'react';
import { connect } from 'react-redux';

import { ProductAttributes } from 'components/ProductAttributes/ProductAttributes';
import { addProduct } from 'store/cart/cart';
import styles from './AddForm.module.scss';

const mapStateToProps = (state) => {
  return {
    currencyLabel: state.currency.label,
  };
};

const mapDispatchToProps = {
  addProduct,
};

export class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attributes: this.props.product.attributes.map((attribute) => ({
        ...attribute,
        items: attribute.items.map((item, index) =>
          index === 0 ? { ...item, checked: true } : { ...item, checked: false }
        ),
      })),
    };
  }

  handleChange = (attributeId, itemId) => {
    this.setState({
      attributes: this.state.attributes.map((attribute) =>
        attribute.id === attributeId
          ? {
              ...attribute,
              items: attribute.items.map((item) =>
                item.id === itemId
                  ? { ...item, checked: true }
                  : { ...item, checked: false }
              ),
            }
          : { ...attribute }
      ),
    });
  };

  render() {
    const product = this.props.product;
    const price = product.prices.find(
      (element) => element.currency.label === this.props.currencyLabel
    );

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
        className={styles.product__form}
      >
        <h2 className={styles.product__brand}>{product.brand}</h2>
        <h3 className={styles.product__name}>{product.name}</h3>
        <ProductAttributes
          attributes={this.state.attributes}
          change={this.handleChange}
        />
        <h4 className={styles.product__price_header}>Price:</h4>
        <h4 className={styles.product__price}>
          <var className={styles.product__price_value}>
            {price.currency.symbol + Number(price.amount).toFixed(2)}
          </var>
        </h4>
        <button
          className={styles.product__add_button}
          onClick={() => {
            const attributes = this.state.attributes;
            this.props.addProduct({ ...product, attributes });
          }}
        >
          Add to cart
        </button>
        <div
          dangerouslySetInnerHTML={{ __html: product.description }}
          className={styles.product__description}
        ></div>
      </form>
    );
  }
}

export const AddFormWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddForm);
