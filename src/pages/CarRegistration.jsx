import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import RegisterNewCar from '../components/car/RegisterNewCar';

function CarRegistration() {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to='/not-found' />;

  return (
    <div>
      <RegisterNewCar />
    </div>
  );
}

export default CarRegistration;
