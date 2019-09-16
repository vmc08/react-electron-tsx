import React from 'react';
import { Row, Col, Typography, Card } from 'antd';

const { Title } = Typography;

const ReitsIndex = () => (
  <Row gutter={16}>
    <Col className="mb-2 mb-lg-0" xs={24}>
      <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
        <Title level={4}>REITs Table</Title>
      </Card>
    </Col>
  </Row>
);

export default ReitsIndex;
