import React from 'react';

import styles from './Category.module.scss';

export class Category extends React.Component {
  render() {
    return (
      <section className={styles.category}>
        <h1 className={styles.category__header}>{this.props.category}</h1>
      </section>
    );
  }
}
