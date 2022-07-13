import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';

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
          <PersistGate persistor={persistor}>
            <AppRouterWithCategories />
          </PersistGate>
        </Suspense>
      </Provider>
    );
  }
}

export default App;
