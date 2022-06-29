import React from 'react';
import styles from './ProductAttributes.module.scss';

export class ProductAttributes extends React.Component {
  render() {
    return (
      <>
        {this.props.attributes.map((attribute) => (
          <fieldset key={attribute.id} className={styles.attribute}>
            <legend className={styles.attribute_legend}>
              {attribute.name}:
            </legend>
            <ul className={styles.attribute_list}>
              {attribute.items.map((item) =>
                attribute.type === 'swatch' ? (
                  <li className={styles.attribute_item_swatch} key={item.id}>
                    <input
                      type="radio"
                      id={item.id}
                      name={attribute.name}
                      value={item.value}
                      className={styles.attribute_input_swatch}
                      checked={item.checked}
                      onChange={() => this.props.change(attribute.id, item.id)}
                    />
                    <label
                      htmlFor={item.id}
                      className={styles.attribute_label_swatch}
                    >
                      <span
                        className={styles.attribute_swatch_color}
                        style={{ background: item.value }}
                      ></span>
                    </label>
                  </li>
                ) : (
                  <li className={styles.attribute_item} key={item.id}>
                    <input
                      type="radio"
                      id={item.id}
                      name={attribute.name}
                      value={item.value}
                      className={styles.attribute_input}
                      checked={item.checked}
                      onChange={() => this.props.change(attribute.id, item.id)}
                    />
                    <label htmlFor={item.id} className={styles.attribute_label}>
                      <span>{item.value}</span>
                    </label>
                  </li>
                )
              )}
            </ul>
          </fieldset>
        ))}
      </>
    );
  }
}
