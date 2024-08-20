import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../../assets/profile/Avatar.png';
import { MdCameraAlt } from 'react-icons/md';
import { IoStar } from 'react-icons/io5';
import { MdStarHalf } from 'react-icons/md';
import UserInfo from './menuList/UserInfo';
import MyCars from './menuList/MyCars';
import MyReservations from './menuList/MyReservations';

function ProfileInfo() {
  const { user } = useSelector((state) => state.auth);
  const [selectedTab, setSelectedTab] = useState(0);
  const [displayedCar, setDisplayedCar] = useState({});

  const menuList = [
    { name: 'Στοιχεία λογαριασμού', component: <UserInfo /> },
    {
      name: 'Τα αμάξια μου',
      component: (
        <MyCars displayedCar={displayedCar} setDisplayedCar={setDisplayedCar} />
      ),
    },
    { name: 'Οι κρατήσεις μου', component: <MyReservations /> },
  ];

  return (
    <div className='container profile-page'>
      <div className='top-section'>
        <div className='profile-image'>
          <img src={Avatar} alt='Profile image' />
          <div className='upload-icon'>
            <MdCameraAlt color='#fff' size='20px' />
          </div>
        </div>
        <div className='user-info'>
          <h2>
            {user?.user?.name} {user?.user?.surname}
          </h2>
          <div className='rating'>
            <div className='stars'>
              <IoStar fill='#912740' size='18px' />
              <IoStar fill='#912740' size='18px' />
              <IoStar fill='#912740' size='18px' />
              <IoStar fill='#912740' size='18px' />
              <MdStarHalf fill='#912740' size='18px' />
            </div>
            <div className='text'>(7) Αξιολογήσεις</div>
          </div>
        </div>
      </div>
      <div className='tab-section'>
        <div className='tabs'>
          {menuList.map((menu, index) => (
            <div
              key={index}
              className={`tab ${selectedTab === index ? 'selected' : ''}`}
              onClick={() =>
                setSelectedTab(index) &
                (selectedTab === 1 && setDisplayedCar({}))
              }
            >
              {menu.name}
            </div>
          ))}
        </div>
        <div className='selected-tab'>{menuList[selectedTab].component}</div>
      </div>
    </div>
  );
}

export default ProfileInfo;
