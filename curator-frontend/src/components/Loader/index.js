import React from 'react';

import Lottie from 'react-lottie';
import animationData from './loader.json';

export const Spinner = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(255,255,255)',
        position: 'fixed',
        left: '0px',
        top: '0px',
        zIndex: 5,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Lottie
        options={defaultOptions}
        height={100}
        width={100}
        isStopped={false}
        style={{ zIndex: 999 }}
      />
    </div>
  );
};
