import React, { createContext } from 'react';

import { v4 } from 'uuid';

import PageLayout from './components/PageLayout';

import AppRouter from './routes';

const DEFAULT_STATE = {
  cart: [],
  addToCart: () => null,
  onQtyChange: () => null,
  onRemoveItem: () => null,
  onPropChange: () => null,
  onChangeItem: () => null,
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
      onPropChange: this.onPropChange,
      onChangeItem: this.onChangeItem,
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

  onPropChange = (id, propName, value) => {
    this.setState({
      cart: this.state.cart.map(item => item.id === id
        ? {...item, [propName]: value,}
        : item)
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

  onChangeItem = (id, newItem) => {
    this.setState({
      cart: this.state.cart.map(item => item.id === id
        ? {...item, qTy: 1, ...newItem}
        : item)
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
