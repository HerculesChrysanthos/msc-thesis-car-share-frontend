import React from 'react';
import { useSelector } from 'react-redux';
import { IoStar } from 'react-icons/io5';
import { MdStarHalf } from 'react-icons/md';
import Spinner from '../../../Spinner';
import NoCarsImage from '../../../../assets/car/no_cars.png';
import { useNavigate } from 'react-router-dom';
import NoCarImage from '../../../../assets/car/no_image.png';

function MyCarsList({ displayedCar, setDisplayedCar }) {
  const { myCars, carIsLoading } = useSelector((state) => state.car);
  const navigate = useNavigate();

  const displayStars = (stars) => {
    const totalStars = 5;

    const roundedStars = Math.round(stars);

    const filledStars = roundedStars;
    const emptyStars = totalStars - filledStars;

    return (
      <div className='stars'>
        {Array.from({ length: filledStars }, (_, index) => (
          <div className='star' key={index}>
            <IoStar key={`filled-${index}`} fill='#912740' size='18px' />
          </div>
        ))}
        {Array.from({ length: emptyStars }, (_, index) => (
          <div className='star' key={index + filledStars}>
            <IoStar key={`empty-${index}`} fill='#EFD4DA' size='18px' />
          </div>
        ))}
      </div>
    );
  };

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
                <img
                  src={car?.thumbnail?.url ? car?.thumbnail?.url : NoCarImage}
                  alt='Car image'
                />
              </div>
              <div className='car-info'>
                <h2>
                  {car?.make.name} {car?.model.name}
                </h2>
                <div className='rating'>
                  {displayStars(car.ratingsScore)}
                  {car?.ratingsAmount && (
                    <div className='text'>
                      ({car?.ratingsAmount}) Αξιολογήσεις
                    </div>
                  )}
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
