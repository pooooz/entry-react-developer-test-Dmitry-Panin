import React from 'react';

import styles from './Gallery.module.scss';

export class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedImage: this.props.images[0] };
  }

  render() {
    return (
      <div className={styles.gallery}>
        <div className={styles.gallery__side}>
          {this.props.images.map((image, index) => (
            <img
              src={image}
              alt="Product photo"
              key={index}
              className={styles.gallery__unselected}
              onClick={() => this.setState({ selectedImage: image })}
            />
          ))}
        </div>
        <div className={styles.gallery__selected_wrap}>
          <img
            src={this.state.selectedImage}
            alt="Selected product photo"
            className={styles.gallery__selected}
          />
        </div>
      </div>
    );
  }
}
