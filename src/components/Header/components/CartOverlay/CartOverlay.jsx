import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { ReactComponent as CartIcon } from 'icons/cartIcon.svg';
import { ProductCard } from 'components/ProductCard/ProductCard';
import { changeQuantity, order } from 'store/cart/cart';
import styles from './CartOverlay.module.scss';

const mapStateToProps = (state) => ({
  products: state.cart.products,
  currencyLabel: state.currency.label,
  currencySymbol: state.currency.symbol,
  productsCount: state.cart.productsCount,
});

const mapDispatchToProps = {
  changeQuantity,
  order,
};

const root = document.getElementById('root');
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.el.className = styles.background;
    this.el.style.width = document.body.scrollWidth + 'px';
    this.el.style.height = document.body.scrollHeight + 'px';
  }

  componentDidMount() {
    root.appendChild(this.el);
  }

  componentWillUnmount() {
    root.removeChild(this.el);
  }

  render() {
    console.dir(this.el);
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

class CartOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };

    this.overlayRef = React.createRef();
    this.cartIconRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.order();
  }

  handleOutsideClick = (event) => {
    if (
      this.state.isVisible &&
      this.overlayRef.current &&
      !this.overlayRef.current.contains(event.target) &&
      !this.cartIconRef.current.contains(event.target)
    ) {
      this.setState({ isVisible: false });
    }
  };

  countTotal() {
    return this.props.products.reduce(
      (sum, elem) =>
        sum +
        elem.prices.find(
          (element) => element.currency.label === this.props.currencyLabel
        ).amount *
          elem.quantity,
      0
    );
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick);
  }
  render() {
    const total = this.countTotal();
    return (
      <>
        <div className={styles.cart_icon}>
          <CartIcon
            ref={this.cartIconRef}
            className={styles.header__cart_icon}
            onClick={() => this.setState({ isVisible: !this.state.isVisible })}
          />
          {Boolean(this.props.productsCount) && (
            <span className={styles.products_count}>
              {this.props.productsCount}
            </span>
          )}
        </div>
        {this.state.isVisible && (
          <Modal>
            <div className={styles.overlay} ref={this.overlayRef}>
              <p>
                <span className={styles.overlay__heading}>My Bag,</span>{' '}
                {this.props.productsCount}{' '}
                {this.props.productsCount === 1 ? 'item' : 'items'}
              </p>
              <ul className={styles.overlay__list}>
                {this.props.products.map((elem, index) => (
                  <Fragment key={elem.id + index}>
                    <li className={styles.overlay__element}>
                      <ProductCard
                        product={elem}
                        currencyLabel={this.props.currencyLabel}
                        changeQuantity={this.props.changeQuantity}
                        theme="overlay"
                      />
                      <img
                        src={elem.gallery[0]}
                        alt="Product image"
                        className={styles.overlay__image}
                      />
                    </li>
                  </Fragment>
                ))}
              </ul>
              <div className={styles.overlay__total_wrap}>
                <p className={styles.overlay__total}>Total:</p>
                <span className={styles.overlay__total}>
                  {this.props.currencySymbol + total.toFixed(2)}
                </span>
              </div>
              <form
                className={styles.overlay__form}
                onSubmit={this.handleSubmit}
              >
                <NavLink
                  to="/cart"
                  className={styles.overlay__cart_button}
                  onClick={() => this.setState({ isVisible: false })}
                >
                  View bag
                </NavLink>
                <button className={styles.overlay__order_button}>
                  Check out
                </button>
              </form>
            </div>
          </Modal>
        )}
      </>
    );
  }
}

export const CartOverlayWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartOverlay);
