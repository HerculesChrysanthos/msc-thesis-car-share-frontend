import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import RegisterNewCar from '../components/car/RegisterNewCar';
import CreateCarSteps from '../components/car/CreateCarSteps';

function CarRegistration() {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  if (!user) return <Navigate to='/not-found' />;

  return (
    <div>
      <RegisterNewCar />
    </div>
  );
}

export default CarRegistration;
