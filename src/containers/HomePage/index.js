import React from 'react';

import FoodItem from '../../components/FoodItem';

import { Button, Row, Col } from 'antd';

function HomePage() {
  return (
    <>
      <h1>Starters</h1>
      <div>
        <Row>
          <Col span={8}>
            <FoodItem id="vn_springroll_veggie" />
          </Col>
          <Col span={8}>
            <FoodItem id="vn_springroll_traditional" />
          </Col>
          <Col span={8}>
            <FoodItem id="vn_springroll_shrimp" />
          </Col>
        </Row>
        <div style={{ height: '10px' }} />
        <Row>
          <Col span={8}>
            <FoodItem id="mandarin_chicken_salad" />
          </Col>
          <Col span={8}>
            <FoodItem id="broccoli_bacon_salad" />
          </Col>
          <Col span={8}>
            <FoodItem id="strawberry_spinach_salad" />
          </Col>
        </Row>
      </div>
      <div style={{ height: '25px' }} />
      <h1>Main Courses</h1>
      <div>
        <Row>
          <Col span={8}>
            <FoodItem id="veggie_meatbbq_rice" />
          </Col>
        </Row>
      </div>
      <div style={{ height: '25px' }} />
      <h1>Drink and Desserts</h1>
    </>
  );
}

export default HomePage;
