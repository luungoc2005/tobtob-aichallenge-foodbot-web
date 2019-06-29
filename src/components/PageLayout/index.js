import React from 'react';

import Messages from '../Messages';
import Cart from '../Cart';

import HandTrack from '../HandTrack';
import Speech from '../Speech';

import { Layout, Row, Col } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

export const PageLayout = ({ children }) => <Layout>
  <Header className="header" style={{ color: 'white', userSelect: 'none', fontWeight: '600' }}>
    tobtob Food Bot
  </Header>
  <Layout>
    <Content style={{ padding: '0 50px', marginTop: 32 }}>
      <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
        <Row>
          <Col span={18}>
            <Messages />
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <HandTrack />
            <Speech />
          </Col>
        </Row>
        {children}
      </div>
      <Footer style={{ textAlign: 'center' }}>Created for VAGC 2019 by luungoc2005</Footer>
    </Content>
    <Sider>
      <Cart />
    </Sider>
  </Layout>
</Layout>

export default PageLayout;