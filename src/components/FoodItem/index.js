import React from 'react';

import { Button } from 'antd';
import menu from '../../menu.json';

export const FoodItem = ({ id }) => {
  const item = menu.find(item => item.intent_name === id)
  if (item) {
    return <div style={{ padding: 12 }}>
        <Button block style={{ height: 'initial' }}>
          <div>{item.name}</div>
          <small>{item.price},000</small>
        </Button>
      </div>
  }
  else {
    return <span>Item Not Found</span>
  }
}

export default FoodItem