import React from 'react';
import { Row, Col, Button } from 'antd';

function Footer() {
  return (
    <footer id="footer" className="dark">
     

      <Row className="bottom-bar">
        <Col lg={6} sm={24}>
          <div className="translate-button">

          </div>
        </Col>
        <Col lg={18} sm={24}>
          <span
            style={{
              lineHeight: '16px',
              paddingRight: 12,
              marginRight: 11,
              borderRight: '1px solid rgba(255, 255, 255, 0.55)',
            }}
          >
            <a
              href="https://beian.miit.gov.cn"
              rel="noopener noreferrer"
              target="_blank"
            >
              桂 ICP 备 15007024 号-3
            </a>
          </span>
          <span style={{ marginRight: 12 }}>Copyright © 韦世东丨微信号 vansenb</span>
        </Col>
      </Row>
    </footer>
  );
}


export default Footer;
