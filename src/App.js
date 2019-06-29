import React, { createContext } from 'react';

import { v4 } from 'uuid';

import PageLayout from './components/PageLayout';

import AppRouter from './routes';

const DEFAULT_STATE = {
  cart: [],
  addToCart: () => null,
}

export const AppContext = createContext(DEFAULT_STATE);

class App extends React.Component {
  state = {
    ...DEFAULT_STATE,
    addToCart: this.addToCart,
  }

  addToCart = item => {
    this.setState({
      cart: [...this.state.cart, 
        {id: v4(), ...item},
      ]
    })
  }

  render() {
    return (
      <PageLayout>
        <AppContext.Provider value={this.state}>
          <AppRouter />
        </AppContext.Provider>
      </PageLayout>
    );
  }
}

export default App;
