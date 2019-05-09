import React from 'react';
import { RingLoader } from 'react-spinners';

const LoadingSpinner = () => (
  <div
    style={{ zIndex: 1000, height: '100vh' }}
    className="d-flex justify-content-center align-items-center"
  >
    <RingLoader color="#123abc" loading />
  </div>
);

export default LoadingSpinner;
