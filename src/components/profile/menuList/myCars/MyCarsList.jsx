import React from 'react';
import { useSelector } from 'react-redux';
import { IoStar } from 'react-icons/io5';
import { MdStarHalf } from 'react-icons/md';
import Spinner from '../../../Spinner';
import NoCarsImage from '../../../../assets/car/no_cars.png';
import { useNavigate } from 'react-router-dom';

function MyCarsList({ displayedCar, setDisplayedCar }) {
  const { myCars, carIsLoading } = useSelector((state) => state.car);
  const navigate = useNavigate();

  if (carIsLoading)
    return (
      <div className='spinner-full-width'>
        <Spinner />
      </div>
    );

  return (
    <div className='car-list'>
      {myCars.length > 0 ? (
        <div className='mycars-list'>
          {myCars.map((car) => (
            <div
              key={car?._id}
              className='car'
              onClick={() => setDisplayedCar(car)}
            >
              <div className='car-img'>
                <img src={car?.thumbnail?.url} alt='Car image' />
              </div>
              <div className='car-info'>
                <h2>
                  {car?.make.name} {car?.model.name}
                </h2>
                <div className='rating'>
                  <div className='stars'>
                    <div className='star'>
                      <IoStar fill='#912740' size='18px' />
                    </div>
                    <div className='star'>
                      <IoStar fill='#912740' size='18px' />
                    </div>
                    <div className='star'>
                      <IoStar fill='#912740' size='18px' />
                    </div>
                    <div className='star'>
                      <IoStar fill='#912740' size='18px' />
                    </div>
                    <div className='star'>
                      <MdStarHalf fill='#912740' size='18px' />
                    </div>
                  </div>
                  <div className='text'>(7) Αξιολογήσεις</div>
                </div>
              </div>
            </div>
          ))}
          <div className='add-car-container'>
            <button
              onClick={() => navigate('/car-registration')}
              className='add-car'
            >
              Πρόσθεσε όχημα
            </button>
          </div>
        </div>
      ) : (
        <div className='no-cars-registered'>
          <h2>Δεν έχει καταχωρίσει κάποιο όχημα ακόμα</h2>
          <div className='img'>
            <img src={NoCarsImage} alt='Car Image' />
          </div>
          <div className='add-car-container'>
            <button
              onClick={() => navigate('/car-registration')}
              className='add-car'
            >
              Πρόσθεσε όχημα
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyCarsList;
