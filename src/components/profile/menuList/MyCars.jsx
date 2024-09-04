import React, { useEffect, useState } from 'react';
import SingleCar from './myCars/SingleCar';
import MyCarsList from './myCars/MyCarsList';
import { useDispatch, useSelector } from 'react-redux';
import { getMycars } from '../../../features/car/carSlice';

function MyCars({ displayedCar, setDisplayedCar }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user.user.verified) {
      dispatch(getMycars())
        .unwrap()
        .then((res) => {})
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  if (!user.user.verified)
    return <div>Παρακαλώ επαλύθευσε τον λογαριασμό σου</div>;
  return (
    <div className='my-cars'>
      {displayedCar?._id ? (
        <SingleCar
          displayedCar={displayedCar}
          setDisplayedCar={setDisplayedCar}
        />
      ) : (
        <MyCarsList
          displayedCar={displayedCar}
          setDisplayedCar={setDisplayedCar}
        />
      )}
    </div>
  );
}

export default MyCars;
