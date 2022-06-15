import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { graphql } from '@apollo/client/react/hoc';

import { GET_ALL_CATEGORIES } from 'queries/categories';
import { Header } from 'components/Header/Header';
import { Category } from 'pages/Category/Category';

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

export const AppRouterWithCategories = graphql(GET_ALL_CATEGORIES)(AppRouter);
