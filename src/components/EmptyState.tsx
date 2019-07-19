import React from 'react';
import { Link } from 'react-router-dom';
import { Empty, Typography, Button } from 'antd';

const { Text } = Typography;

interface IEmptyState {
  mainText?: string,
  subText?: string,
  buttonText?: string,
  buttonLink?: string,
}

const EmptyState = ({ mainText, subText = 'No Data', buttonText, buttonLink }: IEmptyState) => (
  <Empty
    description={(
      <>
        {mainText && <Text strong className="mt-3 mb-1 d-block">{mainText}</Text>}
        <Text type="secondary">{subText}</Text>
      </>
    )}
  >
    {(buttonText && buttonLink) && (
      <Link to={buttonLink}>
        <Button type="primary">{buttonText}</Button>
      </Link>
    )}
  </Empty>
);

export default EmptyState;
