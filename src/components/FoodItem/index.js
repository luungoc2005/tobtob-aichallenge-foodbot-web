import React from 'react';

import { AppContext } from '../../App';

import { Button } from 'antd';
import menu from '../../menu.json';

export const FoodItem = ({ id }) => {
  const item = menu.find(item => item.intent_name === id)
  if (item) {
    return <AppContext.Consumer>
      {context => <div style={{ padding: 12 }}>
        <Button block style={{ height: 'initial' }}
          onClick={() => context.addToCart(item)}
        >
          <div>{item.name}</div>
          <small>{item.price},000</small>
        </Button>
      </div>}
    </AppContext.Consumer>
  }
  else {
    return <span>Item Not Found</span>
  }
}

export default FoodItem