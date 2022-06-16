import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { nanoid } from 'nanoid';

import styles from './Header.module.scss';
import { ReactComponent as PaperBagLogo } from 'icons/paperBagIcon.svg';
import { ReactComponent as CartIcon } from 'icons/cartIcon.svg';
import { ReactComponent as DropdownIcon } from 'icons/dropdownIcon.svg';

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
          <PaperBagLogo />
          <div className={styles.header__shopping_area}>
            <div className={styles.header__currency_area}>
              $
              <DropdownIcon className={styles.header__dropdown} />
            </div>
            <CartIcon className={styles.header__cart_icon} />
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </>
    );
  }
}
