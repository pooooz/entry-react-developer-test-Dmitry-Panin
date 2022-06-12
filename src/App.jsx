import React, { Suspense } from 'react';

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
      <Suspense fallback={<div>Loading...</div>}>
        <AppRouterWithCategories />
      </Suspense>
    );
  }
}

export default App;
