import React from 'react';

import { Row, Col } from 'antd';
import { AppContext } from '../../App';

export const Cart = () => <AppContext.Consumer>
  {context => <div style={{ padding: 20, color: 'white' }}>
    <h1 style={{ color: 'white', userSelect: 'none' }}>Your Cart</h1>
    {context.cart.map(item => <Row style={{ color: 'white' }}><span>{item.name}</span></Row>)}
  </div>}
</AppContext.Consumer>

export default Cart