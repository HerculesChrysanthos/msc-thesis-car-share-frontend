import React, { useState } from 'react';
import { IoStar } from 'react-icons/io5';
import { MdStarHalf } from 'react-icons/md';
import { IoIosArrowBack } from 'react-icons/io';
import CarAvailability from './carTabs/CarAvailability';
import CarReservations from './carTabs/CarReservations';
import CarInfomrations from './carTabs/CarInfomrations';
import CarExtraFeatures from './carTabs/CarExtraFeatures';
import CarImages from './carTabs/CarImages';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { deleteCar } from '../../../../features/car/carSlice';

function SingleCar({ displayedCar, setDisplayedCar }) {
  const [selectedCarTab, setSelectedCarTab] = useState(0);
  const tabList = [
    {
      name: 'Διαθεσιμότητα',
      component: (
        <CarAvailability car={displayedCar} setDisplayedCar={setDisplayedCar} />
      ),
    },
    {
      name: 'Κρατήσεις',
      component: (
        <CarReservations car={displayedCar} setDisplayedCar={setDisplayedCar} />
      ),
    },
    {
      name: 'Στοιχεία οχήματος',
      component: (
        <CarInfomrations car={displayedCar} setDisplayedCar={setDisplayedCar} />
      ),
    },
    {
      name: 'Επιπλέον χαρακτηριστικά',
      component: (
        <CarExtraFeatures
          car={displayedCar}
          setDisplayedCar={setDisplayedCar}
        />
      ),
    },
    {
      name: 'Φωτογραφίες',
      component: (
        <CarImages car={displayedCar} setDisplayedCar={setDisplayedCar} />
      ),
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteCarFun = () => {
    dispatch(deleteCar({ carId: displayedCar._id }))
      .unwrap()
      .then((res) => {
        toast.success('Το αμάξι διαγράφηκε επιτυχώς');
        const timeoutId = setTimeout(() => {
          navigate('/profile');
        }, 1000);
        return () => {
          clearTimeout(timeoutId);
        };
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className='single-car'>
      <div className='car-top-section'>
        <button className='back-button' onClick={() => setDisplayedCar({})}>
          <IoIosArrowBack size='16px' /> Πίσω
        </button>
        <h2>
          {displayedCar?.make.name} {displayedCar?.model.name}
        </h2>
        <div className='rating-delete'>
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
          <div className='delete-car'>
            <button onClick={deleteCarFun}>Διαγραφή οχήματος</button>
          </div>
        </div>
      </div>
      <div className='single-car-tabs'>
        <div className='car-tabs'>
          {tabList.map((menu, index) => (
            <div
              key={index}
              className={`car-tab ${
                selectedCarTab === index ? 'selected-car-tab' : ''
              }`}
              onClick={() => setSelectedCarTab(index)}
            >
              {menu.name}
            </div>
          ))}
        </div>
        <div className='selected-tab'>{tabList[selectedCarTab].component}</div>
      </div>
    </div>
  );
}

export default SingleCar;
