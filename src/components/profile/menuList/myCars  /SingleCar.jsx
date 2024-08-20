import React from 'react';

function SingleCar({ displayedCar, setDisplayedCar }) {
  return <div>{displayedCar?.model?.name}</div>;
}

export default SingleCar;
