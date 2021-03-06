import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { CurrencySwitcherWithConnect } from './components/CurrencySwitcher/CurrencySwitcher';
import { CartOverlayWithConnect } from './components/CartOverlay/CartOverlay';
import styles from './Header.module.scss';
import { ReactComponent as PaperBagLogo } from 'icons/paperBagIcon.svg';

export class Header extends React.Component {
  render() {
    return (
      <>
        <header className={styles.header}>
          <ul className={styles.header__categories}>
            {this.props.categories.map((category) => (
              <li key={nanoid()}>
                <NavLink
                  className={(isActive) =>
                    !isActive.isActive
                      ? styles.header__category
                      : styles.header__category_active
                  }
                  to={`/${category}`}
                >
                  {category}
                </NavLink>
              </li>
            ))}
          </ul>
          <NavLink to="cart" className={styles.header__paper_bag}>
            <PaperBagLogo />
          </NavLink>
          <div className={styles.header__shopping_area}>
            <CurrencySwitcherWithConnect currencies={this.props.currencies} />
            <CartOverlayWithConnect />
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </>
    );
  }
}
