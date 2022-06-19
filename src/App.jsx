import React, { Suspense } from 'react';
import { Provider } from 'react-redux';

import { store } from './store';

const AppRouterWithCategories = React.lazy(() =>
  Promise.all([
    import('components/AppRouter').then(({ AppRouterWithCategories }) => ({
      default: AppRouterWithCategories,
    })),
  ]).then(([moduleExports]) => moduleExports)
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
          <AppRouterWithCategories />
        </Suspense>
      </Provider>
    );
  }
}

export default App;
