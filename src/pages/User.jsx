import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../assets/profile/Avatar.png';
import { MdCameraAlt } from 'react-icons/md';
import { IoStar } from 'react-icons/io5';
import DisplayReviews from '../components/review/DisplayReviews';
import { getUserById } from '../features/user/userSlice';
import UserInformation from '../components/user/UserInformation';
import UserCars from '../components/user/UserCars';
import { useParams } from 'react-router-dom';

function User() {
  const { singleUser } = useSelector((state) => state.user);
  const [selectedTab, setSelectedTab] = useState(0);

  const [displayReviews, setDisplayReviews] = useState(false);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById({ userId: id }))
      .unwrap()
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const menuList = [
    {
      name: 'Στοιχεία λογαριασμού',
      component: <UserInformation user={singleUser} />,
    },
    {
      name: 'Τα αμάξια',
      component: <UserCars />,
    },
  ];

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

  return (
    <div className='container profile-page display-user'>
      <div className='top-section'>
        <div className='profile-image'>
          <img
            src={
              singleUser?.profileImage?.url
                ? singleUser.profileImage.url
                : Avatar
            }
            alt='Profile image'
          />
          <div className='upload-icon'>
            <MdCameraAlt color='#fff' size='20px' />
          </div>
        </div>
        <div className='user-info'>
          <h2>
            {singleUser?.name} {singleUser?.surname}
          </h2>
          <div className='rating' onClick={() => setDisplayReviews(true)}>
            {singleUser?.ratingsScore && displayStars(singleUser?.ratingsScore)}
            {singleUser?.ratingsAmount && (
              <div className='text'>
                ({singleUser?.ratingsAmount}) Αξιολογήσεις
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='tab-section'>
        <div className='tabs'>
          {menuList.map((menu, index) => (
            <div
              key={index}
              className={`tab ${selectedTab === index ? 'selected' : ''}`}
              onClick={() => setSelectedTab(index)}
            >
              {menu.name}
            </div>
          ))}
        </div>
        <div className='selected-tab'>{menuList[selectedTab].component}</div>
      </div>
      {displayReviews && (
        <DisplayReviews userId={id} setDisplayReviews={setDisplayReviews} />
      )}
    </div>
  );
}

export default User;
