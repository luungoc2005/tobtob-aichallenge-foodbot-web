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
          <Col span={6}>
            <FoodItem id="veggie_meatbbq_rice" />
          </Col>
          <Col span={6}>
            <FoodItem id="hainanese_chicken_rice" />
          </Col>
          <Col span={6}>
            <FoodItem id="friedrice_beef_prickles" />
          </Col>
          <Col span={6}>
            <FoodItem id="salmon_rice" />
          </Col>
        </Row>
        <div style={{ height: '10px' }} />
        <Row>
          <Col span={8}>
            <FoodItem id="tuna_pasta" />
          </Col>
          <Col span={8}>
            <FoodItem id="shrimp_pasta" />
          </Col>
          <Col span={8}>
            <FoodItem id="cajunchicken_pasta" />
          </Col>
        </Row>
        <div style={{ height: '10px' }} />
        <Row>
          <Col span={8}>
            <FoodItem id="eggplant_sandwich" />
          </Col>
          <Col span={8}>
            <FoodItem id="vn_banhmi_chicken" />
          </Col>
          <Col span={8}>
            <FoodItem id="vn_banhmi_beef" />
          </Col>
        </Row>
      </div>
      <div style={{ height: '25px' }} />
      <h1>Drink and Desserts</h1>
      <div>
        <Row>
          <Col span={8}>
            <FoodItem id="milk_soya" />
          </Col>
          <Col span={8}>
            <FoodItem id="milk_almond" />
          </Col>
          <Col span={8}>
            <FoodItem id="milk_fresh" />
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <FoodItem id="coffee_black" />
          </Col>
          <Col span={6}>
            <FoodItem id="coffee_soya" />
          </Col>
          <Col span={6}>
            <FoodItem id="coffee_fmilk" />
          </Col>
          <Col span={6}>
            <FoodItem id="coffee_cmilk" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FoodItem id="mixfruit" />
          </Col>
          <Col span={12}>
            <FoodItem id="mixfruit_yogurt" />
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FoodItem id="pudding_mango" />
          </Col>
          <Col span={8}>
            <FoodItem id="pudding_strawberry" />
          </Col>
          <Col span={8}>
            <FoodItem id="pudding_vanilla" />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default HomePage;
