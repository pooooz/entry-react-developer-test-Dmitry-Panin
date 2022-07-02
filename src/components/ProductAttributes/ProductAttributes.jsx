import React from 'react';
import styled, { css } from 'styled-components';

import styles from './ProductAttributes.module.scss';

const StyledFieldset = styled.fieldset`
  ${(props) => {
    switch (props.theme) {
      case 'overlay':
        return css`
          margin: 10px 0 0 0;
        `;
    }
  }}
`;

const AttributeName = styled.legend`
  ${(props) =>
    props.theme === 'overlay' &&
    css`
      margin: 0;
      font-size: 14px;
      line-height: 16px;
      font-weight: 400;
    `}
`;

const StyledLabel = styled.label`
  ${(props) =>
    props.theme === 'overlay' &&
    css`
      width: 24px;
      height: 24px;
      font-size: 14px;
    `}
`;

const StyledSwatchLabel = styled.label`
  ${(props) =>
    props.theme === 'overlay' &&
    css`
      width: 16px;
      height: 16px;
    `}
`;

const SwatchColor = styled.span`
  ${(props) =>
    props.theme === 'overlay' &&
    css`
      width: 16px;
      height: 16px;
    `}
`;

export class ProductAttributes extends React.Component {
  render() {
    return (
      <>
        {this.props.attributes.map((attribute, attributeIndex) => (
          <StyledFieldset
            key={attribute.id}
            className={styles.attribute}
            theme={this.props.theme}
          >
            <AttributeName
              className={styles.attribute_legend}
              theme={this.props.theme}
            >
              {attribute.name}:
            </AttributeName>
            <ul className={styles.attribute_list}>
              {attribute.items.map((item) =>
                attribute.type === 'swatch' ? (
                  <li className={styles.attribute_item_swatch} key={item.id}>
                    <input
                      type="radio"
                      id={item.id}
                      name={attribute.name}
                      value={item.value}
                      checked={item.checked}
                      className={styles.attribute_input_swatch}
                      onChange={() => this.props.change(attribute.id, item.id)}
                    />
                    <StyledSwatchLabel
                      htmlFor={item.id}
                      className={
                        item.checked
                          ? styles.attribute_label_swatch_checked
                          : styles.attribute_label_swatch
                      }
                      theme={this.props.theme}
                    >
                      <SwatchColor
                        className={styles.attribute_swatch_color}
                        style={{ background: item.value }}
                        theme={this.props.theme}
                      ></SwatchColor>
                    </StyledSwatchLabel>
                  </li>
                ) : (
                  <li className={styles.attribute_item} key={item.id}>
                    <input
                      type="radio"
                      id={item.id + attributeIndex}
                      name={attribute.name}
                      value={item.value}
                      checked={item.checked}
                      className={styles.attribute_input}
                      onChange={() => this.props.change(attribute.id, item.id)}
                    />
                    <StyledLabel
                      htmlFor={item.id + attributeIndex}
                      className={
                        item.checked
                          ? styles.attribute_label_checked
                          : styles.attribute_label
                      }
                      theme={this.props.theme}
                    >
                      <span>{item.value}</span>
                    </StyledLabel>
                  </li>
                )
              )}
            </ul>
          </StyledFieldset>
        ))}
      </>
    );
  }
}
