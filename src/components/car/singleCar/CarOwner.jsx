import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../../features/user/userSlice';
import Avatar from '../../../assets/profile/Avatar.png';
import { MdCameraAlt } from 'react-icons/md';
import { IoStar } from 'react-icons/io5';
import DisplayReviews from '../../review/DisplayReviews';

function CarOwner({ ownerId }) {
  const { singleUser } = useSelector((state) => state.user);

  const [displayReviews, setDisplayReviews] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById({ userId: ownerId }))
      .unwrap()
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  }, [ownerId]);

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
    <div className='single-car-display-onwer'>
      <h2>Ιδιοκτήτης</h2>
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
      {displayReviews && (
        <DisplayReviews
          userId={ownerId}
          setDisplayReviews={setDisplayReviews}
        />
      )}
    </div>
  );
}

export default CarOwner;
