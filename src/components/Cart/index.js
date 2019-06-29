import React from 'react';

import { Row, Col, InputNumber, Button, List } from 'antd';
import { AppContext } from '../../App';

export const Cart = () => <AppContext.Consumer>
  {context => <div style={{ padding: 20, color: 'white' }}>
    <h1 style={{ color: 'white', userSelect: 'none' }}>Your Cart</h1>
    {/* <div style={{ height: 10 }} /> */}
    <List
      dataSource={context.cart}
      header={<Row style={{ color: 'white' }}>
        <Col span={18}>Item</Col>
        <Col span={6} style={{ textAlign: 'right' }}>Qty</Col>
      </Row>}
      footer={<Row style={{ color: 'white' }}>
        <Col span={18}>Total</Col>
        <Col span={6} style={{ textAlign: 'right' }}>{
          (context.cart.map(item => item.qTy * item.price).reduce((a, b) => a + b, 0)).toFixed(3)
        }</Col>
      </Row>}
      renderItem={(item) => <List.Item key={item.id}>
        <Row style={{ color: 'white', width: '100%' }}>
          <Col span={18}>
            <Button ghost shape="circle" icon="close" size="small" 
              onClick={() => context.onRemoveItem(item.id)}
            />
            <span style={{ marginLeft: '10px' }}>{item.name}</span>
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <InputNumber 
              min={1}
              defaultValue={item.qTy || 1}
              onChange={(value) => context.onQtyChange(item.id, value)}
            />
          </Col>
        </Row>
        {item.notes && <Row>
          <small>{item.notes}</small>
        </Row>}
      </List.Item>}
    />
  </div>}
</AppContext.Consumer>

export default Cart