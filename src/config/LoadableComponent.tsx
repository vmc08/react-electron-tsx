import React from 'react';
import loadable from '@loadable/component';
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

interface ILoadableComponentProps {
  componentPathName: string,
}

const LoadableComponent = ({ componentPathName }: ILoadableComponentProps) => {
  return loadable(() => import(`../${componentPathName}`), {
    fallback: <Spin indicator={antIcon} />,
  });
};

export default LoadableComponent;
