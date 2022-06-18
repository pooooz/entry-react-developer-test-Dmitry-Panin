import React from 'react';
import styles from './AddForm.module.scss';

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
    console.log(this.props);
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
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
        className={styles.product__form}
      >
        <h2 className={styles.product__brand}>{this.props.product.brand}</h2>
        <h3 className={styles.product__name}>{this.props.product.name}</h3>
        {this.state.attributes.map((attribute) => (
          <fieldset key={attribute.id} className={styles.product__attribute}>
            <legend className={styles.product__attribute_legend}>
              {attribute.name}:
            </legend>
            <ul className={styles.product__attribute_list}>
              {attribute.items.map((item) =>
                attribute.type === 'swatch' ? (
                  <li
                    className={styles.product__attribute_item_swatch}
                    key={item.id}
                  >
                    <input
                      type="radio"
                      id={item.id}
                      name={attribute.name}
                      value={item.value}
                      className={styles.product__attribute_input_swatch}
                      checked={item.checked}
                      onChange={() => this.handleChange(attribute.id, item.id)}
                    />
                    <label
                      htmlFor={item.id}
                      className={styles.product__attribute_label_swatch}
                    >
                      <span
                        className={styles.product__attribute_swatch_color}
                        style={{ background: item.value }}
                      ></span>
                    </label>
                  </li>
                ) : (
                  <li className={styles.product__attribute_item} key={item.id}>
                    <input
                      type="radio"
                      id={item.id}
                      name={attribute.name}
                      value={item.value}
                      className={styles.product__attribute_input}
                      checked={item.checked}
                      onChange={() => this.handleChange(attribute.id, item.id)}
                    />
                    <label
                      htmlFor={item.id}
                      className={styles.product__attribute_label}
                    >
                      <span>{item.value}</span>
                    </label>
                  </li>
                )
              )}
            </ul>
          </fieldset>
        ))}
        <h4 className={styles.product__price_header}>Price:</h4>
        <h4 className={styles.product__price}>
          <var className={styles.product__price_value}>
            {this.props.product.prices[0].currency.symbol +
              Number(this.props.product.prices[0].amount).toFixed(2)}
          </var>
        </h4>
        <button className={styles.product__add_button}>Add to cart</button>
        <div
          dangerouslySetInnerHTML={{ __html: this.props.product.description }}
          className={styles.product__description}
        ></div>
      </form>
    );
  }
}
