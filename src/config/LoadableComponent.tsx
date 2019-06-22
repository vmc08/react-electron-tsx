import React from 'react';
import loadable from '@loadable/component';
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

interface ILoadableComponentProps {
  componentName: string,
}

const LoadableComponent = ({ componentName }: ILoadableComponentProps) => {
  return loadable(() => import(`../${componentName}`), {
    fallback: <Spin indicator={antIcon} />,
  });
};

export default LoadableComponent;
