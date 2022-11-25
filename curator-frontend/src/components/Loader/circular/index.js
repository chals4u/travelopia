import React from 'react';

import Lottie from 'react-lottie';
import animationData from './circularLoader.json';

export const Circular = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Lottie
      options={defaultOptions}
      height={50}
      width={50}
      isStopped={false}
      style={{ zIndex: 999 }}
    />
  );
};
