import React from 'react';
import { connect } from 'react-redux';
import { selectCurrency } from 'store/currency/currency';

import { ReactComponent as DropdownIcon } from 'icons/dropdownIcon.svg';
import styles from './CurrencySwitcher.module.scss';

const mapStateToProps = (state) => {
  return {
    currency: {
      symbol: state.currency.symbol,
      label: state.currency.label,
    },
  };
};

const mapDispatchToProps = {
  selectCurrency,
};

class CurrencySwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.currencySwitcherRef = React.createRef();
    this.state = {
      isVisible: false,
    };

    this.props.selectCurrency({
      symbol: this.props.currencies[0].symbol,
      label: this.props.currencies[0].label,
    });
  }

  handleClick = (symbol, label) => {
    this.props.selectCurrency({
      symbol: symbol,
      label: label,
    });
  };

  handleOutsideClick = (event) => {
    if (
      this.currencySwitcherRef.current &&
      !this.currencySwitcherRef.current.contains(event.target)
    ) {
      this.setState({ isVisible: false });
    }
  };

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  render() {
    return (
      <div
        className={styles.currencySwitcher}
        onClick={() => this.setState({ isVisible: !this.state.isVisible })}
        ref={this.currencySwitcherRef}
      >
        {this.props.currency.symbol}
        <DropdownIcon className={styles.currencySwitcher__dropdown_icon} />
        {this.state.isVisible && (
          <ul className={styles.currencySwitcher__dropdown}>
            {this.props.currencies.map((currency, index) => (
              <li
                key={index}
                className={
                  currency.symbol === this.props.currency.symbol
                    ? styles.currencySwitcher__dropdown_item_active
                    : styles.currencySwitcher__dropdown_item
                }
                onClick={() =>
                  this.handleClick(currency.symbol, currency.label)
                }
              >
                {currency.symbol} {currency.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export const CurrencySwitcherWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencySwitcher);
