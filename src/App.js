import React from 'react';

import PageLayout from './components/PageLayout';

import AppRouter from './routes';

function App() {
  return (
    <PageLayout>
      <AppRouter />
    </PageLayout>
  );
}

export default App;
