import React, { useEffect } from 'react';
import { getCar } from '../features/car/carSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CarCreateBook from '../components/car/singleCar/CarCreateBook';
import CarMap from '../components/car/singleCar/CarMap';
import CarOwner from '../components/car/singleCar/CarOwner';
import { IoStar } from 'react-icons/io5';
import CarImages from '../components/car/singleCar/CarImages';
import { GiGearStickPattern } from 'react-icons/gi';
import { FaCar } from 'react-icons/fa6';
import { MdLocalGasStation } from 'react-icons/md';
import { MdGroups } from 'react-icons/md';

function Car() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { singleCar } = useSelector((state) => state.car);

  const queryParameters = new URLSearchParams(window.location.search);
  const startDate = queryParameters.get('startDate');
  const endDate = queryParameters.get('endDate');

  useEffect(() => {
    if (!id) navigate('/not-found');

    dispatch(
      getCar({
        carId: id,
      })
    )
      .unwrap()
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className='container single-car-page'>
      <CarImages images={singleCar.images} />
      <div className='car-details'>
        <div className='car-text'>
          <div className='name'>
            <h2>
              {singleCar?.make?.name} {singleCar?.model?.name}
            </h2>
            <p>
              <IoStar fill='#912740' size='18px' /> (7) Αξιολογήσεις
            </p>
          </div>
          <div className='features'>
            <h3>Χαρακτηριστικά οχήματος</h3>
            <div className='display-features'>
              <div className='feature'>
                <div className='icon'>
                  <FaCar fill='#912740' />
                </div>
                {singleCar?.gearboxType}
              </div>
              <div className='feature'>
                <div className='icon'>
                  <GiGearStickPattern fill='#912740' size='18px' />
                </div>
                {singleCar?.gearboxType}
              </div>
              <div className='feature'>
                <div className='icon'>
                  <MdLocalGasStation fill='#912740' size='20px' />
                </div>
                {singleCar?.fuelType}
              </div>
              <div className='feature'>
                <div className='icon'>
                  <MdGroups fill='#912740' size='21px' />
                </div>
                {singleCar?.seats} θέσεις
              </div>
            </div>
            <div className='display-car-details'>
              <div className='top'>
                <div className='detail'>Χιλιόμετρα: {singleCar?.mileage}</div>
                <div className='detail'>
                  Έτος: {singleCar?.registration?.year}
                </div>
                <div className='detail'>Κυβικά: {singleCar?.mileage}</div>
                <div className='detail'>Ιπποί: {singleCar?.mileage}</div>
              </div>
              <div className='bottom'>
                {singleCar?.features?.map((feature, index) => (
                  <div key={index} className='detail'>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <CarMap address={singleCar?.address} />
          <CarOwner ownerId={singleCar?.owner} />
        </div>
        {startDate && endDate ? (
          <CarCreateBook
            car={singleCar?._id}
            startDate={startDate}
            endDate={endDate}
            address={singleCar?.address}
            rentPerHour={singleCar.rentPerHour}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Car;
