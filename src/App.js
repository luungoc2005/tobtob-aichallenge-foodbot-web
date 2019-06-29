import React, { createContext } from 'react';

import { v4 } from 'uuid';

import PageLayout from './components/PageLayout';

import AppRouter from './routes';

const DEFAULT_STATE = {
  cart: [],
  addToCart: () => null,
  onQtyChange: () => null,
  onRemoveItem: () => null,
}

export const AppContext = createContext(DEFAULT_STATE);

class App extends React.Component {
  state = {
    ...DEFAULT_STATE,
  }

  componentDidMount() {
    this.setState({
      addToCart: this.addToCart,
      onQtyChange: this.onQtyChange,
      onRemoveItem: this.onRemoveItem,
    })

    // from Ohmni API
    if (window.parent) {
      // const sendJsonCmd = function (jsonData) {
      //   let message ={ type: "OhmniAPI", command: "jsoncmd", jsondata : jsonData };
      //   window.parent.postMessage(message, '*');
      // }
      const showPageOnBot = function (url) {
        let message = { type: "OhmniAPI", command: "pageOnBot", pageInfo : { url: url }};
        window.parent.postMessage(message, '*');
      }
      showPageOnBot(window.location.href);
    }
  }

  addToCart = item => {
    this.setState({
      cart: [
        ...this.state.cart, 
        {id: v4(), qTy: 1, notes: '', ...item},
      ]
    })
  }

  onQtyChange = (id, value) => {
    this.setState({
      cart: this.state.cart.map(item => item.id === id
        ? {...item, qTy: value,}
        : item)
    })
  }

  onRemoveItem = (id) => {
    this.setState({
      cart: this.state.cart.filter(item => item.id !== id)
    })
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <PageLayout>
          <AppRouter />
        </PageLayout>
      </AppContext.Provider>
    );
  }
}

export default App;
