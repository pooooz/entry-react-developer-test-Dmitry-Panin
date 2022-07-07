import React from 'react';

import { ReactComponent as LeftArrow } from 'icons/leftArrow.svg';
import { ReactComponent as RightArrow } from 'icons/rightArrow.svg';
import styles from './Carousel.module.scss';

export class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };

    this.leftClick = this.leftClick.bind(this);
    this.rightClick = this.rightClick.bind(this);
  }

  leftClick() {
    this.state.index === 0
      ? this.setState((state, props) => ({ index: props.images.length - 1 }))
      : this.setState((state) => ({ index: state.index - 1 }));
  }

  rightClick() {
    this.state.index === this.props.images.length - 1
      ? this.setState({ index: 0 })
      : this.setState((state) => ({ index: state.index + 1 }));
  }

  render() {
    return (
      <section className={styles.carousel}>
        <div className={styles.carousel__image_wrap}>
          <div
            className={
              styles.carousel__arrow_box + ' ' + styles.carousel__arrow_box_left
            }
            onClick={this.leftClick}
          >
            <LeftArrow />
          </div>
          <img
            src={this.props.images[this.state.index]}
            alt="Product image"
            className={styles.carousel__image}
          />
          <div
            className={
              styles.carousel__arrow_box +
              ' ' +
              styles.carousel__arrow_box_right
            }
            onClick={this.rightClick}
          >
            <RightArrow />
          </div>
        </div>
      </section>
    );
  }
}
