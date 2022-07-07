import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { graphql } from '@apollo/client/react/hoc';

import { GET_CATEGORIES_AND_CURRENCIES } from 'queries/categories_currencies';
import { Header } from 'components/Header/Header';
import { Category } from 'pages/Category/Category';
import { ProductWithRouter } from 'pages/Product/Product';
import { CartWithConnect } from 'pages/Cart/Cart';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }
  render() {
    try {
      if (!this.props.data.loading) {
        return (
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Header
                    categories={Array.from(
                      this.props.data.categories,
                      (category) => category.name
                    )}
                    currencies={this.props.data.currencies}
                  />
                }
              >
                {this.props.data.categories.map((category) => (
                  <Route
                    path={'/' + category.name}
                    element={<Category category={category.name} />}
                    key={1}
                  />
                ))}
                <Route path="items/:id" element={<ProductWithRouter />} />
                <Route path="cart" element={<CartWithConnect />} />
              </Route>
              <Route
                path="*"
                element={
                  <h2 style={{ color: '#00BFFF', margin: '10px' }}>
                    Wrong path, page cannot be found
                  </h2>
                }
              />
            </Routes>
          </BrowserRouter>
        );
      }
    } catch (error) {
      return <h1>The service is temporarily down!</h1>;
    }
  }
}

export const AppRouterWithCategories = graphql(GET_CATEGORIES_AND_CURRENCIES)(
  AppRouter
);
